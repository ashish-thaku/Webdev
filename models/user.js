const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  passportLocalMongoose = require('passport-local-mongoose');

const userSchema= new Schema({
    email:{
        type:String,
        required:true
        
    }
})
userSchema.plugin(passportLocalMongoose) //  passport-local-mongoose will automatically store  password,username,SALT that.

module.exports=mongoose.model("User",userSchema)