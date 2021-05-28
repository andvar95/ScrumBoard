const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const User = require("../models/user");
const middlewareAuth = require("../middleware/auth");

const tasksValidation = (board) =>{
    return board.name ==="" || board.description ==="" || board.status=== ""?null:true
}



/* This funcion register an activity  without an image, checking whether the user exists and saving a task*/
router.post("/saveTask",middlewareAuth,async(req,res)=>{

    //Cheking the user
    const user = await User.findById(req.user._id);
    if(!user) return res.status(401).send("User doesn't exist");

   

    //Board object
    const board = new Board({
        userId:user._id,
        name:req.body.name,
        status:"to-do",
        description:req.body.description,
    });

     //Task validation
    if(!tasksValidation(board)) return res.status(401).send("Fill all Fields");

    //saving task
    const result = await board.save();
    return res.status(200).send({result});
})


/* This function list the user's tasks, checking the token and user*/
router.get("/listTasks",middlewareAuth,async(req,res)=>{   
    //searchin  user by  ID
    const user = await User.findById(req.user._id);

    //if user doesn't exist
    if(!user) return res.status(401).send("User doesn't exist"); 
    const board = await Board.find({userId:req.user._id});
    return res.status(200).send({board});
    
})


/* Function to update a task, receiving all field with the modified feild*/
router.put("/updateTask",middlewareAuth,async(req,res)=>{
    //cheking user
    const user = await User.findById(req.user._id);
    if(!user) return res.status(401).send("This Person doesn't exist");

     //Task validation
     if(!tasksValidation(req.body)) return res.status(401).send("Fill all Fields");

    //UPDATING activity
    const board = await Board.findByIdAndUpdate(req.body._id,{
        userId:user._id,
        name:req.body.name,
        status:req.body.status,
        description:req.body.description
    });

   

    if(!board) return res.status(400).send("The task couldn't be updated")
    return res.status(200).send({board})
})

/* Deleting a task, using the middleware and deleting a existing activity*/
router.delete("/:_id",middlewareAuth,async(req,res)=>{
    const user = await User.findById
    (req.user._id);
    if(!user) return res.status(401).send("User doesn't exist");

    const board = await Board.findByIdAndDelete(req.params._id);
    if(!board) return res.status(401).send("Error deleting task")

    return res.status(401).send({message:"Task deleted"})

})


module.exports = router;