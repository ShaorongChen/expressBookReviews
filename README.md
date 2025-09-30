# 📘 Express Book Reviews Application

## 📝 Overview

This is a Node.js application built with Express.js that provides a backend for managing book reviews. It includes authentication mechanisms and routes for both general and authenticated user functionalities.

## 🚀 Features

- 🔐 User authentication using JWT tokens
- 👤 Session management with express-session
- 📚 Book review management
- 🌐 RESTful API endpoints
- 🔒 Secure access control

## 🛠️ Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node index.js
   ```

## 📁 Project Structure

```
expressBookReviews/
├── final_project/
│   ├── index.js          # Main application file
│   ├── router/
│   │   ├── auth_users.js  # Authentication routes
│   │   └── general.js     # General routes
└── package.json
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. Users can log in to get an access token
2. All authenticated routes require a valid token
3. Session management is handled via express-session

## 📡 API Endpoints

### General Routes
- `GET /` - Main endpoint
- `GET /books` - Get all books
- `GET /books/:id` - Get book by ID

### Authentication Routes
- `POST /customer/auth/register` - Register new user
- `POST /customer/auth/login` - Login user
- `GET /customer/auth/logout` - Logout user

## 🧪 Testing

To test the application:

1. Start the server
2. Use tools like Postman or curl to make requests to the endpoints
3. Ensure proper authentication headers are included for protected routes

## ⚙️ Configuration

The application runs on port 5000 by default:
```javascript
const PORT = 5000;
```

---

# 📘 Express Book Reviews Application - Usage Examples

## 🚀 Getting Started

To use this application, you'll need to make HTTP requests to the various endpoints. Here are examples using curl commands:

## 🔐 Authentication Examples

### 📝 Register a New User
```bash
curl -X POST http://localhost:5000/customer/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "secure_password123"
  }'
```

### 🔐 Login User
```bash
curl -X POST http://localhost:5000/customer/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "secure_password123"
  }'
```

## 📚 Book Management Examples

### 📖 Get All Books
```bash
curl -X GET http://localhost:5000/
```

### 📖 Get Specific Book by ID
```bash
curl -X GET http://localhost:5000/1
```

## 📝 Review Management Examples

### 📝 Add a New Review
```bash
curl -X POST http://localhost:5000/customer/auth/reviews/1?review=This%20is%20an%20amazing%20book!FromUser3 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### 📝 Get Reviews for a Specific Book
```bash
curl -X GET http://localhost:5000/reviews/1
```

### 📝 Update a Review
```bash
curl -X PUT http://localhost:5000/customer/auth/reviews/1?review=This%20is%20an%20amazing%20book!FromUser2 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### 📝 Delete a Review
```bash
curl -X DELETE http://localhost:5000/reviews/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## 🧪 Testing with Postman

You can also test these endpoints using Postman:

1. Set the request method (GET, POST, PUT, DELETE)
2. Enter the URL (e.g., `http://localhost:5000/theRequireRoutes`)
3. For authenticated routes:
   - Go to the "Headers" tab
   - Add a header with key `Authorization` and value `Bearer YOUR_JWT_TOKEN_HERE`
4. For POST requests, go to the "Body" tab and select "raw" with JSON format
4. For PUT requests, add required params

## 📊 Expected Response Examples

### Successful Login Response
```json
{
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Books List Response
```json
{
    "1": {
        "author": "Chinua Achebe",
        "title": "Things Fall Apart",
        "reviews": {}
    },
    "2": {
        "author": "Hans Christian Andersen",
        "title": "Fairy tales",
        "reviews": {}
    },
    "3": {
        "author": "Dante Alighieri",
        "title": "The Divine Comedy",
        "reviews": {}
    },
    ...
    },
    "10": {
        "author": "Samuel Beckett",
        "title": "Molloy, Malone Dies, The Unnamable, the trilogy",
        "reviews": {}
    }
}
```

### Error Response
```json
{
  "message": "User not authenticated"
}
```

## ⚠️ Important Notes

- All authenticated routes require a valid JWT token in the Authorization header
- Token must be obtained through the login endpoint
- Make sure to replace `YOUR_JWT_TOKEN_HERE` with an actual valid token
- The server runs on port 5000 by default
- Use appropriate HTTP methods (GET, POST, PUT, DELETE) for each endpoint

## 🧪 Testing Authentication Flow

1. Register a user (POST /customer/auth/register)
2. Login to get the JWT token (POST /customer/auth/login)
3. Use that token in subsequent requests to authenticated endpoints
4. Make sure to include the Authorization header with the token format: `Bearer YOUR_TOKEN_HERE`
