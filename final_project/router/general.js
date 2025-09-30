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
    //Write your code here
    res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn
    res.send(books[isbn])
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;

    // Search through all books to find matches
    const matchingBooks = {};

    for (let id in books) {
        if (books[id].author === author) {
            matchingBooks[id] = books[id];
        }
    }

    // Return the matching books or a message if none found
    if (Object.keys(matchingBooks).length > 0) {
        res.send(matchingBooks);
    } else {
        res.status(404).send({ message: "No books found for this author" });
    }
});


// Get all books based on title
// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;

    // Search through all books to find matches
    const matchingBooks = {};

    for (let id in books) {
        if (books[id].title === title) {
            matchingBooks[id] = books[id];
        }
    }

    // Return the matching books or a message if none found
    if (Object.keys(matchingBooks).length > 0) {
        res.send(matchingBooks);
    } else {
        res.status(404).send({ message: "No books found with this title" });
    }
});


// Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    // Check if the book exists
    if (books[isbn]) {
        // Return the reviews for that book
        res.send(books[isbn].reviews);
    } else {
        // Book not found
        res.status(404).send({ message: "Book not found" });
    }
});


module.exports.general = public_users;
