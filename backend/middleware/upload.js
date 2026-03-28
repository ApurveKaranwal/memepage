const multer = require("multer");
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if ( file.mimetype.startsWith("image") || file.mimetype.startsWith("audio")){
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