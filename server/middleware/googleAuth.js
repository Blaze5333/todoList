module.exports=(req,res,next)=>{
   if(req.user){
    next()
   }
   else{
    res.json({
        "message":"User does not exist"
    })
   }
}