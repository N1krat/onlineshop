const Database = require("better-sqlite3");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new Database("userData.db");

db.prepare(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
  )`).run;
db.prepare(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price INTEGER,
      description TEXT,
      image TEXT
  )`).run;



app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("All fields are required");
  }

  try {
    hashedPassword = await bcrypt.hash(password, 10);
    db.run(
      `
            INSERT INTO users (username, password) VALUES (?, ?)`,
      [username, hashedPassword],
      function (err) {
        if (err) {
          if (err.message.includes("UNIQUE constraint")) {
            return res.status(400).send("Username already exists");
          }
          return res.status(500).send("Database error");
        }
        res.status(201).send("User registered successfully");
      },
    );

  } catch (error) {
    res.status(500).send("Error hashing password");
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("All fields are required");
  }

  db.get(
    `SELECT * FROM users WHERE username = ?`,
    [username],
    async (err, user) => {
      if (err) {
        return res.status(500).send("Database error");
      }

      if (!user) {
        return res.status(400).send("User not found");
      }

      const passMatch = await bcrypt.compare(password, user.password);
      if (!passMatch) {
        return res.status(400).send("Invalid password");
      }
      return res.status(200).send("Login successful");
      
    },
  );
});

app.get("/products", (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM products");
    const products = stmt.all();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`),
);