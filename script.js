class Book {
    constructor(title, author, pages, status, id) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.id = id;
    }

    toggleStatus() {
        if (this.status == true) {
            this.status = false;
            console.log(`status is read, toggling to ${this.status}`);
        }
        else if (this.status == false) {
            this.status = true;
            console.log(`status is not read, toggling to ${this.status}`);
        }
    }
}

let library = [];


library[0] = new Book("Daring Greatly", "Brene Brown", 320, true, 0);
library[1] = new Book("Bridge to Terabithia", "Katherine Paterson", 208, false, 1);
library[2] = new Book("Animal Farm", "Goerge Orwell", 176, false, 2);

const bookList = document.querySelector(".bookList");
updateBookDisplay(library);

function refreshBookDisplay() {
    bookList.textContent="";
}

function updateBookDisplay(library) {
    
    for(i=0;i<library.length;i++) {
        const book = document.createElement("div");
        book.classList.add("book");

        const bookContent = document.createElement("div");
        book.classList.add("bookContent");

        const bookTitle = document.createElement("h2");
        bookTitle.textContent = library[i].title;
        bookTitle.classList.add("bookTitle");

        const bookAuthor = document.createElement("p");
        bookAuthor.textContent = library[i].author;
        bookAuthor.classList.add("bookAuthor");

        const bookPages = document.createElement("p");
        bookPages.textContent = library[i].pages;
        bookPages.classList.add("bookPages");

        const bookStatus = document.createElement("p");
        if (library[i].status == true) {
            bookStatus.textContent = "Read";
        } else {
            bookStatus.textContent = "Not Read";
        }
        bookStatus.classList.add("bookStatus");

        const buttonGroup = document.createElement("div");
        buttonGroup.classList.add("buttonGroup");

        const markAsReadButton = document.createElement("button");
        markAsReadButton.textContent = "Toggle Status";
        markAsReadButton.classList.add("markAsReadButton");

        const deleteBookButton = document.createElement("button");
        deleteBookButton.textContent = "Delete";
        deleteBookButton.classList.add("redButton");
        deleteBookButton.classList.add("deleteBookButton");

        bookContent.append(bookTitle);
        bookContent.append(bookAuthor);
        bookContent.append(bookPages);
        bookContent.append(bookStatus);

        buttonGroup.append(markAsReadButton);
        buttonGroup.append(deleteBookButton);

        book.append(bookContent);
        book.append(buttonGroup);
        bookList.append(book);
    }

    const deleteBookButtons = document.querySelectorAll(".deleteBookButton");
    const markAsReadButtons = document.querySelectorAll(".markAsReadButton");
    deleteBookButtons.forEach(deleteBookButton => {
        deleteBookButton.addEventListener("click", (e) => {
            targetBookTitle = e.target.parentNode.parentNode.querySelector(".bookTitle").textContent;
            library = library.filter( book => book.title !== targetBookTitle);
            refreshBookDisplay();
            updateBookDisplay(library);
        })
    })
    
    markAsReadButtons.forEach(markAsReadButton => {
        markAsReadButton.addEventListener("click", function (e) {
                console.log(`Mark as read button pressed`);
                targetBookTitle = e.target.parentNode.parentNode.querySelector(".bookTitle").textContent;
                targetBook = library.find(book => book.title == targetBookTitle);
                targetBook.toggleStatus();
    
                if (targetBook.status == true) {
                    e.target.parentNode.parentNode.querySelector(".bookStatus").textContent = "Read";
                    console.log(`updating to ${e.target.parentNode.parentNode.querySelector(".bookStatus").textContent}`);
                } 
                
                if (targetBook.status == false) {
                    e.target.parentNode.parentNode.querySelector(".bookStatus").textContent = "Not Read";
                    console.log(`updating to ${e.target.parentNode.parentNode.querySelector(".bookStatus").textContent}`);
                }
    
    
            })
    })


}

function addBookToLibrary(bookTitle, bookAuthor, bookPages, bookStatus) {
    
    let bookId = library.length;

    const newBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus, bookId);
    console.log(`${bookTitle} by ${bookAuthor}, ${bookPages} pages, ${bookStatus}`)
    library.push(newBook);
    refreshBookDisplay();
    updateBookDisplay(library);
}

const addBookButton = document.querySelector(".addBookButton");
var addBookModal = document.querySelector("#addBookModal");
var cancelModalButtons = document.querySelectorAll(".cancelModalButton");

addBookButton.addEventListener("click", () => {
    addBookModal.style.display = "block";
})

cancelModalButtons.forEach(cancelModalButton => {
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

