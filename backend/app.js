const express = require('express');
const multer = require('multer');
const path = require('path');
const File = require('./models/File');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
app.get('/files', async (req, res) => {
  const files = await File.findAll();
  res.json(files);
});

app.post('/upload', upload.single('file'), async (req, res) => {
    console.log(req.file); // Log file upload
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const file = await File.create({
        name: req.file.originalname,
        path: `/uploads/${req.file.filename}`,
    });
    res.json(file);
});


// Static route for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

