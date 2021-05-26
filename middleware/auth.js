//importing jwt
const jwt = require("jsonwebtoken");

//validating auth

const auth = (req,res,next)=>{
    //chekinf auth header
    let jwtToken = req.header("Authorization");

    if(!jwtToken) return res.status("400").send("Authentication rejected: there is not a token");

    //jwt exists, we split the payload
    jwtToken = jwtToken.split(" ")[1];

    if(!jwtToken) return res.status(401).send("Authentication rejected: there is not a token")

    //Cheking the token with the own-sign

    try{
        const payload = jwt.verify(jwtToken, "Secret Token");
        req.user = payload;
        next();
           //we use this way when don't know the exception
    }catch(error){
        //error message
        return res.status(401).send("Authentication rejected: Invalid token")
    }

}


module.exports = auth;