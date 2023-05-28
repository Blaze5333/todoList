const express=require('express')
const router=express.Router()
const list=require('../models/listElements')
const user=require('../models/user')
const passport=require('passport')
const googleAuth=require('../middleware/googleAuth')
const bodyParser = require('body-parser')
const { isValidObjectId } = require('mongoose')
router.post('/listitem1',async(req,res)=>{
   console.log('yes'+isValidObjectId('71d832fe39746da35a38e8'))
   if(isValidObjectId(req.body.id)===false){
      res.send({
         error:'Not A Valid Id'
      })
   }
   else{
       user.find({_id:req.body.id}).then((data)=>{
      if(data.length===0){
         // res.render('404')
      }
      else{
          list.find({userId:req.body.id}).populate('userId','username image').then((data)=>{
        if(data.length==0){
         const data=new list({
            item:[""],
            userId:req.body.id
         }).save().then(()=>{
            list.find({userId:req.body.id}).populate('userId','username image').then((data1)=>{
               res.send({
                  item:data1[0].item,
                  username:data1[0].userId.username,
                  image:data1[0].userId.image
               })
            })
         })
        }
        else{
         res.send({
            item:data[0].item,
            username:data[0].userId.username,
            image:data[0].userId.image
         }

         )
        }
     })
      }
   })
   }
   // if(!ObjectId.isValid(req.body.id)){
   //    res.render('404')
   // }
  
   // console.log(`You are funny from get ${JSON.stringify(req.user)}`)
    
   
})

router.post('/listitem',async(req,res)=>{
   // console.log(req.body.id)
   // console.log(req.user)
   let arr=[]
 list.find({userId:req.user[0]._id}).then((resp)=>{
      arr=resp[0].item
      // console.log(arr)
      console.log(arr)
      const date=new Date()
      const fulldate=`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
      const time=`${date.getHours()}:${date.getMinutes()}`
      const ar={
         "item":req.body.item,
         "date":`${fulldate} (${time})`
      }
      arr.push(ar)
      list.findOneAndUpdate({userId:req.user[0]._id},{item:arr}).then(()=>{

      })
 })  
 
   res.redirect(`http://localhost:3000/todolist?uid=${req.user[0]._id}`)
})
router.post('/deleteitem',(req,res)=>{
   const delitem=Object.keys(req.body)[0]
   
   list.find({userId:req.user[0]._id}).then((data)=>{
      let arr=data[0].item
      console.log(arr)
      arr=arr.filter((elem)=>elem.item?elem.item!=delitem:elem)
      list.findOneAndUpdate({userId:req.user[0]._id},{item:arr}).then((data)=>{
         console.log(data)
      })
   })
   res.redirect(`http://localhost:3000/todolist?uid=${req.user[0]._id}`)
})




module.exports=router