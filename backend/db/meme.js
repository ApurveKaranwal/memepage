const mongoose= require("mongoose")
require('dotenv').config();
MONGO= process.env.MONGO;
const { timeStamp } = require("node:console")

mongoose.connect(MONGO).then(()=>
console.log("MongoDB Connected")).catch((err)=>{
    console.error(err)
})

const memeSchema= new mongoose.schema({
    title:String,
    image: String,
    sound: String
},{timeStamp: true});

module.exports = mongoose.model("meme", memeSchema);
