const mongoose= require("mongoose");
require('dotenv').config();
MONGO= process.env.MONGO;

mongoose.connect(MONGO).then(()=>
console.log("MongoDB Connected")).catch((err)=>{
    console.error(err)
})
const userSchema= new mongoose.schema({
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