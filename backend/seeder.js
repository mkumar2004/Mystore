const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const dress = require('./data/dress');
const dotenv = require('dotenv');
const Cart = require('./models/Cart')
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);


//creating function for seed data

const seedData =async()=>{
    try {
        //clear existing user and product
        await User.deleteMany();
        await Product.deleteMany();
        await Cart.deleteMany();
        //create user admin default
        const adminUser = await User.create({
            name:"manojkumar",
            email:"mkumarrrr22@gmail.com",
            password:"mkumar@2004",
            role:"admin"
        }) ;
       
        //create admin userid and products

        const adminid = adminUser._id

        const Sampleproducts = dress.map((dres)=>{
            return {...dres,user:adminid}
            
        })

        //insert product to the database

        await Product.insertMany(Sampleproducts);
        console.log("Product data seed successfully");

        process.exit();

    } catch (error) {
        console.error("Error seeding the data",error);
        process.exit(1);
    }
}

seedData();
