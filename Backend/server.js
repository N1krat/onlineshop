const Database = require("better-sqlite3");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = new Database("userData.db");

db.prepare(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      email TEXT UNIQUE,
      password TEXT
  )`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price INTEGER,
      description TEXT,
      image TEXT
  )`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      product_id INTEGER,
      quantity INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
  )`).run();

  app.post("/register", async (req, res) => {
    const { username, password, email } = req.body;
  
    if (!username || !password || !email) {
      return res.status(400).send("All fields are required");
    }
  
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      return res.status(400).send("Invalid email address");
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      db.prepare(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`)
        .run(username, email, hashedPassword);
  
      res.status(201).send("User registered successfully");
    } catch (error) {
      if (error.message.includes("UNIQUE constraint")) {
        return res.status(400).send("Username or email already exists");
      }
      res.status(500).send("Database error");
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
    }
  );
});

// products 
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

app.post("/products", (req, res) => {
  try { 
    db.prepare(`INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)`)
      .run(req.body.name, req.body.price, req.body.description, req.body.image);
    res.status(201).send("Product added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }

});


// admin page functionality
app.get("/AdminPanelUsers", (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM users");
    const users = stmt.all();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.delete("/AdminUsers/:id", (req, res) => {
  const userId = Number(req.params.id);

  if (isNaN(userId)) {
    return res.status(400).send("ID invalid");
  }

  try {
    const result = db.prepare("DELETE FROM users WHERE id = ?").run(userId);

    if (result.changes === 0) {
      return res.status(404).send("Utilizatorul nu a fost găsit");
    }

    res.status(200).send("Utilizator șters cu succes");
  } catch (err) {
    console.error("Eroare la ștergere:", err.message);
    res.status(500).send("Eroare la ștergerea utilizatorului");
  }
});




const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);

