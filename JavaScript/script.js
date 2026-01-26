let html = '';
const myLibrary=[];
const displayBook = document.getElementById('display-book-container');
const dialog=document.querySelector('dialog');
const addBookBtn=document.getElementById('btn-add-book');
const addBookDialogBtn=document.getElementById('btn-add-book-dialog');
const cancelBookBtn=document.getElementById('cancel-book-btn');

function Book(name, author, pages, readed, id) {
    if (!new.target) {
        throw Error("Must use the new operator to call the function");
    }

    this.name = name;
    this.author = author;
    this.pages = pages;
    this.readed = readed;
    this.id = id;
}

Book.prototype.alternateRead = function () {
  this.readed = this.readed === "true" ? "false" : "true";
};

function addBookToLibrary(name, author, pages, readed) {
  // take params, create a book then store it in the array
    const randomUUID = crypto.randomUUID();
    const newBook=new Book(name, author, pages, readed,randomUUID);
    myLibrary.push(newBook);
}
function removeBook(book) {
  myLibrary.splice(
    myLibrary.findIndex((i) => i.id === book.dataset.id),
    1,
  );

  renderBook();
}

function alternateReadBook(book) {
  myLibrary[
    myLibrary.findIndex((i) => i.id === book.dataset.id)
  ].alternateRead();

  renderBook();
}

function renderBook(){
    myLibrary.map(book => {
    html+=`<div class="book">
                <div id="book-name">
                    <label>Book Name</label>
                    <span>${book.name}</span>
                </div>
                <div id="book-author">
                    <label>Author</label>
                    <span>${book.author}</span>
                </div>
                <div id="book-pages">
                    <label>Pages</label>
                    <span>${book.pages}</span>
                </div> 
                <div>
                    <label for="book-status">
                    <span>${ book.readed === "true" ? "Unread" : "Read"}</span>
                </div>
                <div class="btn">
                    <button class="markReadBtn">${ book.readed === "true" ? "Unread" : "Read"}</span>
                    <button class="deleteBtn">Delete</button>
                </div> 
            </div>`;
    // const markReadBtn=document.querySelector('.markReadBtn');
    // markReadBtn.addEventListener("click", () => alternateReadBook(book));
    }).join('');

    displayBook.innerHTML += html;
}

addBookBtn.addEventListener('click',function(){
    dialog.showModal();
});

cancelBookBtn.addEventListener("click", function (event) {
  event.preventDefault();
  dialog.close();
});
 
addBookDialogBtn.addEventListener('click',function(event){
    event.preventDefault();
    const bookName = document.querySelector("#name");
    const bookAuthor = document.querySelector("#author");
    const bookPages = document.querySelector("#pages");
    const bookReaded = document.querySelector("#readed");

    const bnv = bookName.value;
    const bav = bookAuthor.value;
    const bpv = bookPages.value;
    const brv = bookReaded.value;

    if (bnv && bav && bpv) {
        addBookToLibrary(bnv, bav, bpv, brv);
        dialog.close();
        renderBook();
    } else {
        alert("Please fill in the fields");
    }

});


addBookToLibrary("The Little Prince", "Antoine de Saint-Exupéry", "96", "true");
addBookToLibrary("I Want to Eat Your Pancreas", "Yoru Sumino", "260", "false");
renderBook();