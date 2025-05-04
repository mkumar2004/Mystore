const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usersShema = new mongoose.Schema({
    name:{
        type: String,
        required : true,
        trim:true
    },
    email:{
        type: String,
        required : true,
        unique:true,
        trim:true,
        match:[/.+\@.+|..+/,"Please enter valid email address"],

    },
    password:{
        type:String,
        required:true,
        minlength:8

    },
    role :{
        type:String ,
        enum:["customer","admin"],
        default:"customer",

    },    
   },
   { timestamps:true}
);

// password Hash middleware
usersShema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

//Match user entered password to hash password

usersShema.methods.matchPassword =  async function (enterpassword) {
    return await bcrypt.compare(enterpassword,this.password)
}


module.exports = mongoose.model("User",usersShema)
