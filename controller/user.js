const User = require("../models/user");

module.exports.RenderSignupForm=(req,res)=>{
    res.render("users/signup.ejs")
}
module.exports.SignUp=async(req,res)=>{
    try{
        let{username,email,password}=req.body
    let newUser=new User({email,username})
    const registerUser= await User.register(newUser,password) //data store to DB using register() function
    console.log(registerUser)
    req.login(registerUser,(err)=>{
        if(err){
           return next(err)
        }
        req.flash("success","welcome to wanderlust")
        res.redirect("/listings")
    })
}
    catch(e){
        req.flash("error",e.message)
        res.redirect("/signup")
    }
    
}
module.exports.RenderLoginForm=async(req,res)=>{   
    res.render("users/login.ejs")
}

module.exports.LoginForm=async(req,res)=>{
    req.flash("success","you have been logged in")
    const redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl ); //fallback if no redirectUrl
}
module.exports.LogoutForm=(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","you have been logged out")
        res.redirect("/listings")
    })
}