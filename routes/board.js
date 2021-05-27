const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const User = require("../models/user");
const middlewareAuth = require("../middleware/auth");

//register activity without an image
router.post("/saveTask",middlewareAuth,async(req,res)=>{
    //searchin  user by  ID
    const user = await User.findById(req.user._id);

    //if user doesn't exist
    if(!user) return res.status(401).send("User no Authenticated");

    //if user exists, the task will be saved in the board
    const board = new Board({
        userId:user._id,
        name:req.body.name,
        status:"to-do",
        description:req.body.description,
    });
    const result = await board.save();
    return res.status(200).send({result});
})

router.get("/listTasks",middlewareAuth,async(req,res)=>{
    const user = await User.findById(req.user._id);

    if(!user) return res.status(401).send("This user doesn't exist")

    const board = await Board.find({userId:req.user._id});
    return res.status(200).send({board});
    
})


module.exports = router;