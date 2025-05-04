const jwt = require('jsonwebtoken');
const User = require('../models/User');

//@ middleware protect routes
const protect = async(req,res,next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
         try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.user._id).select('-password'); //execulde password
            next();
        } catch (error) {
            console.error("token ",error);
            res.status(401).json({message:"Not authorized,Token failed"})
         }
    }else{
        res.status(401).json({message:"Not Token Provided"})
    }
}

//@middleware will check user is admin 

const admin =(req,res,next)=>{
    if(req.user && req.user.role == 'admin'){
        next();
    }
    else{
        res.status(403).json({message:"Not authorized as an admin"})
    }
}

module.exports = {protect,admin}