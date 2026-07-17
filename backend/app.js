const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
const db = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'example',
    database: 'testdb'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.get('/', (req, res) => {
    res.send('<h1 style="font-size: 2em; font-weight: bold;">Hello from the Backend</h1>');
});

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});

app.post('/users', (req, res) => {
    const user = { name: req.body.name };
    const query = 'INSERT INTO users SET ?';
    db.query(query, user, (err, result) => {
    if (err) {
        res.status(500).send(err);
    } else {
        res.status(201).send(result);
    }
    });
});

app.get('/users', (req, res) => {
 const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(results);
        }
    });
});