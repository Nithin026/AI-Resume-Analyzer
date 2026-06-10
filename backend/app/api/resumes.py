from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Depends
from fastapi import HTTPException
from app.services.pdf_parser import (
    extract_resume_text
)
from fastapi.responses import FileResponse
from bson import ObjectId
from app.models.resume_model import (
    resumes_collection
)

from app.models.resume_model import (
    create_resume,
    update_resume_text,
    get_resume_by_id,
    delete_resume
)

from datetime import datetime
import os
import uuid

from app.dependencies.auth_dependency import (
    get_current_user
)

from app.models.resume_model import (
    create_resume
)


router = APIRouter(
    prefix="/api/resumes",
    tags=["Resumes"]
)


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user)
):

    allowed_extensions = [
        ".pdf",
        ".docx"
    ]

    extension = os.path.splitext(
        file.filename
    )[1].lower()

    if extension not in allowed_extensions:

        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files allowed"
        )

    os.makedirs(
        "uploads",
        exist_ok=True
    )

    unique_filename = (
        f"{uuid.uuid4()}{extension}"
    )

    file_path = os.path.join(
        "uploads",
        unique_filename
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        buffer.write(
            await file.read()
        )

    resume_data = {

        "user_id": str(
            current_user["_id"]
        ),

        "file_name": file.filename,

        "stored_file_name": unique_filename,

        "file_path": file_path,

        "created_at": datetime.utcnow()
    }

    resume_id =  create_resume(
        resume_data
    )
    

    parsed_text = extract_resume_text(
        file_path
    )
    parsed_text = extract_resume_text(
    file_path
)

    print("=" * 50)
    print(parsed_text)
    print("=" * 50)

    update_resume_text(
        resume_id,
        parsed_text
    )

    return {
        "success": True,
        "message": "Resume uploaded successfully",
        "resume_id": resume_id
    }

@router.get("/{resume_id}")
def get_resume(
    resume_id: str,
    current_user=Depends(
        get_current_user
    )
):

    resume = resumes_collection.find_one(
        {
            "_id": ObjectId(
                resume_id
            )
        }
    )

    if not resume:

        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    return {
        "id": str(resume["_id"]),
        "file_name": resume["file_name"],
        "parsed_text": resume.get(
            "parsed_text",
            ""
            
        )
    }

@router.get("/")
def get_user_resumes(
    current_user=Depends(
        get_current_user
    )
):

    resumes = list(

        resumes_collection.find(
            {
                "user_id":
                str(
                    current_user["_id"]
                )
            }
        )

    )

    result = []

    for resume in resumes:

        result.append({

            "id":
            str(
                resume["_id"]
            ),

            "file_name":
            resume.get(
                "file_name"
            ),

            "created_at":
            resume.get(
                "created_at"
            )

        })

    return result

@router.get("/view/{resume_id}")
def view_resume(
    resume_id: str
):

    resume = get_resume_by_id(
        resume_id
    )

    if not resume:

        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    

    return FileResponse(

        path=resume["file_path"],

        

        media_type="application/pdf"
    )

@router.delete("/{resume_id}")
def remove_resume(
    resume_id: str,
    current_user=Depends(
        get_current_user
    )
):

    resume = get_resume_by_id(
        resume_id
    )

    if not resume:

        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    if resume["user_id"] != str(
        current_user["_id"]
    ):

        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    delete_resume(
        resume_id
    )

    return {
        "success": True,
        "message":
            "Resume deleted successfully"
    }