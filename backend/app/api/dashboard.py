from fastapi import APIRouter
from fastapi import Depends

from app.dependencies.auth_dependency import (
    get_current_user
)

from app.models.resume_model import (
    resumes_collection
)

from app.models.analysis_model import (
    analyses_collection
)

from app.models.interview_model import (
    interview_sessions_collection
)

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)

@router.get("/stats")
def get_dashboard_stats(
    current_user=Depends(
        get_current_user
    )
):

    user_id = str(
        current_user["_id"]
    )

    total_resumes = (
        resumes_collection.count_documents(
            {
                "user_id": user_id
            }
        )
    )

    total_analyses = (
        analyses_collection.count_documents(
            {
                "user_id": user_id
            }
        )
    )

    total_interviews = (
        interview_sessions_collection.count_documents(
            {
                "user_id": user_id
            }
        )
    )

    return {

        "total_resumes":
            total_resumes,

        "total_analyses":
            total_analyses,

        "total_interviews":
            total_interviews
    }