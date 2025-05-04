const express = require('express');
const Subscriber = require('../models/Subscribe');
const router = express.Router();

//@route post /api/subscribe
//@desc handle newsletter Subscription
//@access public
router.post("/",async(req,res)=>{
    const {email} =req.body;
      if(!email){
        return res.status(400).json({message:"Email is required"});
      }
    try {
        //Check email id already subscribe
        let subscribe = await Subscriber.findOne({email});

        if(subscribe){
            return res.status(400).json({message:"Email is already Subscribe"});
        }
        //Create new Subscriber
        subscribe = new Subscriber({email});
        await subscribe.save();

        res.status(201).json(subscribe)
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})


module.exports = router;