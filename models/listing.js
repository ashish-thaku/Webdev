const mongoose=require("mongoose")
const Schema=mongoose.Schema

const listingSchema=new Schema({
    title:String,
    description:String,
    image:{
        filename:String,
        url:{
            type:String,
        default:"https://images.unsplash.com/photo-1748199625283-581bc1e9b1a8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set:(v)=>
            v===" "
        ? "https://images.unsplash.com/photo-1748199625283-581bc1e9b1a8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        :v,
}
    },
    price:Number,
    location:String,
    country:String,
})

const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;