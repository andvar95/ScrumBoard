//importing required modules
const mongoose = require("mongoose") //to store de data en mongodb
const jwt = require("jsonwebtoken") //generate a jwt when the user is saved successfully
const moment = require("moment") //moemnto is useful to generate iat for the jwt


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


//exporting user model
module.exports = User;