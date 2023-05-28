const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const user=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const checkAuth = require('../middleware/check-auth')
const loginAuth = require('../middleware/loginAuth')
const multer=require('multer')
const date=new Date()
const passport=require('passport')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,date.getTime()+file.originalname)
    }
})
const publish=multer({
    storage:storage
})
router.post('/signup',publish.single("userImage"),(req,res)=>{
  if(req.file)
    {
        if(req.body.password===req.body.confirmPass)
    {
        bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.json(err)
        }
        else{
           const userData=new user({
            name:req.body.name,
            age:req.body.age,
            email:req.body.email,
            password:hash,
            image:"http://localhost:5000/"+req.file.path
    }) 
    userData.save().then((result)=>{
        console.log(result)
        res.render('loginPage')
    }).catch((err)=>{
        res.render('404',{message:err})
    })
        }
    })}
    else{
        res.render('404',{message:"Confirm Password Does not match"})
    }
}
else{
    res.render('404',{message:"Please Upload a valid File"})
}
})
router.get('/signup',(req,res)=>{
    console.log(req.user.image)
   res.render("signupPage")
})
router.get('/login',loginAuth,(req,res,next)=>{
    res.render('loginPage')
})
router.post('/login',(req,res,next)=>{
    user.find({email:req.body.email}).select('email password _id name image').then(userData=>{
        console.log(userData)
         if(userData.length===0){
            res.status(500).render('404',{message:"Auth failed"})
         }
         else{
            bcrypt.compare(req.body.password,userData[0].password,(err,result)=>{
                if(err){
                    res.status(500).render('404',{message:"Auth failed"})
                }
                else{
                    if(result===true){
                        const token=jwt.sign({
                            name:userData[0].name,
                            email:userData[0].email,
                            userId:userData[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn:"1h"
                        },
                        
                        )
                        res.cookie("uid",token).redirect('/user/login')
                        
                    }
                    else{
                        res.status(500).render('404',{message:"Auth failed"})
                    }
                }
            })
         }
    })
})
router.post('/postman',async(req,res)=>{
    const data=new user({
        username:req.body.username,
        googleId:req.body.googleId
    })
   data.save().then((resp)=>{
     res.json(resp)
   }).catch((err)=>{
    res.json(err)
   })
})
router.get('/googleLogin',passport.authenticate('google',{
    scope:['profile']
}))
router.get('/googleRedirect',passport.authenticate('google'),(req,res)=>{
    console.log(req.user)
    res.redirect(`http://localhost:3000/todolist?uid=${req.user._id}`)
})
router.post('/listitem',(req,res)=>{
    
    res.redirect('http://localhost:3000/todolist')

})
router.post('/logout',(req,res,next)=>{
    req.logout();
    req.session.destroy
      res.redirect('http://localhost:3000/');
})

module.exports=router