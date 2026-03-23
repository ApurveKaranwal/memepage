const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null,"uploads/");
    },
    filename : (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if ( file.mimetype.startsWith(image) || file.mimetype.startsWith("audio")){
        cb(null, true);
    }
    else {
        cb(new Error("only images/audio allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } //LIMIT FILE SIZE TO 10 MBs
})

module.exports = upload;