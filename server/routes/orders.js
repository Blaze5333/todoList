const express=require('express')
const orders=require('../models/orders')
const mongoose=require('mongoose')
const router=express.Router()
const Product=require('../models/product')
const checkAuth=require('../middleware/check-auth')
router.post('/',checkAuth,(req,res)=>{
    Product.find({_id:req.body.productId}).then((data)=>{
        if(data.length>0)
        {const ord=new orders({
        productId:req.body.productId,
        quantity:req.body.quantity
    })
    ord.save().then(()=>{
        res.status(201).json({"message":"done"})
    }).catch((err)=>{
        res.status(500).json(err)
    })}
    else{
        res.json({
            "message":"No Such Product Exists"
        })
    }
    }).catch((err)=>{
      res.json(err)
    })
    
})
router.get('/',checkAuth,async(req,res)=>{
    let output={}
   orders.find({}).select("productId quantity _id").populate('productId',"name price").then(data=>{
    output={
        count:data.length,
        orders:data.map(elem=>
       ({
        _id:elem._id,
        productId:elem.productId,
        quantity:elem.quantity,
        request:{
            method:"GET",
            url:`http://localhost:5000/orders/${elem._id}`
        }
       })
        )
    }
    res.json(output)
   })

})
router.get('/:orderId',checkAuth,(req,res)=>{
    orders.find({_id:req.params.orderId}).select('productId quantity').then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.json({"message":"No such data found"})
    })
})
router.delete('/',checkAuth,(req,res)=>{
    orders.deleteMany({}).then(()=>{
        res.json({
            "message":"All Orders Deleted"
        })
    })
})
router.delete('/:orderId',checkAuth,(req,res)=>{
    orders.deleteOne({_id:req.params.orderId}).then(()=>{
        res.json({
            "message":`Order with id :${req.params.orderId} deleted`
        })
    })
})
module.exports=router