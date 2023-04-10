const mongoose=require('mongoose')
const m=new mongoose.Schema({
   item:{type:[String]},
   userId:{type:mongoose.Schema.Types.ObjectId,ref:"Userinfo"}
})
const model=mongoose.model("List",m)
module.exports=model