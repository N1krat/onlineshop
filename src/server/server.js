const sqlite = require('sqlite3');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new sqlite.Database("userData.db", (err) => {
    if (err) {
        console.log(err);
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        username TEXT UNIQUE, 
        password TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        price INTEGER, 
        description TEXT, 
        image TEXT
    )`);
});

app.post('/register',async (req, res) => {
    const { username, password } = req.body; 

    if (!username || !password) {
        return res.status(400).send('All fields are required');
    }

    try{
        hashedPassword = await bcrypt.hash(password, 10);
        db.run(`
            INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword],
            function (err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint')) {
                        return res.status(400).send('Username already exists');
                    }
                    return res.status(500).send('Database error');
                }
                res.status(201).send('User registered successfully');
            }
        )
        
    } catch (error) {
        res.status(500).send('Error hashing password');
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if(!username || !password){
       return res.status(400).send("All fields are requiered")
    }

    db.get(
        `SELECT * FROM users WHERE username = ?`, [username], async (err, user) =>{
            if(err){
                return res.status(500).send('Database error');
            }
            if (!username) {
                return res.status(400).send('User not found');
            }
            const pass = await bcrypt.compare(password, user.password)
            if (!pass){
                return res.status(400).send('Password invalid')
            }
            return res.status(200).send('Login succesfull')
        }
    )

    
})
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));