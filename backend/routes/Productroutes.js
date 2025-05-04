const express = require('express');
const Product = require('../models/Product');
const {protect,admin} = require('../Midlleware/AuthenticationMiddleware');

const router = express.Router();

//@route Post /api/products
//@desc Create product
//@access private admin

router.post('/',protect,admin,async(req,res)=>{
    try {
        const {
            name,
            description,
            price,
            discountprice,
            countStock,
            sku,
            category,
            brand,
            sizes,
            colors,
            gender,
            allcollection,
            material,
            images,
            isFeatured,
            isPublished,
            rating,
            numReviews,
            tags,
            metaTitle,
            metadesctription,
            metaKeyword,
            dimenisons,
            weight
        } = req.body;

        const prouduct = new Product({
            name,
            description,
            price,
            discountprice,
            countStock,
            sku,
            category,
            brand,
            sizes,
            colors,
            gender,
            allcollection,
            material,
            images,
            isFeatured,
            isPublished,
            rating,
            numReviews,
            tags,
            metaTitle,
            metadesctription,
            metaKeyword,
            dimenisons,
            weight,
            user: req.user._id  //This id references to admin whenever create a new product
        });

        const createdProduct = await prouduct.save();
        res.status(201).json(createdProduct)

    } catch (error) {
        console.log(error);
        res.status(500).json("Server error")
        
        
    }
})

//@Put api/products/:id
//@desc Upadate by Existing id
//@access Private/admin

router.put('/:id',protect,admin,async(req,res)=>{
    try {
        const {
            name,
            description,
            price,
            discountprice,
            countStock,
            sku,
            category,
            brand,
            sizes,
            colors,
            gender,
            allcollection,
            material,
            images,
            isFeatured,
            isPublished,
            rating,
            numReviews,
            tags,
            metaTitle,
            metadesctription,
            metaKeyword,
            dimenisons,
            weight
        } = req.body;

        //find product id
        const prdid = await Product.findById(req.params.id);
        if(prdid){
            //update the filed
            prdid.name = name || prdid.name;
            prdid.description = description || prdid.description;
            prdid.price = price || prdid.price;
            prdid.discountprice = discountprice || prdid.discountprice;
            prdid.countInStock = countStock || prdid.countInStock;
            prdid.sku = sku || prdid.sku;
            prdid.category = category || prdid.category;
            prdid.sizes =sizes || prdid.sizes;
            prdid.brand = brand || prdid.brand;
            prdid.colors = colors || prdid.colors;
            prdid.gender = gender || prdid.gender
            prdid.allcollection = allcollection || prdid.allcollection;
            prdid.images = images || prdid.images;
            prdid.material = material || prdid.material;
            prdid.isFeatured = isFeatured !==undefined? isFeatured : prdid.isFeatured;
            prdid.isPublished = isPublished !==undefined? isPublished : prdid.isPublished;
            prdid.rating = rating || prdid.rating;
            prdid.numReviews = numReviews || prdid.numReviews;
            prdid.tags = tags || prdid.tags;
            prdid.dimenisons = dimenisons || prdid.dimenisons;
            prdid.weight = weight || prdid.weight;
            //save the update products
            const updateproduct = await prdid.save();
            res.json(updateproduct)
        }
        else{
            res.status(404).json({message:"product not found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error")
        
    }
})

//@Delete api/products/:id
//@desc delete by Exsisting id
//@access Private/admin

router.delete('/:id',protect,admin,async(req,res)=>{
    try {
        //find product id
        const prdid =await Product.findById(req.params.id)
        //remove product
        if(prdid){
                await prdid.deleteOne();
                res.json({message:"Product removed database"});
        }
        else{
            res.status(404).json("Product not found")
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error")
        
    }
})

//@Get api/products
//@des get all product with optional query filtering
//@access Public

router.get('/',async(req,res)=>{
    try {
        const {
            collection,
            size,
            gender,
            colors,
            minPrice,
            maxPrice,
            sortBy,
            search ,
            category,
            material,
            brand,
            limit
        } =req.query;
        let query = {};

        //filter logic 
         if(collection && collection.toLocaleLowerCase() !== "all"){
             query.collection = new RegExp(`^${collection}$`, "i");
         }
         if(category && category.toLocaleLowerCase() !== "all"){
            query.category = new RegExp(`^${category}$`, "i");
        }
        if(material){
            query.material = {$in :material.split(",")}
        }
        if(brand){
            query.brand = {$in :brand.split(",")}
        }
        if(size){
            query.size = {$in :size.split(",")}
        }
        if(colors ){
            query.colors = {$in :colors.split(",")}
        } 
        if(gender){
            query.gender = gender;
        } 
        if(minPrice || maxPrice){
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        
        if(search){
            query.$or = [
                {name :{$regex:search,$options:"i"}},
                {description :{$regex:search,$options:"i"}}

            ]
        }
        //sort logic
        let sort = {}
        if(sortBy){
            switch(sortBy){
                case "priceAsc":
                    sort = {price:1};
                    break;
                case "priceDesc":
                    sort = {price:-1};
                    break;
                case "popularity":
                    sort = {price:-1};
                    break;
                default:
                    break;    
            }
        }
        //fetching the products and limits
        let prd = await Product.find(query).sort(sort).limit(Number(limit)||0);
        res.json(prd)
    } catch (error) {
        console.error(error);
        res.status(500).send("SErver error")
    }
});




//@Get api/products
//@des get best seller
//@access Public
router.get('/best-seller',async(req,res)=>{
    try {
        const bestseller = await Product.findOne().sort({rating:-1});
        if(bestseller){
             res.json(bestseller);
        }
        else{
            res.status(401).json({message:"No Best seller product"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

//@Get api/New-arrivals
//@des Retrive new-arrivals 8 product by createdat
//@access Public
router.get('/new-arrival',async(req,res)=>{
    try {
        //find 8 product
        const newarrival = await Product.find().sort({createdAt:-1}).limit(8);
        if(newarrival){
            res.json(newarrival);
        }else{
            res.status(401).json({message:"No New arriraval found"})
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})



//@Get api/products/:id
//@des Single Product by ProductId
//@access Public
router.get('/:id',async(req,res)=>{
    try {
        const prdId = await Product.findById(req.params.id);

        if(prdId){
            res.json(prdId);
        }
        else{
            res.status(404).json({message:"Product Not Found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

//@Get api/similar/:id
//@des Similar products 
//@access Public
router.get('/similar/:id', async(req,res)=>{
    const {id} = req.params;
   // console.log(id)
    try{
          const prd = await Product.findById(id);
          
          if(!prd){
            return res.status(401).json({message:"Product Not Found"})
          }
          const similarprd = await Product.find({
            _id : {$ne:id}, //exculde the  current prd id
            gender:prd.gender,
            category:prd.category
          }).limit(4);

          res.json(similarprd);
    }
    catch(error){
        console.error(error);
        res.status(500).send("Server Error");
    }
});


module.exports = router;