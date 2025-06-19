if(process.env.NODE_ENV!=="production"){
    require('dotenv').config()
}

const express=require("express")
const app=express();
const mongoose=require("mongoose")
const path=require("path")
const methodOverride=require("method-override")
const ejsMate = require('ejs-mate')
const ExpressError = require("./init/ExpressError.js");
mongoose.set('strictPopulate', false);




const listingsRouter=require("./routes/listing.js")
const reviewsRouter=require("./routes/reviews.js")
const userRouter=require("./routes/user.js")


const session=require("express-session")
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const passport=require("passport")
const LocalStrategy=require("passport-local")
const User = require('./models/user.js');



app.use(methodOverride('_method'))
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"/public")))
app.use(express.urlencoded({extended:true}))
app.engine('ejs', ejsMate);

app.listen(8080,()=>{
    console.log("server is listening to 8080")
})

const dburl=process.env.ATLASDB_URL

main()
.then(()=>{
    console.log("connection is done")
})
.catch((err)=>{
    console.log(err)
})
async function main() {
    await mongoose.connect(dburl)//"mongodb://127.0.0.1:27017/wanderlust"
}
const store=
    MongoStore.create({
        mongoUrl:dburl,
        crypto: {
            secret:process.env.SECRET,
        },
        touchAfter:24* 3600,
    })
store.on("error",()=>{
    coonsole.log("Error in mongo session store ")
})

//Session data
const sessionOption={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000
}}


app.get("/",(req,res)=>{
    res.redirect("/listings")
})



app.use(session(sessionOption));
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
    res.locals.error=req.flash("error")
    res.locals.currentUser=req.user
    next()
})

//Demo user
// app.get("/demouser",async(req,res)=>{
//     let fakeUser=new User({
//         email:"ashish001@gmail.com",
//         username:"deleta-user"
//     })
//     let registerUser= await User.register(fakeUser,"helloworld")
//     res.send(registerUser)
// })


app.use("/listings",listingsRouter)
app.use("/listings/:id/reviews",reviewsRouter)
app.use("/",userRouter)



//Routes
// Catch-all for any routes not matched above
app.use((req, res, next) => {
  next(new ExpressError(404, "page wrong"));
});

// // // Error handling middleware (last)
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs",{message})
});


// app.get('/listing',async(req,res)=>{
//     let samleListing=new Listing({
//         title:"my sweet home",
//         description:"by the beach",
//         price:1200,
//         location:"calcugate ,goa",
//         country:"India",
//     })
//     await samleListing.save();
//     console.log("sample is saved")
//     res.send("connection working")
// })