
const mongoose=require('mongoose')
const m=new mongoose.Schema({
   productId:{type:mongoose.Schema.Types.ObjectId,ref:"Products"},
   quantity:{type:Number,default:1}
})
const model=mongoose.model("Orders",m)
module.exports=model