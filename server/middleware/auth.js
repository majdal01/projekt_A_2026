const jwt = require("jsonwebtoken")

const SECRET = "supersecretkey";

function authenticate(req, res, next) {
    const header = req.headers.authorization

    if (!header) {
        return res.status(401).json({ message: "No token" })
    }

    const token = header.split(" ")[1]

    try {
        const decoded = jwt.verify(token, SECRET)
        req.user = decoded
        next()
    } catch {
        res.status(403).json({ message: "Invalid token" })
    }
}

function authorize(...allowedRoles) {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" })
        }
        next()
    }
}

module.exports = { authenticate, authorize }