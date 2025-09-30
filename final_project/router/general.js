const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const { username, password } = req.body;

    // Check if both username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if user already exists
    if (isValid(username)) {
        return res.status(409).json({ message: "User already exists" });
    }

    // Add new user to users array
    users.push({ username, password });

    return res.status(201).json({ message: "User registered successfully" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    // Write your code here
    const getAllBooks = new Promise((resolve, reject) => {
        try {
            resolve(books);
        } catch (error) {
            reject(error);
        }
    });

    getAllBooks
        .then(data => {
            res.send(JSON.stringify(data, null, 4));
        })
        .catch(error => {
            res.status(500).send('Error retrieving books: ' + error);
        });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    // Write your code here
    const getBookByIsbn = new Promise((resolve, reject) => {
        try {
            const isbn = req.params.isbn;
            const book = books[isbn];
            if (book) {
                resolve(book);
            } else {
                reject(new Error('Book not found'));
            }
        } catch (error) {
            reject(error);
        }
    });

    getBookByIsbn
        .then(data => {
            res.send(JSON.stringify(data, null, 4));
        })
        .catch(error => {
            res.status(404).send('Error: ' + error.message);
        });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;

    const getBooksByAuthor = new Promise((resolve, reject) => {
        try {
            const matchingBooks = {};

            for (let id in books) {
                if (books[id].author === author) {
                    matchingBooks[id] = books[id];
                }
            }

            if (Object.keys(matchingBooks).length > 0) {
                resolve(matchingBooks);
            } else {
                reject(new Error('No books found for this author'));
            }
        } catch (error) {
            reject(error);
        }
    });

    getBooksByAuthor
        .then(data => {
            res.send(JSON.stringify(data, null, 4));
        })
        .catch(error => {
            res.status(404).send({ message: error.message });
        });
});


// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;

    const getBooksByTitle = new Promise((resolve, reject) => {
        try {
            const matchingBooks = {};

            for (let id in books) {
                if (books[id].title === title) {
                    matchingBooks[id] = books[id];
                }
            }

            if (Object.keys(matchingBooks).length > 0) {
                resolve(matchingBooks);
            } else {
                reject(new Error('No books found with this title'));
            }
        } catch (error) {
            reject(error);
        }
    });

    getBooksByTitle
        .then(data => {
            res.send(JSON.stringify(data, null, 4));
        })
        .catch(error => {
            res.status(404).send({ message: error.message });
        });
});


// Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    // Using Promise to handle asynchronous operation
    const getBookReview = new Promise((resolve, reject) => {
        try {
            // Check if the book exists
            if (books[isbn]) {
                resolve(books[isbn].reviews);
            } else {
                reject(new Error('Book not found'));
            }
        } catch (error) {
            reject(error);
        }
    });

    getBookReview
        .then(data => {
            res.send(JSON.stringify(data, null, 4));
        })
        .catch(error => {
            res.status(404).send({ message: error.message });
        });
});


module.exports.general = public_users;
