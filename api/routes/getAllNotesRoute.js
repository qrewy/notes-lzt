import express from 'express';
import sqlite3 from 'sqlite3';

const router = express.Router();
const db = new sqlite3.Database('../notes.db');

router.get('/', (req, res) => {
    db.all('SELECT * FROM notes', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(rows);
    });
});

export default router;
