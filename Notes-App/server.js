import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

const PORT = 3000;
const app = express();

const corsOptions = {
    origin: [
        /^https?:\/\/localhost(:\d+)?/, 
        /^https:\/\/([a-zA-Z0-9-]+\.)?vccs\.edu$/
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type'], 
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Serve static files from the Notes-App directory
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'Web-Page/Notes-App')));

let notes = [];

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const { content, category } = req.body;
    if (!content || !category) {
        return res.status(400).json({ error: 'Content and category are required' });
    }
    const newNote = {
        id: Date.now(),
        content,
        category,
        date: new Date().toLocaleString(),
    };
    notes.push(newNote);
    res.status(201).json(newNote);
});

app.put('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const note = notes.find(note => note.id === parseInt(id));
    if (!note) {
        return res.status(404).json({ error: 'Note not found' });
    }
    if (content) {
        note.content = content;
    }
    res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    notes = notes.filter(note => note.id !== parseInt(id));
    res.status(204).send();
});


app.use(express.static(path.join(__dirname)));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});