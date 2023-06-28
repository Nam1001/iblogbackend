const express=require('express')
const router=express.Router();
const Blogs=require("../models/Blog")
const { body, validationResult } = require("express-validator");


router.get('/fetchall',async(req,res)=>{
    try {
        const blogs=await Blogs.find({})
      return res.status(200).json(blogs)


    } catch (error) {
       return res.status(500).json({error:"Some Internal Error Occured"})
    }

     
})


router.post('/createblog',
[
    body("title","Enter the title of your blog").isLength({ min: 3 }), //taking values in the body
    body("description","Enter the description ").isLength({ min: 3 }),
    body("tag","enter the tag").isLength({ min: 3 })
    
  ], async (req, res) => {  //checking for the validations
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //create new Blog
     const blog = await Blogs.create({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        user:req.user
      });
      res.json(blog);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("some internal error occured");
    }
  
    
    
})

router.delete('/deleteblog/:id',async(req,res)=>{
    try {
        const blog=await Blogs.findById(req.params.id)
        if(!blog) return res.status(401).json({error:"user not found"})
        blog=await Blogs.findByIdAndDelete(req.params.id)
        return res.status(200).json({message:"Deleted Successfully"})
    } catch (error) {
         return res.status(500).json({error:"some internal error occured"})
    }
})


router.put('/updateblog/:id',async(req,res)=>{
  try {
    const {title,description,tag}=req.body
    let newblog={}
    newblog.title=title;
    newblog.description=description;
    newblog.tag=tag
    await Blogs.findByIdAndUpdate(req.params.id,{$set:newblog},{new:true})
      return res.status(200).json({message:"Updated Successfully"})
  } catch (error) {
    return res.send(500).json({error:"some internal error occured"})
    
  }
})


module.exports=router