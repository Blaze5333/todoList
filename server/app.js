const  express=require('express')
const bodyParse=require('body-parser')
const mongoose=require('mongoose')
const app=express()
const keys=require('./config/keys')
mongoose.connect(keys.mongodb.uri).then(()=>{
    console.log("Conneceted to database")
})
const path=require('path')
const cors=require('cors')
app.use(cors())
app.use(bodyParse.urlencoded({extended:false}))
app.use(bodyParse.json())

// app.use(express.json())
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


const productRouter=require('./routes/product')
const orderRouter=require('./routes/orders')
const userRouter=require('./routes/user')
const dashboardRouter=require('./routes/dashboard')
app.use('/orders',orderRouter)
app.use('/products',productRouter)
app.use('/user',userRouter)
app.use('/info',dashboardRouter)
app.get('/',(req,res)=>{
    res.send(req.user)
})

app.listen(5000,()=>{
    console.log('connected')
})