from fastapi import FastAPI
from app.database.mongodb import db
from app.api.auth import router as auth_router
from app.api.analyses import (
    router as analyses_router
)
from app.api.users import router as users_router
from app.api.resumes import (
    router as resumes_router
)
from app.api.interviews import (
    router as interviews_router
)
from fastapi.middleware.cors import CORSMiddleware

from app.api.dashboard import router as dashboard_router

app = FastAPI(
    title="AI Resume Analyzer"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    auth_router
)
app.include_router(users_router)

app.include_router(
    resumes_router
)
app.include_router(
    analyses_router
)
app.include_router(
    interviews_router
)
app.include_router(
    dashboard_router
)


@app.get("/")
def home():
    return {"message": "Backend Running"}

@app.get("/test-db")
def test_db():

    db.test.insert_one(
        {
            "message": "MongoDB Atlas Connected"
        }
    )

    return {
        "success": True
    }