const express= require("express");
const signinrouter=express.Router();
const jwt=require("jsonwebtoken");
const zod=require("zod");
const bcrypt=require("bcrypt");
const dotenv=require("dotenv");
dotenv.config({path:'.env.local'});
const User=require("../models/User");


const schema=zod.object({
    email:zod.string().email(),
    password:zod.string().min(6),
   
});

signinrouter.post('/',async (req,res)=>{
   try{
    const result =schema.safeParseAsync(req.body);
    if(!result){
        return res.status(411).json({
            msg:"Invalid input"
        })
    }
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return res.status(404).json({
            msg:"User not found"
        })
    }
    bcrypt.compare(req.body.password,user.password,(err,match)=>{
        if(err){
            return res.status(500).json({
                msg:"Internal Server Error"
            })
        }
        if(!match){
            return res.status(401).json({
                msg:"Invalid credentials"
            })
        }
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET);
        
        res.status(200).json({
            msg:"User signed in",
            token:token,
            role:user.role
        })
    })  
   }
   catch(err){
    return res.status(500).json({
        msg:"Internal Server Error",
        
    })
   };
});

module.exports=signinrouter;