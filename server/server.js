const express = require("express");
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const { authenticate, authorize } = require("./middleware/auth")

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "supersecretkey"

app.post("/login", async (req, res) => {
  const { username, password} = req.body

  const users = JSON.parse(fs.readFileSync(":/users.json"))
  const user = users.find(u => u.username === username)

  if (!user) {
    return res.status(401).json({ message: "Bruger ikke fundet" })
  }

  //Midlertidig spring password-check over
  const token = jwt.sign(
    { id:user.id, role: user.role },
    SECRET,
    { expiresIn: "1h" }
  )

  res.json({ token })
})

app.get("/users", authenticate, authorize("admin"), (req, res) => {
  const users = JSON.parse(fs.readFileSync("./users.json"))
  res.json(users)
})

app.put("/users/:id", authenticate, authorize("admin"), (req, res) => {
  const { role } = req.body
  const users = JSON.parse(fs.readFileSync("./users.json"))

  const user = user.find(u => u.id == req.params.id)
  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  user.role = role
  fs.writeFileSync("./users.json", JSON.stringify(users, null, 2))

  res.json({ message: "Role updated" })
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})