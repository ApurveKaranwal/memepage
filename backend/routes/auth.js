const express = require('express');
const router = express.Router();

router.post('/signup', async(req,res) => {
    const parsedPayload = sign.safeParase(req.body)
    if(!parsedPayload.success) {
        res.status(411).json({
            msg: "you sent wrong inputs"
        });
        return;
    }
    try{
        const data = parsedPayload.data;
        await user.create({
            email: data.email,
            password: data.password
        });
        res.json({
            msg: "Signed Up successfully"
        })
    }
    catch((err)=>
        console.error(err)
    res.status(500).json({
        msg: "internal server error"
    });
    )
});

app.get("/signin", async(req,res) => {
    try {
        const
    }
})