const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const User = require("../models/user");
const middlewareAuth = require("../middleware/auth");
const UserAuth = require("../middleware/user");
const Upload = require("../middleware/file");
const mongoose = require("mongoose");


const tasksValidation = (board) =>{
    return board.name ==="" || board.description ==="" || board.status=== ""?null:true
}



/* This funcion register an activity  without an image, checking whether the user exists and saving a task*/
router.post("/saveTask",middlewareAuth,UserAuth,Upload.single("image"),async(req,res)=>{
   
console.log(req.body)
       

    if(!req.body.name || !req.body.description) return res.status(401).send("Error: Incomplete data")

   
   
   
    const url = req.protocol + "://" + req.get("host")
    let imageUrl = "";
    if(req.file !== undefined && req.file.filename) imageUrl = url + "/uploads/"+req.file.filename

    //Board object
    const board = new Board({
        userId:req.user._id,
        name:req.body.name,
        status:"to-do",
        description:req.body.description,
        imageUrl:imageUrl
    });

     //Task validation
    if(!tasksValidation(board)) return res.status(401).send("Fill all Fields");

    //saving task
    const result = await board.save();
    if (!result) return res.status(401).send("Error: Failed register Task")
    return res.status(200).send({result});
})


/* This function list the user's tasks, checking the token and user*/
router.get("/listTasks",middlewareAuth,UserAuth,async(req,res)=>{   
   
    const validId = mongoose.Types.ObjectId.isValid(req.user._id);
    if(!validId) return res.status(401).send("Error: id not valid")

   
    const board = await Board.find({userId:req.user._id});
    if(!board) return status(401).send("Warnig:  No tasks to list")
    return res.status(200).send({board});

    
})


/* Function to update a task, receiving all field with the modified feild*/
router.put("/updateTask",middlewareAuth,UserAuth,async(req,res)=>{

    if (
        !req.body._id ||
        !req.body.name ||
        !req.body.status ||
        !req.body.description
      )
        return res.status(401).send("Process failed: Incomplete data");

        const validId = mongoose.Types.ObjectId.isValid(req.user._id);
        if(!validId) return res.status(401).send("Error: id not valid")


    //UPDATING activity
    const board = await Board.findByIdAndUpdate(req.body._id,{
        userId:req.user._id,
        name:req.body.name,
        status:req.body.status,
        description:req.body.description
    });

   

    if(!board) return res.status(400).send("The task couldn't be updated")
    return res.status(200).send({board})
})

/* Deleting a task, using the middleware and deleting a existing activity*/
router.delete("/deleteTask/:_id",middlewareAuth,UserAuth,async(req,res)=>{
    const validId = mongoose.Types.ObjectId.isValid(req.user._id);
    if(!validId) return res.status(401).send("Error: id not valid")

    const board = await Board.findByIdAndDelete(req.params._id);
    if(!board) return res.status(401).send("Error deleting task")

    return res.status(200).send({message:"Task deleted"})

})


module.exports = router;