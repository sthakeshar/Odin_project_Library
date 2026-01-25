const myLibrary=[
                    {
                        Name:'kns',
                        author:'kns',
                        pages:120,
                        read:true
                    },
                    {
                        Name:'kns1',
                        author:'kns',
                        pages:120,
                        read:true
                    },
                    {
                        Name:'kns2',
                        author:'kns',
                        pages:120,
                        read:true
                    }       
                ];

const displayBook = document.getElementById('display-book-container');


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

function addBookToLibrary(name, author, pages, readed) {
  // take params, create a book then store it in the array
    const randomUUID = crypto.randomUUID();
    const book=new Book(name, author, pages, readed,randomUUID);
    myLibrary.push(book);
}



let html = '';

myLibrary.map(book => {
    html+=`<div>
                <ul>
                    <li>${book.Name}</li>
                    <li>${book.author}</li>
                    <li>${book.pages}</li>
                    <li>${book.read}</li>
                </ul>
            </div>`;
}).join('');
//displayBook.innerHTML += html;