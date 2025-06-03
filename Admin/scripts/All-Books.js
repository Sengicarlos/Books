document.addEventListener('DOMContentLoaded', () => {
    const bookTableBody = document.getElementById('bookTableBody');
    const addBookBtn = document.getElementById('addBookBtn');
    const searchBar = document.getElementById('searchBar');
    const addBookModal = document.getElementById('addBookModal');
    const closeModal = document.getElementById('closeModal');
    const saveBookBtn = document.getElementById('saveBookBtn');

    const bookTitleInput = document.getElementById('bookTitle');
    const bookAuthorInput = document.getElementById('bookAuthor');
    const bookISBNInput = document.getElementById('bookISBN');
    const bookCopiesInput = document.getElementById('bookCopies');
    const bookImageInput = document.getElementById('bookImage');
    const bookPDFInput = document.getElementById('bookPDF');

    let books = JSON.parse(localStorage.getItem('books')) || [];
    let editingIndex = null; // Track the index of the book being edited

    const saveBooks = (books) => {
        localStorage.setItem('books', JSON.stringify(books));
    };

    const renderBooks = () => {
        bookTableBody.innerHTML = '';
        books.forEach((book, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td>${book.copies}</td>
                <td><img src="${book.image}" alt="${book.title}" style="width: 50px; height: auto;"></td>
                <td><a href="${book.pdf}" target="_blank">View PDF</a></td>
                <td class="action-buttons">
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="cancel" data-index="${index}">Delete</button>
                </td>
            `;
            bookTableBody.appendChild(row);
        });
    };

    const resetForm = () => {
        bookTitleInput.value = '';
        bookAuthorInput.value = '';
        bookISBNInput.value = '';
        bookCopiesInput.value = '';
        bookImageInput.value = '';
        bookPDFInput.value = '';
        editingIndex = null;
    };

    // Show modal for adding a new book
    addBookBtn.addEventListener('click', () => {
        resetForm();
        addBookModal.style.display = 'block';
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        addBookModal.style.display = 'none';
    });

    // Save book (add or edit)
    saveBookBtn.addEventListener('click', () => {
        const title = bookTitleInput.value;
        const author = bookAuthorInput.value;
        const isbn = bookISBNInput.value;
        const copies = bookCopiesInput.value;
        const image = bookImageInput.value;
        const pdf = bookPDFInput.value;

        if (title && author && isbn && copies && image && pdf) {
            if (editingIndex !== null) {
                // Edit existing book
                books[editingIndex] = { title, author, isbn, copies, image, pdf };
            } else {
                // Add new book
                books.push({ title, author, isbn, copies, image, pdf });
            }
            saveBooks(books);
            renderBooks();
            addBookModal.style.display = 'none';
        } else {
            alert('All fields are required!');
        }
    });

    // Edit book functionality
    bookTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit')) {
            const index = e.target.dataset.index;
            const book = books[index];

            // Populate form with book details
            bookTitleInput.value = book.title;
            bookAuthorInput.value = book.author;
            bookISBNInput.value = book.isbn;
            bookCopiesInput.value = book.copies;
            bookImageInput.value = book.image;
            bookPDFInput.value = book.pdf;

            editingIndex = index; // Set the index of the book being edited
            addBookModal.style.display = 'block';
        }
    });

    // Delete book functionality
    bookTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('cancel')) {
            const index = e.target.dataset.index;
            books.splice(index, 1);
            saveBooks(books);
            renderBooks();
        }
    });

    // Search functionality
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.isbn.toLowerCase().includes(searchTerm)
        );
        bookTableBody.innerHTML = '';
        filteredBooks.forEach((book, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td>${book.copies}</td>
                <td><img src="${book.image}" alt="${book.title}" style="width: 50px; height: auto;"></td>
                <td><a href="${book.pdf}" target="_blank">View PDF</a></td>
                <td class="action-buttons">
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="cancel" data-index="${index}">Delete</button>
                </td>
            `;
            bookTableBody.appendChild(row);
        });
    });

    // Initial render
    renderBooks();
});