const express=require('express')
const router=express.Router()
const list=require('../models/listElements')
const user=require('../models/user')
const passport=require('passport')
router.get('/',passport.authenticate('google'),(req,res)=>{
   list.find({userId:req.user._id}).populate("userId","username image").then((data)=>{
      if(data.length>0){
      console.log(data[0].userId.username)
      res.render('Dashboard',{items:data[0].item,image:req.body.image,id:req.user._id})
      }
      else{
         res.render('Dashboard',{image:req.user.image,items:[""],id:req.user._id
      })
         
      }
   })
   
})
router.post('/list/:userId',(req,res)=>{
     const arr=[]
     const item=req.body.item
     console.log(item)
     arr.push(item)
     console.log(arr)
     list.find({userId:req.params.userId}).then((data)=>{
      
      
      // console.log(ar)
      // console.log(data.length)
      if(data.length===0){
         const arr=[item]
         console.log(data)
         const dataItem=new list({
            item:arr,
            userId:req.params.userId
         })
         dataItem.save().then(()=>{
            console.log('done')
         }).catch(()=>{console.log(err)})
      }else{
         const ar=data[0].item
         ar.push(item)
         list.findOneAndUpdate({userId:req.params.userId},{item:ar}).then(()=>{
            console.log('updated')
         }).catch((err)=>{
            console.log(err)
         })
      }
     res.redirect("/dashboard/"+req.params.userId)
     })
          
      
      
})



module.exports=router