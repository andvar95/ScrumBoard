//Importing needed modules
const express = require("express");  
const router = express.Router(); //routers help to manage project routes 
const User = require("../models/user"); //importing model to use in the route
const bcrypt = require("bcrypt");  //library to encrypt the password

/* Function to register the user, checking if the use already exists, to avoid
users duplicated 
*/ 
router.post("/registerUser", async (req, res) => {
  //validating unique email
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("This user already exists");

  //encrypting password
  const hash = await bcrypt.hash(req.body.password, 10);

  //creating user object to store  
  user = new User({
    name: req.body.name, //name from body request
    email: req.body.email, //email from body request
    password: hash, //password encrypted by bcrypt
   });

  //saving user object in mongo
  const result = await user.save(); 

  //verifying result of save the user and generating jwt
  if (result) {
    const jwtToken = user.generateJWT();
    res.status(200).send({ jwtToken });
  } else {
    return res.status(400).send("Registration failed");
  }
});

//exporting routes with its methods
module.exports = router;
