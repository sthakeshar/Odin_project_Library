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
displayBook.innerHTML += html;