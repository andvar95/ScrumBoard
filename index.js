//Importing express to create the server and mongoose required for mongoDB
const express = require("express");
const cors = require("cors");
const {dbConnection} = require("./db/db");

//importing route modules
const User = require("./routes/user");
const Auth = require("./routes/auth");
const Board = require("./routes/board");
const Role = require("./routes/role");


//Creating instance of express  // app variable
const app = express();

require("dotenv").config()
//Use
//Using express with json format
app.use(express.json());
app.use(cors())
//using routes
app.use("/api/user/",User);
app.use("/api/auth/",Auth);
app.use("/api/board/",Board);
app.use("/api/role/",Role);



//listening server in the given port (3002)
app.listen(process.env.PORT,()=>console.log("Backend server running in port: "+process.env.PORT))

dbConnection();

