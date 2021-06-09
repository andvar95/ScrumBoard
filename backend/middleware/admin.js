const Role =  require("../models/role");

const admin = async(req,res,next)=>{

    const role = await Role.findById(req.user.roleId);


    if(!role) return send.status(401).send("Error: A role is needed")
    

    if(role.name == "admin") next()
    else return res.status(401).send("Error: Unauthorized user");
}

module.exports = admin;