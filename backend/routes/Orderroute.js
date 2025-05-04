const express = require('express');
const Order = require("../models/Order");
const {protect} = require('../Midlleware/AuthenticationMiddleware');

const router = express.Router();

//@route Get /api/order/my-order
//@desc Get logged in user in the orders
//@acess private
router.get('/my-orders',protect,async(req,res)=>{
    try {
        //Find the user the logged in id
        const orders  = await Order.find({user : req.user._id}).sort({createdAt: -1});//sorted dates of rcent order
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})

//@route get api/orders/:id
//@desc Get order details 
//@acess private
router.get('/:id',protect,async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );
        if(!order){
            res.status(404).json({message:"Order Not Found"})
        }
        //Full order details
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}); 

module.exports =  router;