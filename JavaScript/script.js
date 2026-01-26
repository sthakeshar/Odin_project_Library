class Book {
    constructor(name, author, pages, readed, id) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.readed = readed;
        this.id = id;
    }

    alternateRead() {
        this.readed = this.readed === "true" ? "false" : "true";
    }
}

const myLibrary = [];
const displayBook = document.getElementById('display-book-container');
const dialog = document.getElementById('add-book-modal');
const bookForm = document.getElementById('book-form');

// --- Functions ---

function addBookToLibrary(name, author, pages, readed) {
    const newBook = new Book(name, author, pages, readed, crypto.randomUUID());
    myLibrary.push(newBook);
}

// 1. Helper to update the numbers at the top
function updateStats() {
    const totalCount = myLibrary.length;
    const readCount = myLibrary.filter(book => book.readed === "true").length;

    document.getElementById('total-count').textContent = totalCount;
    document.getElementById('read-count').textContent = readCount;
}

// 2. Updated Render Function with Filter Support
function renderBook(filterText = "") {
    updateStats(); // Always update counts when rendering
    
    const container = document.getElementById('display-book-container');
    
    // Filter the library based on Search Input
    const filteredLibrary = myLibrary.filter(book => {
        const searchLower = filterText.toLowerCase();
        return book.name.toLowerCase().includes(searchLower) || 
               book.author.toLowerCase().includes(searchLower);
    });

    if (filteredLibrary.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; opacity: 0.5; margin-top: 2rem;">No matching books found...</p>`;
        return;
    }

    container.innerHTML = filteredLibrary.map(book => {
        const statusClass = book.readed === "true" ? "is-read" : "is-unread";
        return `
        <div class="book ${statusClass}" data-id="${book.id}">
            <div><label>Book Name</label><span>${book.name}</span></div>
            <div><label>Author</label><span>${book.author}</span></div>
            <div><label>Pages</label><span>${book.pages}</span></div>
            <div>
                <label>Status</label>
                <span style="color: ${book.readed === 'true' ? 'var(--accent-clr)' : 'inherit'}">
                    ${book.readed === "true" ? "Read" : "Not Read"}
                </span>
            </div>
            <div class="btn">
                <button class="markReadBtn">${book.readed === "true" ? "Unread" : "Read"}</button>
                <button class="deleteBtn">Delete</button>
            </div>
        </div>`;
    }).join('');
}

// 3. Search Event Listener
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', (e) => {
    renderBook(e.target.value);
});

// --- Event Listeners ---

document.getElementById('btn-add-book').addEventListener('click', () => dialog.showModal());

document.getElementById('cancel-book-btn').addEventListener('click', () => {
    bookForm.reset();
    dialog.close();
});

// Event Delegation for card buttons
displayBook.addEventListener('click', (e) => {
    const bookCard = e.target.closest('.book');
    if (!bookCard) return;

    const index = myLibrary.findIndex(b => b.id === bookCard.dataset.id);

    if (e.target.classList.contains('deleteBtn')) {
        myLibrary.splice(index, 1);
    } else if (e.target.classList.contains('markReadBtn')) {
        myLibrary[index].alternateRead();
    }
    renderBook();
});

// Form Logic
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const readed = document.getElementById('readed').value;

    addBookToLibrary(name, author, pages, readed);
    bookForm.reset();
    dialog.close();
    renderBook();
});

// Initial Books
const initialBooks = [
    { name: "The Hobbit", author: "J.R.R. Tolkien", pages: "310", readed: "true" },
    { name: "Atomic Habits", author: "James Clear", pages: "320", readed: "true" },
    { name: "Dune", author: "Frank Herbert", pages: "612", readed: "false" },
    { name: "Project Hail Mary", author: "Andy Weir", pages: "476", readed: "true" },
    { name: "The Midnight Library", author: "Matt Haig", pages: "304", readed: "false" },
    { name: "Neuromancer", author: "William Gibson", pages: "271", readed: "true" }
];

initialBooks.forEach(b => {
    myLibrary.push(new Book(b.name, b.author, b.pages, b.readed, crypto.randomUUID()));
});
renderBook();