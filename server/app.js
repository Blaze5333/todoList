const  express=require('express')
const bodyParse=require('body-parser')
const mongoose=require('mongoose')
const app=express()
const path=require('path')
app.use(bodyParse.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname,'/public')))
app.set('view engine','ejs')
mongoose.pluralize(false)
const lodash=require('lodash')
const morgan=require('morgan')
const cookieParser=require('cookie-parser')
app.use(cookieParser())
const cookieSession=require('cookie-session')
const passportSetup=require('./config/passportSetup')
const passport=require('passport')
app.use(morgan('dev'))
const keys=require('./config/keys')
app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[keys.session.cookieKey]

}))
app.use(passport.initialize())
app.use(passport.session())
//initialize passport

app.use('/uploads',express.static('uploads'))
require('dotenv').config()

app.use((req,res,next)=>{
   console.log(req.url)
   next()
})

mongoose.connect(keys.mongodb.uri)
const productRouter=require('./routes/product')
const orderRouter=require('./routes/orders')
const userRouter=require('./routes/user')
const dashboardRouter=require('./routes/dashboard')
app.use('/orders',orderRouter)
app.use('/products',productRouter)
app.use('/user',userRouter)
app.use('/dashboard',dashboardRouter)
app.listen(5000,()=>{
    console.log('connected')
})