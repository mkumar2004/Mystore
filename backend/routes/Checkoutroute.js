const express = require("express");
const Checkout = require('../models/Checkout');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Order = require('../models/Order');
const {protect} = require('../Midlleware/AuthenticationMiddleware');
const router = express.Router();

//@route Post //api/checkout
//@desc Create a new checkout Seesion
//@access Private 
router.post("/",protect,async(req,res)=>{
    const {checkout,ShippingAddress,paymentMethod,totalPrice} = req.body;

    if(!checkout || checkout.length === 0){
        return res.status(400).json({message:"No Items  in checkout"})
    }
    try {
       const newcheckout = await Checkout.create({
         user:req.user._id,
         checkout:checkout,
         ShippingAddress,
         totalPrice,
         paymentMethod,
         isPaid:false
       });
     //  console.log(`checkout User created : ${req.user._id}`);
       res.status(201).json(newcheckout);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});



//@route Put api/checkout/:id/pay
//@des Update checkout to mark as paid after sucessfull payment
//@access private
//@route PUT /api/checkout/:id/pay
//@desc Mark checkout as paid
//@access Private

router.put("/:id/pay", protect, async (req, res) => {
    const { paymentStatus } = req.body;
  
    try {
      const checkout = await Checkout.findById(req.params.id);
  
      if (!checkout) {
        return res.status(404).json({ message: "Checkout Not Found" });
      }
  
      if (paymentStatus === "paid") {
        checkout.isPaid = true;
        checkout.paymentStatus = paymentStatus;
        checkout.paidAt = Date.now();
        await checkout.save();
  
        return res.status(200).json(checkout);
      } else {
        return res.status(400).json({ message: "Invalid Payment Status" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });
  

//@route Post /api/checkout/:id/finaliZe
//@desc finialise checkout and convert to an order  after payment confirmation
//@access Private
router.post("/:id/finalize",protect,async(req,res)=>{
    try {
        const checkout = await Checkout.findById(req.params.id);
        if(!checkout){
            return res.status(404).json({message : "Checkout Not Found" });
        }
        
        if(checkout.isPaid && !checkout.isFinalised){
            //finialize the order based on the checkut details
            const Finalorder = await Order.create({
                user:checkout.user,
                Orderitems:checkout.checkout,
                ShippingAddress:checkout.ShippingAddress,
                paymentMethod:checkout.paymentMethod,
                totalPrice:checkout.totalPrice,
                isPaid:true,
                paidAt:checkout.paidAt,
                isDeliver:false,
                paymentStatus:"paid",
                paymentDetails:checkout.paymentDetails,
            });
            //Mark the checkout as finalized
            checkout.isFinalised = true;
            checkout.FinalisedAt = Date.now();
            await checkout.save(); // save the throung database

            //Delete the cart after cart assoicated eith user
            await Cart.findOneAndDelete({user:checkout.user});
            res.status(201).json(Finalorder);
        } else if(checkout.isFinalised){
            res.status(400).json({message: "checkout is already finalised"});
        } else{
            res.status(404).json({message:"Checkout is not paid"});
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;