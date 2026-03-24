const express = require("express");
const router = express.Router();

const meme = require("../db/meme");
const upload = require("../middleware/upload");
const cloudinary = require("../db/cloudinary");
const fs = require("fs");

router.post("/upload",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "sound", maxCount: 1 }
    ]),
    async (req,res) => {
        try {
            const { title } = req.body;
            const imageFile = req.files["image"]?.[0];
            const soundFile = req.files["sound"]?.[0];

            if (!title || !imageFile) {
                return res.status(400).json({
                    msg: "Title and Image is required"
                })
            }
            const imageUplaod = await cloudinary.uploader.upload(
                imageFile.path,
                { folder: "memes/images" }
            );
            let soundUrl = null;
            if (soundFile) {
                const soundUpload = await cloudinary.uploader.upload(
                    soundFile.path,
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
                    imageUrl,
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
            fs.unlinkSync(imageFile.path);
            if(soundFile){
                fs.unlikeSync(soundFile.path);
            }
            res.json({
                msg: "Meme uploaded successfully"
            })
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                msg: "Upload Failed"
            });
        }
    });

router.post("/", async (req,res) => {
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