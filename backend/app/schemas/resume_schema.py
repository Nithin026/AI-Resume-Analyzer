from pydantic import BaseModel


class ResumeResponse(BaseModel):

    id: str

    file_name: str

    file_path: str