const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const moment = require("moment")


//Creating user Schema

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    date:{type:Date,
    default:Date.now}
})

//method to generate JWT 
userSchema.methods.generateJWT = () =>{
    return jwt.sign({
        _id:this._id,
        name:this.name,
        iat:moment().unix()
    },
    "Secret Token");
};


//User Collection in mongo
const User = mongoose.model("user",userSchema)

module.exports = User;