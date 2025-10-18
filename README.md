# DengueGuard - Dengue Patient Management & Monitoring System

This repository contains a full-stack application with separate Admin, Client, and Server components.

## Project Structure
```
dengue-patient-management-system-grp4/
├── Admin/   - Admin panel application<br/>
├── Client/  - Client-facing application<br/>
└── Server/  - Backend server
```

## Components

### Admin Panel

The Admin panel is a React application built with Vite that provides administration functionality.

- Located in the `Admin/` directory
- Built with React and Vite
- Contains various components and pages for administrative tasks

### Client Application

The Client application is a React-based frontend that users interact with.

- Located in the `Client/` directory
- Built with React and Vite
- Implements WebSockets for real-time communication via `socket.js`
- Organized with reusable components and page-specific views

### Server

The Server provides the backend API and business logic for both Admin and Client applications.

- Located in the `Server/` directory
- Node.js-based backend
- MongoDB connection (configured in `config/db.js`)
- Implements authentication (via `controllers/authController.js`)
- Organized with MVC architecture:
  - Models: Database schemas
  - Controllers: Business logic
  - Routes: API endpoints
  - Middleware: Request processing functions
  - Utils: Helper functions

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB

### Installation

1. Clone this repository
   
    ```bash
    git clone https://github.com/mayuraabhayasinghe/dengue-patient-management-system-grp4.git
    ```

    
2. Install dependencies for each component:
   
    **Server:**
    ```bash
    cd Server
    npm install
    ```
    
    **Client:**
    ```bash
    cd Client
    npm install
    ```

    **Admin:**
    ```bash
    cd Admin
    npm install
    ```


3. Set up environment variables:
  - Create/modify `.env` files in Server and Client directories

    **Client**
    ```env
    VITE_GEMINI_API_KEY=your_api_key_here
    ```

    **Server**
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    EMAIL_USER=your_email_address
    EMAIL_PASS=your_email_password_or_app_password
    ```


### Running the Application

1. Start the server:
   ```bash
   cd Server
   npm start
   ```
3. Start the client application:
   ```bash
   cd Client
   npm run dev
   ```
5. Start the admin panel:
   ```bash
   cd Admin
   npm run dev
   ```


## Development

- Both Client and Admin use ESLint for code quality (configured in `eslint.config.js`)
- Vite is used as the build tool for the frontend applications
- The server follows a modular architecture for scalability

## Environment Variables

- Server and Client components use `.env` files for configuration
- See `.env.example` files (if available) for required variables
