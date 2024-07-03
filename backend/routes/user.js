const express= require("express");
const userrouter=express.Router();
const {authMiddleware}=require("../middlewares/middleware");


userrouter.get("/",authMiddleware, async (req,res)=>{
    res.status(200).json({
        msg:"User authenticated successfully . You have nothing else to do."
    })
});
module.exports=userrouter;