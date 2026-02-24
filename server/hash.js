const bcrypt = require("bcrypt")

async function hashPassword() {
    const hash = await bcrypt.hash("jegser10fuglepåtaget", 10)
    console.log(hash)
}

hashPassword()