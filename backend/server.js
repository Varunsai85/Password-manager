import mongoose from "mongoose";
import express from "express";
import 'dotenv/config';
import { sealPassmon } from "./models/passwords.js";
import bodyParser from "body-parser";
import cors from "cors";


const app=express();
const port=3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connected to database");
}).catch((err)=>{
    console.log(`Failed to connect to database with error ${err}`);
})

app.get("/", async(req,res)=>{
    try{
        const collection=await sealPassmon.find({});
        res.json(collection);
    }catch(error){
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching data' });
    }
})

app.post("/",async(req,res)=>{
    try{
        const data=req.body;
        const dataInserted = new sealPassmon({id:data.id,url:data.url,username:data.username,password:data.password});
        await dataInserted.save();
        console.log(data);
        res.send(dataInserted);
    }catch(error){
        console.error('Error Inserting data:', error);
        res.status(500).json({ message: 'Error fetching data' });
    }
})

app.delete("/",async(req,res)=>{
    try{
        const data=req.body;
        console.log(data);
        const collection=await sealPassmon.findOneAndDelete({id:data.id})
        res.send({success:true,result:collection});
    }catch(error){
        console.error('Error Inserting data:', error);
        res.status(500).json({ message: 'Error Deleting data' });
    }
})

app.put("/",async(req,res)=>{
    try{
        const data=req.body;
        console.log(data);
        const collection=await sealPassmon.findOneAndUpdate({id:data.id},{url:data.url,username:data.username,password:data.password});
        res.send({success:true,result:collection});
    }catch(error){
        console.error('Error Inserting data:', error);
        res.status(500).json({ message: 'Error Updating data' });
    }
})

app.get("/test",(req,res)=>{
    res.send("Hello this is for test");
})


app.listen(port,()=>{
    console.log(`Server listening on http://localhost:${port}`);
})