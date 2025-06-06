// routes/booksRoutes.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Books');
const upload = require('../middleware/upload');

// Add a new book (with file upload)
router.post('/add', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'pdf', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, author, isbn, copies } = req.body;
    const image = req.files.image ? `/uploads/images/${req.files.image[0].filename}` : '';
    const pdf = req.files.pdf ? `/uploads/pdfs/${req.files.pdf[0].filename}` : '';

    const newBook = new Book({ title, author, isbn, copies, image, pdf });
    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete book by ID
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
