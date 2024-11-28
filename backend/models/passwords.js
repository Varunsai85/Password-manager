import mongoose from "mongoose";

const sealPass=new mongoose.Schema({
    id:String,
    url:String,
    username:String,
    password:String
})

export const sealPassmon=mongoose.model('sealpass_passwords',sealPass);