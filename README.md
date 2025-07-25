# Capstone Project

This repository contains both the frontend and backend for the Capstone project.

---

## Table of Contents
- [Project Structure](#project-structure)
- [Frontend (React)](#frontend-react)
- [Backend (FastAPI)](#backend-fastapi)
- [License](#license)

---

## Project Structure

```
capstone/
├── backend/   # FastAPI backend
├── frontend/  # React frontend
└── README.md  # Project overview
```

---

## Frontend (React)

The frontend is built with [Create React App](https://github.com/facebook/create-react-app).

### Getting Started

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000).

### Available Scripts
- `npm start` — Runs the app in development mode.
- `npm test` — Launches the test runner.
- `npm run build` — Builds the app for production.
- `npm run eject` — Ejects the app (not reversible).

For more, see the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

---

## Backend (FastAPI)

The backend is a FastAPI application with MongoDB integration.

### Prerequisites
- Python 3.8 or higher
- MongoDB (local or Atlas)
- pip (Python package manager)

### Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   - Windows:
     ```bash
     python -m venv venv
     .\venv\Scripts\activate
     ```
   - Unix/MacOS:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file in the backend root:
   ```env
   MONGODB_URI=mongodb://localhost:27017
   DATABASE_NAME=capstone_db
   ```
   (Adjust as needed for your MongoDB setup.)

### Running the Backend
1. Ensure MongoDB is running.
2. Start the FastAPI server:
   ```bash
   uvicorn backend.main:app --reload
   ```
   The API will be available at [http://localhost:8000](http://localhost:8000).

### API Documentation
- Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
- ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

### Example Endpoints
- `GET /` — Welcome message
- `POST /items/` — Create a new item
- `GET /items/` — List all items
- `GET /items/{item_id}` — Get a specific item
- `PUT /items/{item_id}` — Update an item
- `DELETE /items/{item_id}` — Delete an item

#### Example Item Schema
```json
{
  "name": "Sample Item",
  "description": "This is a sample item",
  "quantity": 1
}
```

---

## License

This project is licensed under the Apache-2.0 License. See the [LICENSE](LICENSE) file for details. 