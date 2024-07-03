const express= require("express");
const jwt=require("jsonwebtoken");
const zod=require("zod");
const bcrypt=require("bcrypt");
const User=require("../models/User");
const adminrouter=express.Router();
const schema=zod.object({
  email:zod.string().email(),
  password:zod.string().min(6),
  firstname:zod.string(),
  lastname:zod.string()
});
adminrouter.get("/",async (req,res)=>{
    
        const users = await User.find({});
        res.json(users);
      });

      adminrouter.post("/",async (req,res)=>{
        try{
          const result =schema.safeParseAsync(req.body);
          if(!result){
              return res.status(411).json({
                  msg:"Invalid input"
              })
          }
          
         const existinguser=await User.findOne({email:req.body.email});
          if(existinguser){
              return res.status(409).json({
                  msg:"User already exists"
              })
          }
         
          bcrypt.hash(req.body.password,10,async (err,hash)=>{
              if(err){
                  return res.status(500).json({
                      msg:"Internal Server Error due to password hashing"
                  })
              }
              const user=await  User.create({
                  email:req.body.email,
                  password:hash,
                  firstname:req.body.firstname,
                  lastname:req.body.lastname,
                  role:req.body.role || "user"
              });
              
              const token=jwt.sign({userId:user._id},process.env.JWT_SECRET);
             
              res.status(201).json({
                  msg:"User created",
                  token:token,
                  role:user.role
              })
          })
      }
      catch(err){
          return res.status(500).json({
              msg:"Internal Server Error"
          })
      }   
      })
      
      
        
adminrouter.put("/:id", async (req,res)=>{
  try{
    const result =schema.safeParseAsync(req.body);
    if(!result){
        return res.status(411).json({
            msg:"Invalid input"
        })
    }
    
   const existinguser=await User.findById(req.params.id);
    if(!existinguser){
        return res.status(409).json({
            msg:"User not found"
        })
    }
    bcrypt.hash(req.body.password,10,async (err,hash)=>{
      if(err){
          return res.status(500).json({
              msg:"Internal Server Error due to password hashing"
          })
      }
      const user=await  existinguser.updateOne({
          email:req.body.email,
          password:hash,
          firstname:req.body.firstname,
          lastname:req.body.lastname,
          role:req.body.role || "user"
      });
      
      const token=jwt.sign({userId:user._id},process.env.JWT_SECRET);
     
      res.status(201).json({
          msg:"User updated",
          token:token,
          role:user.role
      })
  })
}
catch(err){
  return res.status(500).json({
      msg:"Internal Server Error"
  })
}   

  });
      
      
  
    
      
    adminrouter.delete("/:id", async (req,res)=>{
        const user = await User.findById(req.params.id);
      
        if (user) {
          await user.deleteOne();
          res.json({ message: 'User removed' });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
    });
    
    module.exports=adminrouter;
        
     
      
