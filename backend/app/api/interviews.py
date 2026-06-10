from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from bson import ObjectId

from datetime import datetime

from app.dependencies.auth_dependency import (
    get_current_user
)

from app.schemas.interview_schema import (
    GenerateInterviewRequest
)

from app.models.resume_model import (
    resumes_collection
)

from app.models.interview_model import (
    create_interview_session,
    get_interview_by_id,
    get_user_interviews,
    delete_interview
)

from app.services.interview_service import (
    generate_interview_questions
)

router = APIRouter(
    prefix="/api/interviews",
    tags=["Interviews"]
)


@router.post("/generate")
def generate_questions(
    data: GenerateInterviewRequest,
    current_user=Depends(
        get_current_user
    )
):
    try:
        resume = resumes_collection.find_one(
            {
                "_id": ObjectId(
                    data.resume_id
                ),
                 "user_id": str(
            current_user["_id"]
        )
            }
        )

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid resume id"
        )

    if not resume:

        raise HTTPException(
            status_code=404,
            detail="Resume not found or access denied"
        )

    questions = generate_interview_questions(
        role=data.role,
        difficulty=data.difficulty,
        interview_type=data.interview_type,
        number_of_questions=data.number_of_questions,
        resume_text=resume.get(
            "parsed_text",
            ""
        ),
        use_resume=data.use_resume
    )

    session_data = {

        "user_id": str(
            current_user["_id"]
        ),

        "resume_id":
            data.resume_id,

        "role":
            data.role,

        "difficulty":
            data.difficulty,

        "interview_type":
            data.interview_type,

        "questions":
            questions["questions"],

        "created_at":
            datetime.utcnow()
    }

    session_id = create_interview_session(
        session_data
    )

    return {

        "success": True,

        "session_id":
            session_id,

        "questions":
            questions["questions"]
    }


@router.get("/")
def get_all_interviews(
    current_user=Depends(
        get_current_user
    )
):
    interviews = get_user_interviews(
        str(current_user["_id"])
    )

    return {
        "success": True,
        "interviews": interviews
    }


@router.get("/{session_id}")
def get_interview(
    session_id: str,
    current_user=Depends(
        get_current_user
    )
):
    interview = get_interview_by_id(
        session_id
    )

    if not interview:
        raise HTTPException(
            status_code=404,
            detail="Interview not found"
        )

    if interview["user_id"] != str(
        current_user["_id"]
    ):
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    return {
        "success": True,
        "interview": interview
    }

@router.delete("/{session_id}")
def remove_interview(
    session_id: str,
    current_user=Depends(
        get_current_user
    )
):

    interview = get_interview_by_id(
        session_id
    )

    if not interview:

        raise HTTPException(
            status_code=404,
            detail="Interview not found"
        )

    if interview["user_id"] != str(
        current_user["_id"]
    ):

        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    delete_interview(
        session_id
    )

    return {
        "success": True,
        "message":
            "Interview deleted successfully"
    }