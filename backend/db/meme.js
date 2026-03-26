const mongoose= require("mongoose")

const memeSchema= new mongoose.Schema({
    title:String,
    imageUrl: String,
    soundUrl: String,
    upvotes: Number
},{timestamps: true}
);

module.exports = mongoose.model("meme", memeSchema);
