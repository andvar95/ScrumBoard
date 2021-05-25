//Importing express to create the server and mongoose for mongoDB
const express = require("express");
const mongoose = require("mongoose");

//importing routers
const User = require("./routes/user")

//Creating instance of express  
const app = express();

//Use
//Using express with json format
app.use(express.json());
//using routes
app.use("/api/users/",User);


//Port variable for localhost
const port = process.env.PORT || 3002;

//listening
app.listen(port,()=>console.log("Backend server running in port: "+port))

mongoose.connect("mongodb://localhost:27017/scrumBoardDB",{
    useNewUrlParser: true, //
    useUnifiedTopology: true, //mongo can use mongo commands
    useFindAndModify: false, //doesn't send information by console
    useCreateIndex: true, //let createdb from index
})
.then(res=>console.log("Mongo ok"))
.catch(err=>console.log("Mongo no connected: ",err))