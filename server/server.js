const express = require("express");
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

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