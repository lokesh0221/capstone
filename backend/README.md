# Capstone Backend

A FastAPI backend application with MongoDB integration.

## Prerequisites

- Python 3.8 or higher
- MongoDB installed and running locally (or a MongoDB Atlas account)
- pip (Python package manager)

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows:
```bash
.\venv\Scripts\activate
```
- Unix/MacOS:
```bash
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the root directory with the following content:
```
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=capstone_db
```
Note: Adjust the MONGODB_URI if you're using MongoDB Atlas or a different configuration.

## Running the Application

1. Make sure MongoDB is running

2. Start the FastAPI server:
```bash
uvicorn backend.main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:
- Interactive API documentation (Swagger UI): `http://localhost:8000/docs`
- Alternative API documentation (ReDoc): `http://localhost:8000/redoc`

## API Endpoints

- `GET /`: Welcome message
- `POST /items/`: Create a new item
- `GET /items/`: List all items
- `GET /items/{item_id}`: Get a specific item
- `PUT /items/{item_id}`: Update an item
- `DELETE /items/{item_id}`: Delete an item

## Example Item Schema

```json
{
    "name": "Sample Item",
    "description": "This is a sample item",
    "quantity": 1
}
``` 