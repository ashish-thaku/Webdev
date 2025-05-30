const express=require("express")
const app=express();
const mongoose=require("mongoose")
const Listing=require("./models/listing.js")
const path=require("path")
const methodOverride=require("method-override")
const ejsMate = require('ejs-mate')

app.use(methodOverride('_method'))
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"/public")))
app.use(express.urlencoded({extended:true}))
app.engine('ejs', ejsMate);

app.listen(8080,()=>{
    console.log("server is listening to 8080")
})

app.get("/",(req,res)=>{
    res.send("i am working")
})

main()
.then(()=>{
    console.log("connection is done")
})
.catch((err)=>{
    console.log(err)
})
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}
//index route
app.get("/listings",async(req,res)=>{
    let allListing=await Listing.find({})
    res.render('listings/index',{allListing}); 
    
})

// New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});
//Create Route
app.post("/listings", async (req, res) => {
    const newlisting = new Listing(req.body.listing);
    await newlisting.save(); // assuming Mongoose model
    console.log(req.body);
    res.redirect("/listings");
});
// Show Route (renamed to match plural "listings")
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

//Edit ROute
app.get("/listings/:id/edit",async(req,res)=>{
    let{id}=req.params
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})
})

//Update Route
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listings/${id}`)
})

//DELETE ROUTE
app.delete("/listings/:id",async(req,res)=>{
    let{id}=req.params;
    let deletedlisting=await Listing.findByIdAndDelete(id)
    console.log(deletedlisting)
    res.redirect("/listings")
})



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