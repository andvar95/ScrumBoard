//importing express and router modules
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt"); 


//Function to login in the application,  veriying whether the credentials are correct.
router.post("/login",async (req,res)=>{
    //veriying email
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("Email not correct");
     //veriying paswword
    const hash =  await bcrypt.compare(req.body.password,user.password);
    if(!hash || !user.active) return res.status(400).send("Password not correct")

    try{
    //login succesfully
    const jwtToken = user.generateJWT();
    return res.status(200).send({jwtToken});}
    catch(e){
        return res.status(400).send("Login Error")
    }
});


module.exports = router;

