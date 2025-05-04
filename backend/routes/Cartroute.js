const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const {protect} = require('../Midlleware/AuthenticationMiddleware');

const router = express.Router();

//helper function is to get user logged in or guest
const getcart = async(userId,guestId)=>{
    if(userId){
        return await Cart.findOne({user:userId});
    }
    else if(guestId){
         return await Cart.findOne({guestId});  
    }
    else{
        return null;
    }
}


//@Post /api/cart
//@ Add product to cart guest or logged in User
//@ access public
router.post('/',async(req,res)=>{
    const {productId,quantity,size,color,guestId,userId} = req.body;
    try {
        const prd = await Product.findById(productId);
        if(!prd){
            res.status(404).json({message:"Product not found"})
        }

        //Determine user logged in or guest
        let cartuser = await getcart(userId,guestId);

        //if the cart exist , update
        if(cartuser){
               const productIndex = cartuser.products.findIndex(
                (p)=>
                    p.productId.toString() === productId &&
                    p.size === size &&
                    p.color === color
               );

               if(productIndex > -1){
                    // if the product already exists , update the qauntity
                    cartuser.products[productIndex].quantity+= quantity 
               }
               else{
                 //add new product
                 cartuser.products.push({
                    productId,
                    name:prd.name,
                    image:prd.images[0].url,
                    price: prd.price,
                    size,
                    color,
                    quantity
                 });
               }
               //calculate total price
               cartuser.totalPrice = cartuser.products.reduce((acc,item)=>acc+item.price*item.quantity,0);

               //save to database
               await cartuser.save();
               return res.status(200).json(cartuser);

        }
        else{
            //create new cart for guest or user
            const newcart = await Cart.create({
                user : userId ? userId : undefined,
                guestId : guestId ? guestId : "guest_"+ new Date().getTime(),
                products:[
                    {
                        productId,
                        name:prd.name,
                        image:prd.images[0].url,
                        price:prd.price,
                        size,
                        color,
                        quantity
                     },
                ],
                totalPrice:prd.price * quantity
            });
            return res.status(201).json(newcart);
        }
        

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})

//@get /api/cart
//@ update product qty in the cart for guest or logged in user
//@ access public
router.put('/',async(req,res)=>{
    const {productId,quantity,size,color,guestId,userId} = req.body;
    try {
        let cart = await getcart(userId,guestId);
        if(!cart){
            return res.status(404).json({message:"No Cart Found"});
        }
        const productIndex = cart.products.findIndex(
            (p)=>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
           );
       if(productIndex >-1){
           //update quantity
           if(quantity>0){
           cart.products[productIndex].quantity = quantity;
           }
           else{
              cart.products.splice(productIndex,1); // remove the product if the quantity 0
              
            }
            cart.totalPrice = cart.products.reduce((acc,item)=>acc+item.price*item.quantity,0);

            //save to database
            await cart.save();
            return res.status(200).json(cart); 
    }else{
         return res.status(404).json({message:"Product not found in cart"})
    }  
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

//@ route delete /api/cart 
//@ remove product from cart
//@ access Public
router.delete('/',async(req,res)=>{
    const {productId,quantity,size,color,guestId,userId} = req.body;
    try {
         let cart = await getcart(userId,guestId);

          if(!cart) return res.status(404).json({message:"No Cart Found"});
           
           const productIndex = cart.products.findIndex(
            (p)=>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
           );
           if(productIndex >-1){
             cart.products.splice(productIndex,1);
             cart.totalPrice = cart.products.reduce((acc,item)=>acc+item.price*item.quantity,0);

            //save to database
            await cart.save();
            return res.status(200).json(cart); 
           }
           else{
            return res.status(404).json({message:"Product not found in cart"})
           }          
        } 
    
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
   
    }
}) ;

//@ route Post /api/cart/merge
//@ Merge guest cart into user cart on login
//@ access Private
router.post('/merge',protect,async(req,res)=>{
   const {guestId}   = req.body;
   try {
      //find the user cart and guest cart
      const guestCart = await Cart.findOne({guestId});
      const userCart = await Cart.findOne({user:req.user._id});

      if(guestCart){
         if(guestCart.products.length === 0){
            return res.status(404).json({message:"Car was Empty"})
         }
         if(userCart){
            //Merage guest user to cart user
            guestCart.products.forEach((guestitem) => {
                const productIndex = userCart.products.findIndex(
                    (p)=>
                        p.productId.toString() === guestitem.productId.toString() &&
                        p.size === size &&
                        p.color === color
                   );
                if(productIndex > -1){
                    //if the item exist in the user simply add with add item update quantity
                    userCart.products[productIndex].quantity+= guestitem.quantity;
                }
                else{
                    //otherwise  ,add the guest items to the cart
                    userCart.products.push(guestitem);  
                }   
            });
         userCart.totalPrice = userCart.products.reduce((acc,item)=> acc+item.price * item.quantity,0);

         await userCart.save();

         //Removing after the guest cart merage with user cart
         try{
            await Cart.findOneAndDelete({guestId});

         }
         catch(error){
            console.error("There is error while remove guest cart",error);

         }
         res.status(200).json(userCart);

      }
       else{
             //if the user has no existing cart , assign the guest cart to the user
             guestCart.user = req.user._id;
             guestCart.guestId = undefined;
             
             await guestCart.save();
             res.status(200).json(guestCart);
    }
    } else{
        if(userCart){
            //guest cart alredy merage with user simply return the cart
            return res.status(200).json(userCart);
        }
        else{
            res.status(404).json({message:"Cart is no found"})
        }
    }  

   } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
   }
})

module.exports = router;