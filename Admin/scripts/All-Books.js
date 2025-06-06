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
    const modalBackdrop = document.querySelector('.modal-backdrop');

    let books = JSON.parse(localStorage.getItem('books')) || [];
    let editingIndex = null; // Track the index of the book being edited

    const saveBooks = (books) => {
        localStorage.setItem('books', JSON.stringify(books));
    };

    const renderBooks = async () => {
        const response = await fetch('http://localhost:3000/api/books');
        const books = await response.json();
        const bookTableBody = document.getElementById('bookTableBody');
        bookTableBody.innerHTML = '';

        books.forEach((book, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td>${book.copies}</td>
                <td><img src="http://localhost:3000${book.image}" style="width: 50px;"></td>
                <td><a href="http://localhost:3000${book.pdf}" target="_blank">View PDF</a></td>
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
        modalBackdrop.style.display = 'block';
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        addBookModal.style.display = 'none';
        modalBackdrop.style.display = 'none';
    });

    // Save book (add or edit)
    saveBookBtn.addEventListener('click', async () => {
        const title = bookTitleInput.value;
        const author = bookAuthorInput.value;
        const isbn = bookISBNInput.value;
        const copies = bookCopiesInput.value;
        const imageFile = bookImageInput.files?.[0];
        const pdfFile = bookPDFInput.files?.[0];

        if (title && author && isbn && copies && imageFile && pdfFile) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('author', author);
            formData.append('isbn', isbn);
            formData.append('copies', copies);
            formData.append('image', imageFile);
            formData.append('pdf', pdfFile);

            try {
                const response = await fetch('http://localhost:3000/api/books/add', {
                    method: 'POST',
                    body: formData,
                });

                const result = await response.json();
                if (response.ok) {
                    alert('Book added successfully');
                    renderBooks(); // Function that fetches from backend
                    addBookModal.style.display = 'none';
                    modalBackdrop.style.display = 'none';
                } else {
                    alert(result.error || 'Failed to add book');
                }
            } catch (error) {
                alert('Error: ' + error.message);
            }
        } else {
            alert('All fields are required!');
        }
    });

   document.addEventListener('click', (e) => {
    // Edit button
    if (e.target.classList.contains('edit')) {
        const index = e.target.dataset.index;
        fetch('http://localhost:3000/api/books')
            .then(res => res.json())
            .then(books => {
                const book = books[index];
                bookTitleInput.value = book.title;
                bookAuthorInput.value = book.author;
                bookISBNInput.value = book.isbn;
                bookCopiesInput.value = book.copies;
                editingIndex = index;
                addBookModal.style.display = 'block';
                modalBackdrop.style.display = 'block';
            });
    }

    // Delete button
    if (e.target.classList.contains('cancel')) {
        const index = e.target.dataset.index;
        const confirmDelete = confirm("Are you sure you want to delete this book?");
        if (confirmDelete) {
            fetch('http://localhost:3000/api/books')
                .then(res => res.json())
                .then(async (books) => {
                    const bookToDelete = books[index];
                    const response = await fetch(`http://localhost:3000/api/books/${bookToDelete._id}`, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        alert("Book deleted successfully");
                        renderBooksFromServer();
                    } else {
                        alert("Failed to delete book");
                    }
                });
        }
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

    // Add the updated renderBooksFromServer function
    const renderBooksFromServer = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/books');
            const books = await response.json();

            if (response.ok) {
                const newTableBody = document.createElement('tbody'); // Create a temporary tbody

                books.forEach((book, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td>${book.copies}</td>
                        <td><img src="http://localhost:3000${book.image}" style="width: 50px; height: auto;"></td>
                        <td><a href="http://localhost:3000${book.pdf}" target="_blank">View PDF</a></td>
                        <td class="action-buttons">
                            <button class="edit" data-index="${index}">Edit</button>
                            <button class="cancel" data-index="${index}">Delete</button>
                        </td>
                    `;
                    newTableBody.appendChild(row);
                });

                bookTableBody.replaceWith(newTableBody); // Replace the old tbody with the new one
                newTableBody.id = 'bookTableBody'; // Ensure the new tbody has the same ID
            } else {
                alert('Failed to fetch books from server');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    // Initial render now fetches from the server
    renderBooksFromServer();
});