from fastapi import Depends
from fastapi import HTTPException
from fastapi.security import HTTPBearer
from fastapi.security import HTTPAuthorizationCredentials

from bson import ObjectId

from app.core.security import decode_access_token
from app.models.user_model import users_collection

security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    payload = decode_access_token(token)

    if not payload:

        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    user_id = payload.get("user_id")

    user = users_collection.find_one(
        {
            "_id": ObjectId(user_id)
        }
    )

    if not user:

        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    return user