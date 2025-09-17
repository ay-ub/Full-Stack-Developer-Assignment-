from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

from app.routes import item_routes
app.include_router(item_routes.router)

from app.routes import upload_routes
app.include_router(upload_routes.router)

@app.get("/")
def read_root():
    return {"message": "Hello World"}