const Listing=require("../models/listing")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN; //access token
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index=async(req,res)=>{
    let allListing=await Listing.find({})
    res.render('listings/index',{allListing}); 
}

module.exports.CreateRoute = async (req, res, next) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  const newlisting = new Listing(req.body.listing);
  newlisting.owner = req.user._id;

  // ✅ Handle image upload
  if (req.files["listing[image]"]) {
    newlisting.image = req.files["listing[image]"].map(f => ({
      url: f.path,
      filename: f.filename,
    }));
  }

  // ✅ Handle song upload
  if (req.files["song"]) {
    newlisting.song = {
      url: req.files["song"][0].path,
      filename: req.files["song"][0].filename,
    };
  }

  // ✅ Location geometry
  newlisting.geometry = response.body.features[0].geometry;

  let savelisting = await newlisting.save();
  console.log(savelisting);

  req.flash("success", "Listing created successfully");
  res.redirect("/listings");
};


module.exports.ShowRoute=async (req, res,next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    })
    .populate('owner');
    if(!listing){
    req.flash("error","listings not available")
    return res.redirect("/listings");
    };
    console.log(listing)
    res.render("listings/show", {
  listing
});
}
module.exports.EditRoute=async(req,res)=>{
    let{id}=req.params
    const listing = await Listing.findById(id);
    let OriginalIamgeUrl=listing.image.url
    OriginalIamgeUrl=OriginalIamgeUrl.replace("/upload","/upload/w_300")
    res.render("listings/edit",{listing,OriginalIamgeUrl})
}

module.exports.UpdateRoute=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing})
    if(typeof req.file!=="undefined"){
    let url=req.file.path
    let filename=req.file.filename
    listing.image={url,filename}
    await listing.save();
    }
    res.redirect(`/listings/${id}`)
}

module.exports.DeleteRoute=async (req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted");
    console.log(deletedListing);
    res.redirect("/listings");
}