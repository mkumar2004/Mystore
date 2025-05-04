const mongoose = require('mongoose')

const SubscribeSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    SubscribeAt:{
        type:Date,
        default:Date.now,
    }
});

module.exports = mongoose.model("Subscriber",SubscribeSchema);