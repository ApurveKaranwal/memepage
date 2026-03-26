const mongoose =  require("mongoose");
require('dotenv').config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGOdata);
        console.log("Data Base connected successfully");
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            msg: "Internal Server Error"
        });
        //process.exit(1) this line could crash entire server if only 1 request failed, server needs to be restarted
    }
};
module.exports = connectDB;
