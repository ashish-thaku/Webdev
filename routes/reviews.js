const express=require("express")
const router=express.Router({mergeParams:true})
const wrapAsync=require("../init/wrapAsync.js");
const Review=require("../models/reviews.js")
const Listing=require("../models/listing.js")
const {validateReviews,isLoggedIn,isReviewOwner}=require("../middleware.js")
const {CreateReview,DestroyReview}=require("../controller/reviews.js");


//Reviews
//post route
router.post("/",isLoggedIn,validateReviews,wrapAsync(CreateReview ))

//Delete Reviews
router.delete("/:reviewId",isReviewOwner,wrapAsync(DestroyReview))

module.exports=router