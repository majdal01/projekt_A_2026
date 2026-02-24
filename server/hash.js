const bcrypt = require("bcrypt")

async function hashPassword() {
    const hash = await bcrypt.hash("5fiskihavetsvømmer", 10)
    console.log(hash)
}

hashPassword()