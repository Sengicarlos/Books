// models/Books.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true,},
  copies: { type: Number, required: true },
  image: { type: String }, // URL to image
  pdf: { type: String },   // URL to PDF
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
