# Task Manager

Task Manager is a full-stack web application that allows users to register, log in, and manage their tasks efficiently. The project is built with a Node.js/Express backend and a React frontend, using MongoDB for data storage.

## Features
- User registration and authentication (JWT)
- Create, read, update, and delete tasks
- Secure API endpoints
- Responsive React UI
- Proxy setup for seamless frontend-backend communication

## Project Structure

```
Task-manager/
├── backend/        # Express.js backend
├── frontend/       # React frontend
├── .gitignore
└── README.md
```

## Prerequisites
- Node.js (v16 or later recommended)
- npm (comes with Node.js)
- MongoDB database (local or cloud, e.g., MongoDB Atlas)

## Getting Started

### 1. Clone the repository
```sh
git clone https://github.com/viveknair6915/Task-manager.git
cd Task-manager
```

### 2. Backend Setup
```sh
cd backend
npm install
```
Create a `.env` file in the `backend` folder with the following variables:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```
Start the backend server:
```sh
npm start
```
The backend will run on `http://localhost:5000` by default.

### 3. Frontend Setup
```sh
cd ../frontend
npm install
```
Start the React development server:
```sh
npm start
```
The frontend will run on `http://localhost:3000` by default and proxy API requests to the backend.

## Usage
1. Register a new user account.
2. Log in with your credentials.
3. Add, update, or delete your tasks.

## Environment Variables
- **backend/.env** (not committed to GitHub):
	- `MONGO_URI`: MongoDB connection string
	- `JWT_SECRET`: Secret key for JWT
	- `PORT`: Backend server port (default: 5000)

## Scripts
- **Backend**
	- `npm start` — Start backend server
- **Frontend**
	- `npm start` — Start React development server

## License
This project is licensed under the MIT License.