const zod = require('zod');
const sign = zod.object({
    email: zod.string().email(),
    password: zod.string()
})

modulde.exports = {
    sign
}