//Importing needed modules
const express = require("express");  
const router = express.Router(); //routers help to manage project routes 
const User = require("../models/user"); //importing model to use in the route
const bcrypt = require("bcrypt");  //library to encrypt the password

//register User async-await-POST
router.post("/registerUser", async (req, res) => {
  //validating unique email

  //searching if the email exists
  let user = await User.findOne({ email: req.body.email });

  //CASE:email already existis -> can't save this user the function is broken
  if (user) return res.status(400).send("This user already exists");

  //encrypting password
  const hash = await bcrypt.hash(req.body.password, 10);

  //creating user object to store  
  user = new User({
    name: req.body.name, //name from body request
    email: req.body.email, //email from body request
    password: hash, //password encrypted by bcrypt
   });

  const result = await user.save(); //saving user object in mongo

  if (result) {
    //if the user was saved return a JWT
    const jwtToken = user.generateJWT();

    res.status(200).send({ jwtToken });
  } else {
    //if not return a message
    return res.status(400).send("Registration failed");
  }
});

//exporting routes with its methods
module.exports = router;
