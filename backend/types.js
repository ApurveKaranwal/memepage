const zod = require('zod');

const signup = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string()
})
const signin = zod.object({
    email: zod.string().email(),
    password: zod.string()
})

module.exports = { signup, signin }