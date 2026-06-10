from fastapi import APIRouter, Depends

from app.dependencies.auth_dependency import (
    get_current_user
)

from app.schemas.user_schema import (
    UserResponse
)

router = APIRouter(
    prefix="/api/users",
    tags=["Users"]
)


@router.get(
    "/me",
    response_model=UserResponse
)
def get_profile(
    current_user=Depends(
        get_current_user
    )
):

    return {
        "id": str(current_user["_id"]),
        "full_name": current_user["full_name"],
        "email": current_user["email"],
        "role": current_user.get("role", "user")
    }