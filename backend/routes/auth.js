const express = require('express');
const router = express.Router();
const User = require("../db/user") 
const { sign } =  require("../types")

router.post('/signup', async(req,res) => {
    const parsedPayload = sign.safeParse(req.body)
    if(!parsedPayload.success) {
        res.status(411).json({
            msg: "you sent wrong inputs"
        });
        return;
    }
    try{
        const data = parsedPayload.data;
        await User.create({
            email: data.email,
            password: data.password
        });
        res.json({
            msg: "Signed Up successfully"
        })
    }
    catch(err) {
        console.error(err)
    res.status(500).json({
        msg: "internal server error"
    });
};
});


router.post("/signin", async(req,res) => {
    const parsedPayload = sign.safeParse(req.body)
    if (!parsedPayload.success) {
        res.status(500).json({
            msg: "User not found"
        });
        return;
    }
    try {
        const { email, password } = parsedPayload.data;
        const user = await User.findOne({
            email,
            password
        });
        if (!user) {
            return res.status(400).json({
                msg: "User not found"
            });
        }

        res.json({
            msg: "Login Successful"
        })
    }
    catch(err) {
        console.error(err);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
    });

module.exports = router;