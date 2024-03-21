const library = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

library[0] = new Book("Daring Greatly", "Brene Brown", 320, true);
library[1] = new Book("Bridge to Terabithia", "Katherine Paterson", 208, false);
library[2] = new Book("Animal Farm", "Goerge Orwell", 176, false);

const bookList = document.querySelector(".bookList");
updateBookDisplay(library);

function refreshBookDisplay() {
    bookList.textContent="";
}

function updateBookDisplay(library) {
    
    for(i=0;i<library.length;i++) {
        console.log(library[i].title);
        const book = document.createElement("div");
        book.classList.add("book");

        const bookContent = document.createElement("div");
        book.classList.add("bookContent");

        const bookTitle = document.createElement("h2");
        bookTitle.textContent = library[i].title;
        bookTitle.classList.add("bookTitle");

        const bookAuthor = document.createElement("p");
        bookAuthor.textContent = library[i].author;
        bookTitle.classList.add("bookAuthor");

        const bookPages = document.createElement("p");
        bookPages.textContent = library[i].pages;
        bookTitle.classList.add("bookPages");

        const bookStatus = document.createElement("p");
        if (library[i].status == true) {
            bookStatus.textContent = "Read";
        } else {
            bookStatus.textContent = "Not Read";
        }
        bookTitle.classList.add("bookStatus");

        const buttonGroup = document.createElement("div");
        buttonGroup.classList.add("buttonGroup");

        const markAsReadButton = document.createElement("button");
        markAsReadButton.textContent = "Mark as read";

        const deleteBookButton = document.createElement("button");
        deleteBookButton.textContent = "Delete";
        deleteBookButton.classList.add("redButton");

        bookContent.append(bookTitle);
        bookContent.append(bookAuthor);
        bookContent.append(bookPages);
        bookContent.append(bookStatus);

        buttonGroup.append(markAsReadButton);
        buttonGroup.append(deleteBookButton);

        book.append(bookContent);
        book.append(buttonGroup);
        bookList.append(book);
        console.log("I've added a book")
    }
}

function addBookToLibrary(bookTitle, bookAuthor, bookPages, bookStatus) {
    const newBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
    console.log("AddBookToLibrary function activated")
    console.log(`${bookTitle} by ${bookAuthor}, ${bookPages} pages, ${bookStatus}`)
    console.log(newBook);
    library.push(newBook);
    refreshBookDisplay();
    updateBookDisplay(library);
}

const addBookButton = document.querySelector(".addBookButton");
var addBookModal = document.querySelector("#addBookModal");
var cancelModalButtons = document.querySelectorAll(".cancelModalButton");

addBookButton.addEventListener("click", () => {
    addBookModal.style.display = "block";
    console.log(`add button clicked`);
})

cancelModalButtons.forEach (cancelModalButton => {
    cancelModalButton.addEventListener("click", () => {
        addBookModal.style.display = "none";
    })
})

var saveBookButton = document.querySelector(".saveBookButton");
var bookTitle = document.querySelector("#bookTitle");
var bookAuthor = document.querySelector("#bookAuthor");
var bookPages = document.querySelector("#bookPages");
var bookStatus = document.querySelector("#bookStatus");

saveBookButton.addEventListener("click", () => {
    addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, bookStatus.checked);
    addBookModal.style.display = "none";
})

