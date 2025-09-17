from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import item_routes
from app.database import Base, engine


app = FastAPI()
origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      
    allow_credentials=True,        
    allow_methods=["*"],            
    allow_headers=["*"],      
)


Base.metadata.create_all(bind=engine)

app.include_router(item_routes.router)


@app.get("/")
def read_root():
    return {"message": "Hello FastAPI 🚀"}