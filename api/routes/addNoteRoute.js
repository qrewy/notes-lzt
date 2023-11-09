import express from 'express';
import sqlite3 from 'sqlite3';

const router = express.Router();
const db = new sqlite3.Database('../notes.db');

router.post('/', (req, res) => {
    const { content } = req.body;

    if (content) {
        return res.status(400).json({ error: 'content required' });
    }

    const stmt = db.prepare('INSERT INTO notes (content) VALUES (?, ?)');
    stmt.run(content, function (err) {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ id: this.lastID });
    });
    stmt.finalize();
});

export default router;
