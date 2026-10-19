# Online Course Reservation System

## Project Overview

The Online Course Reservation System is a web-based application that allows users to submit course reservation details and manage payment records. It provides a simple interface for entering payment information and viewing payment history.

## Features

- Course reservation and payment form
- Student name and course details
- Payment method selection
- Payment status tracking
- Receipt number generation or recording
- Payment history display
- MongoDB database integration

## Technologies Used

**Frontend**
- React.js
- Vite
- Axios
- HTML and CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

## Project Structure

```text
OnlineCourseReservation/
├── backend/
│   ├── models/
│   │   └── Payment.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js and npm
- MongoDB running locally or an accessible MongoDB instance
- A web browser

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/gopika47/OnlineCourseReservation.git
cd OnlineCourseReservation
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder with:

```env
MONGO_URI=mongodb://127.0.0.1:27017/course_reservation
PORT=5000
```

Start the backend using the command configured in `backend/package.json`. If the entry point is `server.js` and no start script is configured, run:

```bash
node server.js
```

### 3. Set Up the Frontend

Open a second terminal from the project root and run:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/payments` | Retrieve payment records |
| POST | `/api/payments` | Submit a payment record |

## Database

MongoDB stores payment information, including student name, course name, amount, payment method, payment status, and receipt number.

## Important Note

This project records payment details and tracks payment status. It does not process real payments through a payment gateway.

## Author

Gopika Sasikumar

## GitHub Repository

https://github.com/gopika47/OnlineCourseReservation
