const express = require("express");
const router=express.Router()
const wrapAsync=require("../init/wrapAsync.js");
const {isLoggedIn,isOwner,validtelisting}=require("../middleware.js");
const { index,CreateRoute,ShowRoute,EditRoute,UpdateRoute,DeleteRoute } = require("../controller/listing.js");

const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({storage })

router.route("/").get(wrapAsync(index))//index route
.post(isLoggedIn,upload.single('listing[image]'),validtelisting,wrapAsync(CreateRoute));//Create Route

//New Route
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new"); // or whatever your form view is
});

router.route("/:id").get(wrapAsync(ShowRoute))// Show Route (renamed to match plural "listings")
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validtelisting,wrapAsync(UpdateRoute))//Update Route
.delete( isLoggedIn, isOwner,wrapAsync( DeleteRoute));//DELETE ROUTE

//Edit ROute
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(EditRoute))

module.exports=router