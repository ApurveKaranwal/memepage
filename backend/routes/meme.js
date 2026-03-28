const express = require("express");
const router = express.Router();

const meme = require("../db/meme");
const upload = require("../middleware/upload");
const cloudinary = require("../db/cloudinary");
const streamifier = require("streamifier");

const uploadToCloudinary = (buffer, options) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            options,
            (error, result) => {
                if (result) {
                    resolve(result);
                }
                else{
                    reject(error);
                }
            }
            );
            streamifier.createReadStream(buffer).pipe(stream); //converts buffer into readable stream and then pipe(send) it to cloudinary
        
    });
};

router.post("/upload",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "sound", maxCount: 1 }
    ]),
    async (req,res) => {
        try {
            const { title } = req.body;
            const imageFile = req.files?.image?.[0];
            const soundFile = req.files?.sound?.[0];

            if (!title || !imageFile) {
                return res.status(400).json({
                    msg: "Title and Image is required"
                })
            }
            const imageUpload = await uploadToCloudinary(
                imageFile.buffer,
                { folder: "memes/images" }
            );
            
            let soundUrl = null;

            if (soundFile) {
                const soundUpload = await uploadToCloudinary(
                    soundFile.buffer,
                    {
                        resource_type: "video",
                        folder: "memes/sounds"
                    }
                );
                soundUrl = soundUpload.secure_url;
            }

            try {
                await meme.create({
                    title,
                    imageUrl: imageUpload.secure_url,
                    soundUrl
                });
                res.json({
                    msg: "Saved successfully"
                })
            }
            catch (err) {
                console.error(err);
                res.status(500).json({
                    msg: "internal server error"
                })
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                msg: "Upload Failed"
            });
        }
    });

router.get("/", async (req,res) => {
    try {
        const memes = await meme.find().sort({
            createdAt: -1
        });
        res.json(memes);
    }
    catch (err){
        console.error(err);
        res.status(500).json({
            msg: "Error Fetching memes"
        });
    }
});

module.exports =router;