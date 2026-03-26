
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config(); //loading env variables

const app =  express();

connectDB(); //connecting Database

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/memes", require("./routes/meme"));

app.get("/", (req, res) => {
    res.send("meme api running");
});

//404 handle: it runs when any of your routes are not getting called, and user calls any random route
app.use((req, res) => {
    res.status(404).json({
        msg: "Route not found"
    });
});

app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(500).json({
        msg: "Server Error"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})

