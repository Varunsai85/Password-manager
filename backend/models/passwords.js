import mongoose from "mongoose";

const sealPass=new mongoose.Schema({}, { strict: false })

export const sealPassmon=mongoose.model('sealpass_passwords',sealPass);