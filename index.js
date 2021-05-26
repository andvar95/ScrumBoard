//Importing express to create the server and mongoose required for mongoDB
const express = require("express");
const mongoose = require("mongoose");

//importing route modules
const User = require("./routes/user");
const Auth = require("./routes/auth");

//Creating instance of express  // app variable
const app = express();

//Use
//Using express with json format
app.use(express.json());
//using routes
//register route
app.use("/api/users/",User);
//login route
app.use("/api/auth/",Auth)


//Port variable for localhost or hosting url
const port = process.env.PORT || 3002;

//listening server in the given port (3002)
app.listen(port,()=>console.log("Backend server running in port: "+port))

mongoose.connect("mongodb://localhost:27017/scrumBoardDB",{
    useNewUrlParser: true, //
    useUnifiedTopology: true, //mongo can use mongo commands
    useFindAndModify: false, //doesn't send information by console
    useCreateIndex: true, //let createdb from index
})
.then(res=>console.log("Mongodb connected"))
.catch(err=>console.log("Mongodb no connected: ",err))