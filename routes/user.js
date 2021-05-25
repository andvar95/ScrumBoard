//Importing needed modules
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

//register User async-await-POST
router.post("/registerUser", async (req, res) => {
  //validating unique email
  let user = await User.findOne({ email: req.body.email });

  //if email exists
  if (user) return res.status(400).send("This user already exists");

  //encrypting password
  //length parameter

  const hash = await bcrypt.hash(req.body.password, 10);

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });

  const result = await user.save();

  if (result) {
    //jwt
    const jwtToken = user.generateJWT();

    res.status(200).send({ jwtToken });
  } else {
    return res.status(400).send("Registration failed");
  }
});

module.exports = router;
