const express = require('express');
const router = express.Router();
const { signin, signup } =  require("../types")
const loginLimiter = require("../middleware/loginLimiter")
const Redis = require("ioredis");
const { prisma } = require("../config/db");

const redis = new Redis()

router.post('/signup', async(req,res) => {
    const parsedPayload = signup.safeParse(req.body)
    if(!parsedPayload.success) {
        return res.status(400).json({
            msg: "you sent wrong inputs"
        });
    }
  
    try{
      const { name, email, password } = parsedPayload.data;
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });
      
      if (existingUser) {
        return res.status(400).json({
          msg: "Email is already registered"
        });
      }
      
      await redis.set(
        `signup:${email}`,
        JSON.stringify({ 
          name,
          email,
          password
        }),
        "EX", 300
      );
      
      res.json({
        msg: "Proceed to OTP verification"
      });
  }
    catch(err) {
        console.error(err)
    res.status(401).json({
        msg: "Internal server error"
      });
    };
});

router.post("/signin", loginLimiter, async(req,res) => {
    const parsedPayload = signin.safeParse(req.body)
    if (!parsedPayload.success) {
        return res.status(500).json({
            msg: "Invalid email or password"
        });
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
                msg: "Invalid email or password"
            });
        }

      if (user.password !== password) {
        return res.status(401).json({
          msg: "Invalid email or password"
        });
      }

        res.json({
            msg: "Login Successful"
        })
    }
    catch(err) {
        console.error(err);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
    });

module.exports = router;