const express = require('express');
const router = express.Router();
const { prisma } = require("../config/db") 
const { signin, signup } =  require("../types")
const loginLimiter = require("../middleware/loginLimiter")

router.post('/signup', async(req,res) => {
    const parsedPayload = signup.safeParse(req.body)
    if(!parsedPayload.success) {
        res.status(411).json({
            msg: "you sent wrong inputs"
        });
        return;
    }
    try{
      const data = parsedPayload.data;
      await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password
        }
      });
      
        res.json({
            msg: "Signed Up successfully"
        })
    }
    catch(err) {
        console.error(err)
    res.status(500).json({
        msg: "Internal server error"
    });
};
});

router.post("/signin", loginLimiter, async(req,res) => {
    const parsedPayload = signin.safeParse(req.body)
    if (!parsedPayload.success) {
        res.status(500).json({
            msg: "User not found"
        });
        return;
    }
    try {
        const { email, password } = parsedPayload.data;
      const user = await prisma.user.findUnique({
        where: {
          email
        }
      });
      
        if (!user) {
            return res.status(400).json({
                msg: "User not found"
            });
        }

      if (user.password !== password) {
        return res.status(404).json({
          msg: "Wrong Password"
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