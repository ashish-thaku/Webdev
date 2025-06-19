const express = require("express");
const router=express.Router()
const User=require("../models/user.js");
const wrapAsync = require("../init/wrapAsync.js");
const passport=require("passport")
const {saveRedirectUrl}=require("../middleware.js")
const {RenderSignupForm,SignUp,RenderLoginForm,LoginForm,LogoutForm}=require("../controller/user.js")

router.route("/signup").get(RenderSignupForm)
.post(wrapAsync(SignUp));

router.route("/login").get(RenderLoginForm)
.post(saveRedirectUrl,passport.authenticate('local', { failureRedirect: '/login',failureFlash:true }),LoginForm)


//logout
router.get("/logout",LogoutForm)
module.exports=router;