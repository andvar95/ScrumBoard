//importing jwt
const jwt = require("jsonwebtoken");



/* The middleare function for auth help to check the token according to the given secret word*/
const auth = (req,res,next)=>{

    //verifyinf whether token exists
    let jwtToken = req.header("Authorization");
    if(!jwtToken) return res.status(400).send("Authentication rejected: there is not a token");

    jwtToken = jwtToken.split(" ")[1];
    if(!jwtToken) return res.status(401).send("Authentication rejected: there is not a token")


    //Checking the secretor word in the token
    try{
        const payload = jwt.verify(jwtToken, process.env.secretKey);
        req.user = payload;
        next();
    }catch(error){
        return res.status(401).send("Authentication rejected: Invalid token")
    }

}


module.exports = auth;