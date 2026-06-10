from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from bson import ObjectId

from datetime import datetime

from app.dependencies.auth_dependency import (
    get_current_user
)

from app.schemas.analysis_schema import (
    AnalysisRequest
)

from app.models.resume_model import (
    resumes_collection
)

from app.models.analysis_model import (
    create_analysis,
    get_analysis_by_id,
    get_user_analyses,
    delete_analysis

)

from app.services.gemini_service import (
    analyze_resume
)

from app.models.resume_model import get_resume_by_id



router = APIRouter(
    prefix="/api/analyses",
    tags=["Analysis"]
)


@router.post("/")
def run_analysis(
    data: AnalysisRequest,
    current_user=Depends(
        get_current_user
    )
):

    resume = resumes_collection.find_one(
        {
            "_id": ObjectId(
                data.resume_id
            )
        }
    )

    if not resume:

        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    analysis = analyze_resume(
        resume["parsed_text"],
        data.job_description
    )

    analysis_data = {

        "user_id": str(
            current_user["_id"]
        ),

        "resume_id":
            data.resume_id,

        "job_description":
            data.job_description,

        **analysis,

        "created_at":
            datetime.utcnow()
    }

    analysis_id = create_analysis(
        analysis_data
    )

    return {

        "success": True,

        "analysis_id":
            analysis_id,

        "analysis":
            analysis
    }


@router.get("/")
def get_all_analyses(
    current_user=Depends(
        get_current_user
    )
):

    analyses = get_user_analyses(
        str(current_user["_id"])
    )

    results = []

    for analysis in analyses:

        resume = get_resume_by_id(
            analysis["resume_id"]
        )

        results.append(
            {
                "id": str(
                    analysis["_id"]
                ),

                "file_name":
                    resume.get(
                        "file_name"
                    ) if resume else "Unknown",

                "ats_score":
                    analysis.get(
                        "ats_score"
                    ),

                "keyword_match_pct":
                    analysis.get(
                        "keyword_match_pct"
                    ),

                "created_at":
                    analysis.get(
                        "created_at"
                    )
            }
        )

    return results

@router.get("/{analysis_id}")
def get_analysis(
    analysis_id: str,
    current_user=Depends(
        get_current_user
    )
):

    analysis = get_analysis_by_id(
        analysis_id
    )

    if not analysis:

        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )

    if analysis["user_id"] != str(
        current_user["_id"]
    ):

        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    analysis["_id"] = str(
        analysis["_id"]
    )

    return analysis

@router.delete("/{analysis_id}")
def remove_analysis(
    analysis_id: str,
    current_user=Depends(
        get_current_user
    )
):

    analysis = get_analysis_by_id(
        analysis_id
    )

    if not analysis:

        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )

    if analysis["user_id"] != str(
        current_user["_id"]
    ):

        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    delete_analysis(
        analysis_id
    )

    return {
        "success": True,
        "message":
            "Analysis deleted successfully"
    }