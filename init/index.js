const mongoose=require ("mongoose")
const initdata=require("./data.js")
const Listing=require("../models/listing.js")
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

//delete initial data and insert new data
const initDB=async()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj, owner:"684a9bb9327822eeb1596aad"})) //add extran owner part in db of listing data
    await Listing.insertMany(initdata.data)
    console.log("data inserted successfully")
};
initDB()