const mongoose= require("mongoose")
require('dotenv').config();
const MONGOdata= process.env.MONGOdata;

mongoose.connect(MONGOdata).then(()=>
console.log("MongoDB Connected")).catch((err)=>{
    console.error(err)
})

const memeSchema= new mongoose.Schema({
    title:String,
    image: String,
    sound: String
},{timeStamps: true});

module.exports = mongoose.model("meme", memeSchema);
