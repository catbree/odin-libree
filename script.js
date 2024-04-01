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
        }
        else if (this.status == false) {
            this.status = true;
        }
    }
}

class Library {
    constructor() {
        this.books = []
    }

    addBook(newBook) {
        this.books.push(newBook);
    }

    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title);
    }

    getBook(title) {
        return this.books.find((book) => book.title == title)
    }
}

const displayController = (function() {

    const bookList = document.querySelector(".bookList");

    const updateBooksDisplay = () => {
        refreshBooksDisplay();
        for (let book of library.books) {
            createBookCard(book);
        }
    }

    const refreshBooksDisplay = () => {
        bookList.textContent="";
    }

    const createBookCard = (book) => {
        const bookCard = document.createElement("div");
        const bookContent = document.createElement("div");
        const bookTitle = document.createElement("h2");
        const bookAuthor = document.createElement("p");
        const bookPages = document.createElement("p");
        const bookStatus = document.createElement("p");
        const buttonGroup = document.createElement("div");
        const markAsReadButton = document.createElement("button");
        const deleteBookButton = document.createElement("button");
        
        bookCard.classList.add("book");
        bookCard.classList.add("bookContent");
        bookTitle.classList.add("bookTitle");
        bookAuthor.classList.add("bookAuthor");
        bookPages.classList.add("bookPages");
        bookStatus.classList.add("bookStatus");
        buttonGroup.classList.add("buttonGroup");
        markAsReadButton.classList.add("markAsReadButton");
        deleteBookButton.classList.add("redButton");
        deleteBookButton.classList.add("deleteBookButton");

        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookPages.textContent = book.pages;
        markAsReadButton.textContent = "Toggle Status";
        deleteBookButton.textContent = "Delete";
        
        if (book.status == true) {
            bookStatus.textContent = "Read";
        } else {
            bookStatus.textContent = "Not Read";
        }

        deleteBookButton.addEventListener("click", (e) => {
            const title = e.target.parentNode.parentNode.querySelector(".bookTitle").textContent;
            library.removeBook(title);
            updateBooksDisplay();
        })

        markAsReadButton.addEventListener("click", function (e) {
            title = e.target.parentNode.parentNode.querySelector(".bookTitle").textContent;
            targetBook = library.getBook(title);
            targetBook.toggleStatus();
        
            if (targetBook.status == true) {
                e.target.parentNode.parentNode.querySelector(".bookStatus").textContent = "Read";
            } 
            if (targetBook.status == false) {
                e.target.parentNode.parentNode.querySelector(".bookStatus").textContent = "Not Read";
            }
        })

        bookContent.append(bookTitle);
        bookContent.append(bookAuthor);
        bookContent.append(bookPages);
        bookContent.append(bookStatus);

        buttonGroup.append(markAsReadButton);
        buttonGroup.append(deleteBookButton);

        bookCard.append(bookContent);
        bookCard.append(buttonGroup);
        bookList.append(bookCard);
    }  


    var saveBookButton = document.querySelector(".saveBookButton");
    var bookTitle = document.querySelector("#bookTitle");
    var bookAuthor = document.querySelector("#bookAuthor");
    var bookPages = document.querySelector("#bookPages");
    var bookStatus = document.querySelector("#bookStatus");


    saveBookButton.addEventListener("click", () => {
        addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, bookStatus.checked);
        addBookModal.style.display = "none";
    })

    function addBookToLibrary(bookTitle, bookAuthor, bookPages, bookStatus) {
        
        let bookId = library.length;

        const newBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus, bookId);
        library.addBook(newBook);
        displayController.updateBooksDisplay();
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

    return { updateBooksDisplay }

})();


const library = new Library();

const book1 = new Book("Daring Greatly", "Brene Brown", 320, true, 0);
const book2 = new Book("Bridge to Terabithia", "Katherine Paterson", 208, false, 1);
const book3 = new Book("Animal Farm", "Goerge Orwell", 176, false, 2);

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

displayController.updateBooksDisplay();



    
    




