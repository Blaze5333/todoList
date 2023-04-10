
const mongoose=require('mongoose')
const m=new mongoose.Schema({
   username:{type:String},
   googleId:{type:String},
   image:{type:String}
})
const model=mongoose.model("Userinfo",m)
module.exports=model