from pydantic import BaseModel

class UserResponse(BaseModel):

    id: str
    full_name: str
    email: str
    role: str

