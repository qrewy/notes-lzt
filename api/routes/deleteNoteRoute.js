import express from 'express';
import sqlite3 from 'sqlite3';

const router = express.Router();
const db = new sqlite3.Database('../notes.db');

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM notes WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json({ message: 'Note deleted successfully' });
    });
});

export default router;
