import express from 'express';
import sqlite3 from 'sqlite3';

const router = express.Router();
const db = new sqlite3.Database('../notes.db');

router.post('/', (req, res) => {
    const keyword = req.body.keyword;
    if (!keyword) {
        return res.status(400).json({ error: 'Keyword is required' });
    }

    db.all('SELECT id, title FROM notes WHERE content LIKE ?', [`%${keyword}%`], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(rows);
    });
});

export default router;
