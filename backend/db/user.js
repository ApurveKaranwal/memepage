const mongoose= require("mongoose");
require('dotenv').config();
const MONGOuser= process.env.MONGOuser;
mongoose.connect(MONGOuser).then(()=>
console.log("MongoDB Connected")).catch((err)=>{
    console.error(err)
})
const userSchema= new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("User",userSchema)