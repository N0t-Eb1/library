const myLibrary = [];

function Book(title, author, pages, readState) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readState = readState;
    this.id = crypto.randomUUID();
}

function addBookToLibrary() {
    // take params, create a book then store it in the array
}
const add = document.querySelector(".place-holder");
const dialog = document.querySelector("dialog");
const cancel = document.querySelector(".cancel-dialog");

add.addEventListener("click", () => {
    dialog.showModal();
});
cancel.addEventListener("click", () => {
    dialog.close();
});
