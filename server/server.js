const express = require("express");
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authenticate, authorize } = require("./middleware/auth");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "supersecretkey";

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || ! password) {
    return res.status(400).json({ message: "Udfyld alle felter" });
  }

  const users = JSON.parse(fs.readFileSync("./users.json"));

  const existingUser = users.find(u => u.username === username);

  if (existingUser) {
    return res.status(400).json({ message: "Bruger findes allerede" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    username, 
    password: hashedPassword,
    role: "viewer" // default rolle
  };

  users.push(newUser);

  fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));

  res.status(201).json({ message: "Bruger oprettet" });
});

app.post("/login", async (req, res) => {
  console.log("Login request received");
  const { username, password} = req.body;

  const users = JSON.parse(fs.readFileSync("./users.json"));
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(401).json({ message: "Bruger ikke fundet" });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ message: "Forkert adgangskode" });
  }

  const token = jwt.sign(
    { id:user.id, role: user.role, username: user.username },
    SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

app.get("/users", authenticate, authorize("admin"), (req, res) => {
  const users = JSON.parse(fs.readFileSync("./users.json"));

  const safeUsers = users.map(u => ({
    id: u.id,
    username: u.username,
    role: u.role
  }))
  res.json(safeUsers)
});

app.get("/content", authenticate, (req, res) => {
  const content = JSON.parse(fs.readFileSync("./content.json"));
  res.json(content)
});

app.put("/users/:id", authenticate, authorize("admin"), (req, res) => {
  const { role } = req.body;
  const users = JSON.parse(fs.readFileSync("./users.json"));

  const user = users.find(u => u.id == req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  user.role = role;

//Tjek at mindst én admin findes
  const hasAdmin = users.some(u => u.role === "admin");

  if (!hasAdmin) {
    return res.status(400).json({
      message: "Systemet skal have mindst én administrator"
    });
  }

  fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));

  res.json({ message: "Role updated" });
});

app.put("/content", authenticate, authorize("admin", "editor"), (req, res) => {
  const { text } = req.body;

  fs.writeFileSync(
    "./content.json",
    JSON.stringify({ text }, null, 2)
  );

  res.json({ message: "Content updated" });
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
})