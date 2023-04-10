const mongoose=require('mongoose')
const schema=new mongoose.Schema({
 name:{type:String,required:true,unique:true},
 price:{type:Number,default:0},
 productImage:{type:String,required:true}
})
const model=mongoose.model("Products",schema)
module.exports=model