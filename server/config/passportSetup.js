const passport=require('passport');
const googleStrategy=require('passport-google-oauth20')
const keys=require('./keys')
const user=require('../models/user')
passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    user.find({_id:id}).then((data)=>{
        console.log(data)
        done(null,data)
        
    })
    
})
passport.use(
    new googleStrategy({
    //options for the google strategy
    // callbackURL:"http://localhost:3000/todolist",
    callbackURL:"http://localhost:5000/user/googleRedirect",
    clientID:keys.google.clientId,
    clientSecret:keys.google.clientSecret,
},(accessToken,refreshToken,profile,done)=>{
    console.log( "hello",profile)
    user.find({googleId:profile.id}).then((data)=>{
        
        if(data.length===0){
            console.log("data not present")
        const saveData=new user({
        username:profile.displayName,
        googleId:profile.id,
        image:profile.photos[0].value
    }).save().then((data1)=>{
        console.log(data1)
        done(null,data1)
} 
).catch((err)=>{

        console.log(err)
        done(null,err)
    })
}
else{
    console.log('user already exist')
    done(null,data[0])
}
    })
    
    //passport cb function
    console.log(profile)
    console.log('passport call back function')
    
    // done()
}))

