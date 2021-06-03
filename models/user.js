//importing required modules
const mongoose = require("mongoose") //to store de data en mongodb
const jwt = require("jsonwebtoken") //generate a jwt when the user is saved successfully
const moment = require("moment") //moemnto is useful to generate iat for the jwt


//Creating user Schema
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    roleId:{type:mongoose.Schema.ObjectId,ref:"role"},
    active:Boolean,
    date:{type:Date,
    default:Date.now}
})

/* this methdd generate an unique JWT  for the user according to the name, id ,iat and the own-sign*/
userSchema.methods.generateJWT = function(){
    return jwt.sign({
        _id:this._id,
        name:this.name,
        roleId:this.roleId,
        iat:moment().unix()
    },
    process.env.secretKey
    );
};


//User Collection in mongo
const User = mongoose.model("user",userSchema)


//exporting user model
module.exports = User;