document.addEventListener('DOMContentLoaded', function () {
  const books = JSON.parse(localStorage.getItem('books')) || [];

  // Handle form submission
  document.getElementById('addBookForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const newBook = {
      title: this.title.value,
      author: this.author.value,
      isbn: this.isbn.value,
      genre: this.genre.value,
      year: this.year.value,
      copies: this.copies.value,
      description: this.description.value,
    };
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
    alert('Book added successfully!');
    this.reset();
  });
});