const Redis = require("ioredis")
const redis = new Redis()

const loginLimiter = async (req, res, next) => {
    try {
        const identifier = req.body.email || req.ip
        const key = `login:${identifier}`

        const now =  Date.now()

        await redis.zadd(key, now, now)
        await redis.zremrangebyscore(key, 0 ,now-60000)

        const  count = await redis.zcard(key)

        if(count > 5) {
            return res.status(429).json({
                msg: "Too many login attempts, Try again later."
            })
        }
        await redis.expire(key, 60)
        next()
    }
    catch(err){
        next(err)
    }
}

module.exports = loginLimiter