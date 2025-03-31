const myLibrary = [];

function Book(title, author, pages, readState) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readState = readState;
    this.id = crypto.randomUUID();
}

function selectBookInputs() {
    return [
        document.querySelectorAll("input[type=text],input[type=number]"),
        document.querySelectorAll("input[type=radio]"),
    ];
}

function extractValues(inputs) {
    const values = [];
    inputs[0].forEach((input) =>
        input.value ? values.push(input.value) : values.push("-")
    );
    inputs[1][0].checked ? values.push("not read") : values.push("read");
    return values;
}

function cleanDialog(inputs) {
    inputs.forEach((input) => {
        input.value = "";
    });
}
function resetOption(radio) {
    radio[0].checked = true;
}

function addBookToLibrary(values) {
    myLibrary.push(new Book(...values));
}

function displayBooks() {
    resetBook();
    myLibrary.forEach((book) => {
        createBookNode(book);
    });
}

function resetBook() {
    let count = grid.childElementCount;
    while (count > 1) {
        grid.removeChild(grid.firstElementChild);
        count--;
    }
}

function deleteBook(e) {
    myLibrary.forEach((book) => {
        if (book.id == e.target.getAttribute("data-id")) {
            myLibrary.splice(myLibrary.indexOf(book), 1);
            grid.removeChild(
                grid.querySelector(
                    `[data-id="${e.target.getAttribute("data-id")}"]`
                )
            );
        }
    });
}

function toggleRead(e) {
    myLibrary.forEach((book) => {
        if (book.id == e.target.getAttribute("data-id")) {
            book.readState = book.readState == "not read" ? "read" : "not read";
            const item = grid.querySelector(
                `.book[data-id="${e.target.getAttribute(
                    "data-id"
                )}"] .book__item:last-child .item2`
            );
            item.textContent = book.readState;
        }
    });
}

function createBookNode(book) {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.setAttribute("data-id", `${book.id}`);
    const title = document.createElement("div");
    title.classList.add("book__title");
    title.textContent = book.title;
    bookElement.appendChild(title);

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("book__items");
    for (let i = 1; i <= 3; i++) {
        const info = document.createElement("div");
        info.classList.add("book__item");
        let infoSubject;
        switch (i) {
            case 1:
                infoSubject = "Author";
                break;
            case 2:
                infoSubject = "Pages";
                break;
            case 3:
                infoSubject = "Read state";
        }
        for (let j = 1; j <= 2; j++) {
            const item = document.createElement("div");
            let index;
            switch (i) {
                case 1:
                    index = "author";
                    break;
                case 2:
                    index = "pages";
                    break;
                case 3:
                    index = "readState";
            }
            item.classList.add(`item${j}`);
            item.textContent = j == 1 ? infoSubject : book[index];
            info.appendChild(item);
        }
        infoContainer.appendChild(info);
    }
    bookElement.appendChild(infoContainer);

    const buttons = document.createElement("div");
    buttons.classList.add("book__button");
    for (let i = 1; i <= 2; i++) {
        const button = document.createElement("p");
        button.classList.add("dialog__bottuns");
        button.textContent =
            i == 1 ? "toggle read state" : "remove from library";
        button.setAttribute("data-id", `${book.id}`);
        i == 1
            ? button.addEventListener("click", toggleRead)
            : button.addEventListener("click", deleteBook);
        buttons.appendChild(button);
    }
    bookElement.appendChild(buttons);
    grid.insertBefore(bookElement, placeHolder);
}

const newBook = document.querySelector(".place-holder");
const dialog = document.querySelector("dialog");
const cancel = document.querySelector(".cancel-dialog");
const addBook = document.querySelector(".add-book");
const grid = document.querySelector(".grid");
const placeHolder = grid.querySelector(".place-holder");

newBook.addEventListener("click", () => {
    dialog.showModal();
});

cancel.addEventListener("click", () => {
    const inputs = selectBookInputs();
    cleanDialog(inputs[0]);
    resetOption(inputs[1]);
    dialog.close();
});

addBook.addEventListener("click", () => {
    const inputs = selectBookInputs();
    const values = extractValues(inputs);
    addBookToLibrary(values);
    displayBooks();
    cleanDialog(inputs[0]);
    resetOption(inputs[1]);
    dialog.close();
});
