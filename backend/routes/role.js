const express = require("express");
const router = express.Router();
const Role = require("../models/role");
const Admin = require("../middleware/admin");
const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");

/* The first time running the code you must to dlete Auth,Admin and UserAuth middlewares 
to be able to register a role, then, add them. the first admin must be created using compass,
take a normal user and changing her/his role
*/
router.post("/registerRole",Auth,UserAuth,Admin,async(req,res)=>{

    if(!req.body.name || !req.body.description) return res.status(401).send("Error: Incomplete data")

    const roleExists = await Role.findOne({name:req.body.name});

    if(roleExists) return res.status(401).send("Error: role already exists")

    const role = new Role({
        name:req.body.name,
        description:req.body.description,
        active:true
    });

    const rolSaved  = await role.save();
    if(!rolSaved) return res.status(401).send("Failed to register role")

    return res.status(200).send({rolSaved})
});

router.get("/listRole",Auth,UserAuth,Admin,async(req,res)=>{
    const role =  await Role.find();
    if(!role) return res.status(401).send("No Role")
    return res.status(200).send({role})
})

module.exports = router;