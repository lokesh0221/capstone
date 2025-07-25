from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.routes_auth import router as auth_router
from backend.api.routes_items import router as items_router

app = FastAPI(title="Capstone Backend API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)
app.include_router(items_router)

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Capstone Backend API"} 