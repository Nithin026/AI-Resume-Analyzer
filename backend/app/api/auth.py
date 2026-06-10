from datetime import datetime

from fastapi import APIRouter, HTTPException

from app.schemas.auth_schema import RegisterSchema

from app.models.user_model import (
    create_user,
    get_user_by_email
)
from fastapi import Depends

from app.core.security import hash_password

from app.schemas.auth_schema import LoginSchema

from app.core.security import (
    verify_password,
    create_access_token
)
from app.dependencies.auth_dependency import get_current_user
router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)

@router.post("/register")
def register_user(user: RegisterSchema):

    existing_user = get_user_by_email(
        user.email
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    user_data = {
        "full_name": user.full_name,
        "email": user.email,
        "password": hash_password(user.password),
        "role": "user",
        "is_active": True,
        "created_at": datetime.utcnow()
    }

    user_id = create_user(
        user_data
    )

    return {
        "success": True,
        "user_id": user_id
    }

@router.post("/login")
def login_user(
    user: LoginSchema
):

    existing_user = get_user_by_email(
        user.email
    )

    if not existing_user:

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    password_valid = verify_password(
        user.password,
        existing_user["password"]
    )

    if not password_valid:

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    access_token = create_access_token(
        {
            "user_id": str(
                existing_user["_id"]
            )
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
@router.get("/me")
async def get_me(
    current_user=Depends(get_current_user)
):
    

    return {
        "id": str(current_user["_id"]),
        "full_name": current_user.get("full_name"),
        "email": current_user.get("email")
    }