//Importing needed modules
const express = require("express");  
const router = express.Router(); //routers help to manage project routes 
const User = require("../models/user"); //importing model to use in the route
const bcrypt = require("bcrypt");  //library to encrypt the password
const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");
const Admin = require("../middleware/admin");
const Role = require("../models/role");
const mongoose = require("mongoose");


/* Function to register the user, checking if the use already exists, to avoid
users duplicated 
*/ 
router.post("/registerUser", async (req, res) => {

  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Error: Incomplete data");
  
  //validating unique email
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("This user already exists");

  //encrypting password
  const hash = await bcrypt.hash(req.body.password, 10);

  const role = await Role.findOne({name:"user"})
  if(!role) return res.status(400).send("Error: This role doesn't exist")
  //creating user object to store  
  user = new User({
    name: req.body.name, //name from body request
    email: req.body.email, //email from body request
    password: hash, //password encrypted by bcrypt
    roleId:role._id,
    active:true
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

router.get("/listUsers/:name?",Auth,UserAuth,Admin,async(req,res)=>{

  const users = await User.find({name:new RegExp(req.params["name"],"i")})
  .populate("roleId")
  .exec();

  if(!users) return res.status(401).send("Warning: No users")
  return res.status(200).send({ users });
})

router.post("/registerAdmin",Auth, UserAuth, Admin, async(req,res)=>{

  if (!req.body.name || !req.body.email || !req.body.password || !req.body.roleId)
  return res.status(400).send("Error: Incomplete data");

  const validId = mongoose.Types.ObjectId.isValid(req.body.roleId);
  if (!validId) return res.status(401).send("Error: id not valid");

//validating unique email
let user = await User.findOne({ email: req.body.email });
if (user) return res.status(400).send("This user already exists");

//encrypting password
const hash = await bcrypt.hash(req.body.password, 10);

const role = await Role.findOne({name:"user"})
if(!role) return res.status(400).send("Error: This role doesn't exist")
//creating user object to store  
user = new User({
  name: req.body.name, //name from body request
  email: req.body.email, //email from body request
  password: hash, //password encrypted by bcrypt
  roleId:req.body.roleId,
  active:true
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
  })


router.put("/updateUser",Auth,UserAuth,Admin, async(req,res)=>{

  if (!req.body.name || !req.body.email || !req.body.password || !req.body.roleId)
  return res.status(400).send("Error: Incomplete data");



//encrypting password
const hash = await bcrypt.hash(req.body.password, 10);

const user = await User.findByIdAndUpdate(req.body._id, {
  name: req.body.name,
  email: req.body.email,
  password: hash,
  roleId: req.body.roleId,
  active: req.body.active,
});

if(!user) return res.status(401).send("Error: User Could not be edited")
return res.status(200).send({user})


})



router.put("/deleteUser",Auth,UserAuth,Admin, async(req,res)=>{


//encrypting password
const hash = await bcrypt.hash(req.body.password, 10);

const user = await User.findByIdAndUpdate(req.body._id, {
  name: req.body.name,
  email: req.body.email,
  password: hash,
  roleId: req.body.roleId,
  active: false,
});

if(!user) return res.status(401).send("Error: User Could not be deleted")
return res.status(200).send({user})


})

//exporting routes with its methods
module.exports = router;
