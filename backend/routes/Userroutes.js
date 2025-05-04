const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {protect} = require('../Midlleware/AuthenticationMiddleware')


// @ router Post /api/users/register
//@desc Register a new user
//@acess public

router.post('/register',async(req ,res)=>{
    //Register logic
    const {name , email ,password} = req.body;
    try {
       // res.send({name,email,password})

       let user = await User.findOne({email});

       if(user) return res.status(400).json({message:"User already exits"});

       user = new User({name,email,password});
       await user.save();
     
   

    //jwt playload
    const playload ={user:{_id:user._id,role:user.role}}
    //Sign with token along with the user data
    jwt.sign(
        playload,
        process.env.JWT_SECRET,
        {expiresIn:"40h"},
        (err,token)=>{
           if(err) throw err;
           
           //send the user and token in response
            //api sending response   
         res.status(201).json({
          user:{
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
            },
            token,
         })

        }
    )
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
        
    }
} );

// @ router Post /api/users/login
//@desc Authentication user
//@acess public
router.post('/login',async(req,res)=>{
    //login Logic
    const {email,password} = req.body;
    try {
        //find email 
        let user = await User.findOne({email});
        
        if(!user) return res.status(400).json({message:"Invalid Credentials"});
        
        const isMatch = await user.matchPassword(password) ;
      
        if(!isMatch) return res.status(400).json({message:"Invalid Credentials"});
        
       //jwt playload
    const playload ={user:{_id:user._id,role:user.role}}
    //Sign with token along with the user data
     jwt.sign(
        playload,
        process.env.JWT_SECRET,
        {expiresIn:"40h"},
        (err,token)=>{
           if(err) throw err;
           
           //send the user and token in response
            //api sending response   
         res.json({
          user:{
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
            },
            token,
         })

        }
    )   
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
})

// @ router Get /api/users/profile
// @ loggin user Protected
// @ access private

router.get('/profile', protect, async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Server error" });
    }
});



module.exports = router;