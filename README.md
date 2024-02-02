# Paytm Wallet App

Welcome to the Paytm Wallet App! This application allows users to perform various wallet-related transactions, such as signing up, logging in, checking balances, and transferring money. Below are instructions for setting up and running both the backend and frontend components of the application.

## Backend Setup

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the Backend Folder:**

   ```bash
   cd <project-folder>/backend
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Create Environment Variables:**

   Create a `.env` file in the `backend` folder with the following content:

   ```env
   PORT=<backend-port>
   JWT_SECRET=<your-secret-key>
   MONGODB_URI=<your-mongodb-uri>
   ```

   Replace `<backend-port>` and `<your-mongodb-uri>` with your preferred backend port and MongoDB URI.

5. **Start the Server:**

   ```bash
   node index.js
   ```

   The backend server should now be running.

## Frontend Setup

1. **Navigate to the Frontend Folder:**

   ```bash
   cd <project-folder>/frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Start the Development Server:**

   ```bash
   npm run dev
   ```

   Your React app should now be accessible at [http://localhost:3000](http://localhost:3000).

## Folder Structure

Here's a simplified folder structure for your project:

```plaintext
project-root
|-- backend
|   |-- db
|   |-- middlewares
|   |-- models
|   |-- routes
|   |-- .env
|   |-- index.js
|-- frontend
|   |-- public
|   |-- src
|   |-- ...
|-- README.md
```

Replace `<project-folder>`, `<repository-url>`, `<backend-port>`, and `<your-mongodb-uri>` with your actual project folder name, repository URL, backend port, and MongoDB URI, respectively.

## Features

- **User Authentication:**
  - Users can sign up with their details.
  - Existing users can log in securely.

- **Wallet Transactions:**
  - Check wallet balance.
  - Transfer money securely to other users.

## Description

The Paytm Wallet App provides a secure and convenient way for users to manage their digital transactions efficiently.
