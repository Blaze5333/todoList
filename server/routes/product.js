const express=require('express')
const router=express.Router()
const products=require('../models/product')
const multer=require('multer')
const checkAuth=require('../middleware/check-auth')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
     cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}

const upload=multer({
storage:storage,
limits:{
    fileSize:1024 * 1024 * 5
},
fileFilter:fileFilter
})
router.get('/',(req,res)=>{
    let response={}
   products.find({}).select("name price productImage").then((data)=>{
    response={
        count:data.length,
        products:data.map((elem)=>{
            return elem
        })
    }
    // res.json(response)
    res.render('home',{image:data.map(elem=>
        
            ({
                imag:"http://localhost:5000/"+elem.productImage
            })
        
        )})
   }).catch((err)=>{res.json(err)})
})
router.post('/', upload.single('productImage'),checkAuth,(req,res)=>{
     console.log(req.file)
   if(req.file)
     { const data=new products({
        name:req.body.name,
        price:req.body.price,
        productImage:req.file.path
    })
    data.save().then((data)=>{
        res.json({"message":"Data Saved"})
    }).catch((err)=>{
        res.json(err)
    })}
    else{
        res.json({
            "message":"Invalid File"
        })
    }
})
router.patch('/',checkAuth,(req,res)=>{
    products.updateOne({name:req.body.name},{$set:req.body}).then(()=>{
        res.json({"message":"Data Updated"})
    }).catch((err)=>{
        res.json(err)
    })
})
router.delete('/',checkAuth,(req,res)=>{
    products.deleteMany({}).then((data)=>{
        res.json({"message":"All Items Deleted"})
    }).catch((err)=>{
        res.json(err)
    })
})
router.delete('/:productName',checkAuth,(req,res)=>{
    products.deleteOne({name:req.params.productName}).then((data)=>{res.json({
        "message":"Item Deleted"
    })}).catch(err=>{res.json(err)})
})

module.exports=router