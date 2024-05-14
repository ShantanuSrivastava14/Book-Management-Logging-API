# Book Management API

## Table of Contents

- [Introduction](#introduction)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [System Design](#system-design)
- [Features Implemented](#features-implemented)


## Introduction

The Book Management API is designed to provide a backend system for managing books, users, and logging activities. It includes endpoints for user authentication (signup and login), book CRUD operations, and fetching logs.

## Setup

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed and running
- Basic understanding of RESTful APIs

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate to the project directory:

```bash
cd book-management-api
```

3. Install dependencies:

```bash
npm install
```

## System Design

The Book Management API is built using Node.js and Express.js framework. It follows a RESTful architecture with endpoints for user authentication, book management, and logging activities. MongoDB is used as the database for storing user and book data.

The system consists of the following components:

- **User Authentication**: Provides endpoints for user signup and login. Uses JWT (JSON Web Tokens) for authentication.
- **Book Management**: Allows CRUD operations for managing books. Endpoints include creating, reading, updating, and deleting books.
- **Logging**: Logs activities such as user actions, book operations, and API requests. Logs are stored in separate log files (`error.log`, `info.log`, `success.log`) using the Winston logging library.

## Features Implemented

1. **User Authentication**:
   - Signup: Allows users to create an account with their email and password.
   - Login: Authenticates users with their credentials and generates a JWT token for authorization.

2. **Book Management**:
   - Create Book: Endpoint to add a new book to the database.
   - Get Books: Endpoint to fetch all books from the database.
   - Update Book: Endpoint to update an existing book.
   - Delete Book: Endpoint to delete a book from the database.
   - Filter Books: Additional endpoints to filter books by author name and publication year.

3. **Logging**:
   - Logs user actions, book operations, and API requests.
   - Implements custom log levels (`error`, `info`, `success`) and formats logs with timestamp, source, message, and user ID.

---
