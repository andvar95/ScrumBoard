const multer = require("multer");
const moment  = require("moment");
const dir = "./uploads/";
const path = require("path");


const storage = multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,dir);
    },
    filename:(req,file,fn)=>{
        filename = moment().unix() + path.extname(file.originalname);
        fn(null,filename);
    }
});

const upload = multer({
    storage:storage,
    fileFilter:(req,file,fn)=>{
        
        if(!req.body.name || !req.body.description) file = "";
        if(file == "") {return fn(null,false)}
        else if(file.mimetype.includes("image")===false){
            req.params = {"error":"format-error"}
            fn(null,false)
        }
        else {return fn(null,true)}
    },
});

module.exports = upload;