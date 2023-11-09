import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const port = 3000;

const db = new sqlite3.Database('../notes.db');

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, content TEXT)');
});

app.use(cors());
app.use(express.json());

// Import route handlers
import addNoteRoute from './routes/addNoteRoute.js';
import getAllNotesRoute from './routes/getAllNotesRoute.js';
import getNoteRoute from './routes/getNoteRoute.js';
import searchNotesRoute from './routes/searchNotesRoute.js';
import deleteNoteRoute from './routes/deleteNoteRoute.js';

// Use route handlers
app.use('/create', addNoteRoute);
app.use('/notes', getAllNotesRoute);
app.use('/note', getNoteRoute);
app.use('/search', searchNotesRoute);
app.use('/delete', deleteNoteRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
