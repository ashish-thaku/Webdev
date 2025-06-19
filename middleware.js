const Listing = require("./models/listing");
const Review=require("./models/reviews.js")
const ExpressError = require("./init/ExpressError.js"); 
const {listingSchema,reviewSchema}=require("./schema.js")


module.exports.isLoggedIn=(req,res,next)=>{
        if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be signed in")
        return res.redirect("/users/login")
}
next();
}
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        delete req.session.redirectUrl; // ✅ cleanup
    }
    next();
};
module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    // ✅ Make sure owner exists and compare using .equals()
    if (!listing.owner.equals(res.locals.currentUser._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

module.exports.validtelisting=async(req,res,next)=>{
        const { error } = listingSchema.validate(req.body);
        if (error) {
        let msg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, msg); // Goes to error.ejs
    }
    else{
        next();
    }
}

module.exports.validateReviews=(req,res,next)=>{
        const { error } = reviewSchema.validate(req.body);
        if (error) {
        let msg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, msg); // Goes to error.ejs
    }
    else{
        next();
    }
}

module.exports.isReviewOwner = async (req, res, next) => {
    const {id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    // ✅ Make sure owner exists and compare using .equals()
    if (!review.author.equals(res.locals.currentUser._id)) {
        req.flash("error", "You are not the author of the review!");
        return res.redirect(`/listings/${id}`);
    }

    next();
};