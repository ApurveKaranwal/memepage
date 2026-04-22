const zod = require('zod');
const sign = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string()
})

module.exports = { sign }