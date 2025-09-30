const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

const authenticatedUser = (username, password) => { //returns boolean
    // Filter the users array for any user with the same username and password
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    //Write your code here
    const { username, password } = req.body;
    
    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    
    // Check if user exists and credentials are valid
    if (authenticatedUser(username, password)) {
        // Generate JWT token - using the same secret as in app.js for verification
        const token = jwt.sign({ username }, 'access', { expiresIn: '1h' });
        
        // Store the token in session as expected by auth middleware
        req.session.authorization = { accessToken: token };
        
        return res.status(200).json({ 
            message: "Login successful",
            token: token 
        });
    } else {
        return res.status(401).json({ message: "Invalid username or password" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    // The authentication middleware should have already set req.user
    // Get the username from the authenticated user
    const username = req.user.username;
    
    if (!username) {
        return res.status(401).json({ message: "Access denied. No user logged in." });
    }
    
    // Get the ISBN and review from request parameters and query
    const { isbn } = req.params;
    const { review } = req.query; // Review comes from query parameters
    
    // Check if book exists
    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }
    
    // Initialize reviews array if it doesn't exist
    if (!books[isbn].reviews) {
        books[isbn].reviews = {};
    }
    
    // Add or update the review with username as key
    books[isbn].reviews[username] = review;
    
    return res.status(200).json({ 
        message: "Review added/updated successfully",
        reviews: books[isbn].reviews 
    });
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    // The authentication middleware should have already set req.user
    // Get the username from the authenticated user
    const username = req.user.username;
    
    if (!username) {
        return res.status(401).json({ message: "Access denied. No user logged in." });
    }
    
    // Get the ISBN from request parameters
    const { isbn } = req.params;
    
    // Check if book exists
    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }
    
    // Check if reviews exist for this book
    if (!books[isbn].reviews) {
        return res.status(404).json({ message: "No reviews found for this book" });
    }
    
    // Check if the user has a review for this book
    if (!books[isbn].reviews.hasOwnProperty(username)) {
        return res.status(404).json({ message: "Review not found for this user and book" });
    }
    
    // Delete the review by username
    delete books[isbn].reviews[username];
    
    return res.status(200).json({ 
        message: "Review deleted successfully",
        reviews: books[isbn].reviews 
    });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;