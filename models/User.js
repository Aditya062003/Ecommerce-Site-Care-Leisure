const mongoose = require('mongoose');

const UserSchema = new mongose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
},{timestamps:true})

export default mongoose.model("Order",UserSchema);