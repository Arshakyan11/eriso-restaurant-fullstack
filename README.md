# ERISO Restaurant Fullstack Application

## Overview

ERISO Restaurant is a fullstack web application that provides a complete restaurant experience, including authentication, wishlist management, and table reservation functionality.

The application simulates real-world restaurant workflows and user interactions.
It is designed with a clear separation between frontend and backend, focusing on scalability, maintainability, and real-world usage patterns.

---

## Live Demo

- Frontend: https://eriso-restaurant.netlify.app
- Backend API: https://eriso-restaurant-fullstack.onrender.com

## Features

- User registration and authentication using JWT
- Token expiration handling with automatic logout
- Protected routes for authenticated users
- Wishlist management (add, remove, update items)
- Table reservation system (create and delete reservations)
- Validation and error handling for API and user input
- Responsive user interface for different screen sizes

---

## Tech Stack

### Frontend

- React
- TypeScript
- Redux Toolkit
- SCSS
- Vite

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- Zod for validation

---

## Architecture

The project follows a client-server architecture:

- `client/` — responsible for UI rendering, routing, state management, and API communication
- `server/` — responsible for authentication, business logic, validation, and database operations

This separation allows independent development, testing, and scaling of frontend and backend services.

---

## Installation

### Clone the repository

```bash
git clone https://github.com/Arshakyan11/eriso-restaurant-fullstack.git
cd eriso-restaurant-fullstack
```

### Install dependencies

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd ../server
npm install
```

---

## Running the Application

Start the backend server:

```bash
cd server
npm run dev
```

Start the frontend application:

```bash
cd ../client
npm run dev
```

---

## Environment Variables

### Backend (`server/.env`)

```env
PORT=8000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://your-frontend-url.com
```

### Frontend (`client/.env`)

```env
VITE_BACKEND_LINK=https://your-backend-url.com
VITE_FOODS_API_KEY=your_api_key
VITE_FOODS_API_ID=your_api_id
```

---

## API Endpoints

### Authentication

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/resetPassword`

### Wishlist

- `GET /wishlist`
- `POST /wishlist`
- `DELETE /wishlist/:id`
- `PATCH /wishlist/:id`

### Reservation

- `GET /reservation`
- `POST /reservation`
- `DELETE /reservation`

Protected endpoints require the following header:

```
Authorization: Bearer <token>
```

---

## Notes

- Redux Toolkit is used as the primary state management solution
- Authentication is handled via JWT stored on the client side
- The application includes handling for edge cases such as expired tokens, empty states, and failed API requests
- The project structure is designed to support future extensions such as admin features or payment integration
- Uses Bearer token authentication via Authorization header

---

## Author

Erik Arshakyan
