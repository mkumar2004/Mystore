const express = require('express');
const Product = require('../models/Product');
const {protect,admin} = require('../Midlleware/AuthenticationMiddleware');

const router = express.Router();

//@route Get /api/admin/users
//@desc Get all Products (Admin only)
//@acces private /admin
router.get('/',protect,admin,async(req,res)=>{
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}) ;

module.exports = router;