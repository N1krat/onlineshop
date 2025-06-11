const Database = require("better-sqlite3");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// configul pentru multer storage imagini
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, "uploads");
    fs.mkdirSync(uploadsDir, { recursive: true });
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const uniqueName = `${baseName}-${uniqueSuffix}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const db = new Database("userData.db");

db.prepare(
  `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      email TEXT UNIQUE,
      password TEXT,
      token TEXT UNIQUE
  )`,
).run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price INTEGER,
      description TEXT
  )`,
).run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      product_id INTEGER,
      quantity INTEGER,
      action INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
  )`,
).run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS uploads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER,
      image TEXT,
      FOREIGN KEY (product_id) REFERENCES products(id)
  )`,


).run();

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).send("All fields are required");
  }

  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
    return res.status(400).send("Invalid email address");
  }
  try {
    const token = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    db.prepare(
      `INSERT INTO users (username, email, password, token) VALUES (?, ?, ?, ?)`,
    ).run(username, email, hashedPassword, token);

    res.status(201).send("User registered successfully");
  } catch (error) {
    if (error.message.includes("UNIQUE constraint")) {
      return res.status(400).send("Username or email already exists");
    }
    res.status(500).send("Database error");
  }
});

app.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const user = db
      .prepare("SELECT * FROM users WHERE username = ?")
      .get(username);
    console.log("User from DB:", user);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const passMatch = bcrypt.compareSync(password, user.password);
    console.log("Password match?", passMatch);

    if (!passMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }
    res.json({ message: "Login Succesfull", token: user.token });
  } catch (err) {
    console.error("Error in /login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
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

app.get("/products/:id", (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM products WHERE id = ?");
    const product = stmt.get(req.params.id);
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.post("/products", upload.array("images", 5), (req, res) => {
  const { name, price, description } = req.body;
  console.log("req.files:", req.files);

  if (!name || !price || !description) {
    return res.status(400).json({ error: "Missing product data" });
  }

  try {
    const result = db
      .prepare(
        `INSERT INTO products (name, price, description) VALUES (?, ?, ?)`,
      )
      .run(name, price, description);

    const productId = result.lastInsertRowid;

    const insertImage = db.prepare(
      "INSERT INTO uploads (product_id, image) VALUES (?, ?)",
    );
    const insertMany = db.transaction((files) => {
      for (const file of files) {
        insertImage.run(productId, file.filename);
      }
    });

    if (req.files && req.files.length > 0) {
      insertMany(req.files);
    } else {
      return res.status(400).json({ error: "No images uploaded" });
    }

    res.status(201).json({ message: "Product and images uploaded", productId });
  } catch (error) {
    console.error("Error in /products POST:", error);
    res.status(500).json({ error: "Database error" });
  }
});

app.put("/products/:id", (req, res) => {
  const productId = Number(req.params.id);
  const { name, price, description } = req.body;

  if (isNaN(productId)) {
    return res.status(400).send("ID invalid");
  }

  if (!name || !price || !description) {
    return res.status(400).json({ error: "Missing product data" });
  }

  try {
    const result = db
      .prepare(
        "UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?",
      )
      .run(name, price, description, productId);

    if (result.changes === 0) {
      return res.status(404).send("Product not found");
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error in /products PUT:", error);
    res.status(500).json({ error: "Database error" });
  }
});

app.delete("/products/:id", (req, res) => {
  const productId = Number(req.params.id);

  if (isNaN(productId)) {
    return res.status(400).send("ID invalid");
  }

  try {
    // Șterge întâi din uploads și orders
    db.prepare("DELETE FROM uploads WHERE product_id = ?").run(productId);
    db.prepare("DELETE FROM orders WHERE product_id = ?").run(productId);

    // Abia apoi din products
    const result = db
      .prepare("DELETE FROM products WHERE id = ?")
      .run(productId);

    if (result.changes === 0) {
      return res.status(404).send("Produsul nu a fost găsit");
    }

    res.status(200).send("Produsul și datele asociate au fost șterse");
  } catch (err) {
    console.error("Eroare la ștergere:", err.message);
    res.status(500).send("Eroare la ștergerea produsului");
  }
});


// oders
app.get("/orders", (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM orders");
    const orders = stmt.all();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.get("/orders/extended", (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT 
        o.id AS order_id,
        o.quantity,
        o.action,
        u.id AS user_id,
        u.username,
        u.email,
        p.id AS product_id,
        p.name AS product_name,
        p.price,
        p.description
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN products p ON o.product_id = p.id
    `);
    const extendedOrders = stmt.all();
    res.json(extendedOrders);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Failed to fetch extended orders");
  }
});


app.put("/orders/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const action = parseInt(req.body.action); // Ensure it's a number

  try {
    const stmt = db.prepare("UPDATE orders SET action = ? WHERE id = ?");
    const result = stmt.run(action, id);

    if (result.changes === 0) {
      return res.status(404).send({ error: "Order not found" });
    }

    res.send({ success: true });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send({ error: "Database update failed" });
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

app.post("/AdminUpload/:productId", upload.array("images", 5), (req, res) => {
  const productId = parseInt(req.params.productId);

  if (isNaN(productId)) {
    return res.status(400).send("Invalid product ID");
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No images uploaded");
  }

  const insert = db.prepare(
    "INSERT INTO uploads (product_id, image) VALUES (?, ?)",
  );

  try {
    const insertMany = db.transaction((files) => {
      for (const file of files) {
        insert.run(productId, file.filename);
      }
    });

    insertMany(req.files);
    res.status(201).send("Images uploaded and saved successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error during upload");
  }
});

app.get("/products/:id/images", (req, res) => {
  const productId = parseInt(req.params.id);
  if (isNaN(productId)) return res.status(400).send("Invalid ID");

  try {
    const stmt = db.prepare("SELECT * FROM uploads WHERE product_id = ?");
    const images = stmt.all(productId);
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});

// upload la imagini

app.get("/uploads/:productId", (req, res) => {
  const productId = parseInt(req.params.productId);
  console.log("GET /uploads/:productId called with", productId);

  if (isNaN(productId)) {
    return res.status(400).send("Invalid product ID");
  }

  try {
    const stmt = db.prepare("SELECT * FROM uploads WHERE product_id = ?");
    const images = stmt.all(productId);
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

// Exemplu simplu de verificare token
app.get("/protected", (req, res) => {
  const token = req.headers.authorization;
  const user = db.prepare("SELECT * FROM users WHERE token = ?").get(token);
  if (!user) return res.status(401).send("Unauthorized");
  res.send("Access granted");
});


// creaza order
app.post("/orders", (req, res) => {
  const { userId, productId, quantity } = req.body;
  const action = 0; // Default action value

  try {
    const stmt = db.prepare(
      "INSERT INTO orders (user_id, product_id, quantity, action) VALUES (?, ?, ?, ?)"
    );
    stmt.run(userId, productId, quantity, action);
    res.status(201).send("Order created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error during order creation");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`),
);
