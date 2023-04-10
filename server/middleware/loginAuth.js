let cookies=require('cookie-parser')
const jwt=require('jsonwebtoken')
module.exports=(req,res,next)=>{
    const token=req.cookies.uid
    if(token){
    const decode=jwt.verify(token,process.env.JWT_KEY,)
    console.log(decode)
    res.redirect('/dashboard/'+decode.userId)
    // res.redirect('/dashboard/'+decode.userId)
    }
    else
    next()
}