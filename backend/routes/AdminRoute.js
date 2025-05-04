const express = require('express');
const User = require('../models/User');
const {protect,admin} = require('../Midlleware/AuthenticationMiddleware');

const router = express.Router();

//@route Get /api/admin/users
//@desc Get all users (Admin only)
//@acces private /admin
router.get('/',protect,admin,async(req,res)=>{
    try {
        const users = await User.find({});
        res.json(users)
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}) ;

//@route post /api/admin/users
//@desc Add a new user by Admin
//@acess private/Admin
router.post('/',protect,admin,async(req,res)=>{
    const {name,email,password,role} = req.body;

    try {
       let user = await User.findOne({email});
       if(user){
          return res.status(400).json({message:"User already exists"}) ;
       }
       user = new User({
         name,
         email,
         password,
         role
       });
       await user.save();
       res.status(201).json({message:"User created Sucessfully",user});
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

//@route Put /api/admin/users/:id
//@desc Upadate User information
//@access Private Admin
router.put('/:id',protect,admin,async(req,res)=>{
    try {
         const user = await User.findById(req.params.id);
        if(user){
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.role = req.body.role || user.role;
        }
        const updateInfo = await user.save();
        res.json({message:"User update Suceesfully",user:updateInfo});
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}) ;

//@route Delete /api/admin/users/:id
//@desc Detele User 
//@access Private Admin
router.delete('/:id',protect,admin,async(req,res)=>{
    try {
        const users = await User.findById(req.params.id);
        if(users){
            await users.deleteOne();
            res.status(201).json({message:"User delete Sucessfully"});
        }
        else{
            res.status(404).json({message:"User not Found"}); 
        }
      
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}) ;
module.exports = router;

