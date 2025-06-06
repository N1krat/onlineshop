const Database = require("better-sqlite3");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer"); 
const fs = require('fs');
const path = require("path")
// configul pentru multer storage imagini 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueName = product.id + "--" +  file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });



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
      action INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
  )`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS uploads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER,
      image TEXT,
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
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }
  
      const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
      console.log("User from DB:", user);
  
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
  
      const passMatch = bcrypt.compareSync(password, user.password);
      console.log("Password match?", passMatch);
  
      if (!passMatch) {
        return res.status(400).json({ error: "Invalid password" });
      }
  
      // If using JWT, create token here (example)
      const token = jwt.sign({ username: user.username, id: user.id }, "your-secret-key", {
        expiresIn: "1h",
      });
  
      console.log("Token generated:", token);
  
      res.json({ token });
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

app.delete("/products/:id", (req, res) => {
  const productId = Number(req.params.id);

  if (isNaN(productId)) {
    return res.status(400).send("ID invalid");
  }

  try {
    const result = db.prepare("DELETE FROM products WHERE id = ?").run(productId);

    if (result.changes === 0) {
      return res.status(404).send("Produsul nu a fost găsit");
    }

    res.status(200).send("Produs șters cu succes"); 
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

app.put('/orders/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const action = parseInt(req.body.action);  // Ensure it's a number

  try {
    const stmt = db.prepare('UPDATE orders SET action = ? WHERE id = ?');
    const result = stmt.run(action, id);

    if (result.changes === 0) {
      return res.status(404).send({ error: 'Order not found' });
    }

    res.send({ success: true });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send({ error: 'Database update failed' });
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

  const insert = db.prepare("INSERT INTO uploads (product_id, image) VALUES (?, ?)");

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

app.get("/uploads/:productId", (req, res) => {
  const productId = parseInt(req.params.productId);

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


app.use("./uploads", express.static(path.join(__dirname, "./uploads")));


const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);

