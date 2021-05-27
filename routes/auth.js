//importing express and router modules
const express = require("express");
const router = express.Router();

//Importing use model

const User = require("../models/user");

///importing bcrypt 
const bcrypt = require("bcrypt");

//login function
router.post("/login",async (req,res)=>{
    const user = await User.findOne({email:req.body.email});

    if(!user) return res.status(400).send("Email not correct");

    const hash =  await bcrypt.compare(req.body.password,user.password);

    //if password is incorrect
    if(!hash) return res.status(400).send("Password not correct")

    //login succesfully
    const jwtToken = user.generateJWT();
    return res.status(200).send({jwtToken});

});


module.exports = router;

