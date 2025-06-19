const Listing=require("../models/listing")
const Review=require("../models/reviews")

module.exports.CreateReview=async(req,res)=>{
    let listing=await Listing.findById(req.params.id)
    let newReview= new Review(req.body.review)
    newReview.author=req.user._id
    console.log(newReview)
    listing.reviews.push(newReview._id);
    await newReview.save()
    await listing.save();

    res.redirect(`/listings/${listing._id}`)
}

module.exports.DestroyReview=async(req,res)=>{
    let{id,reviewId}=req.params
    // Remove reference from the Listing's reviews array
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // Delete the review document itself
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);

}