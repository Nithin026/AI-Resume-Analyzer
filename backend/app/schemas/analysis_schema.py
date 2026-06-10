from pydantic import BaseModel
from typing import List, Dict, Any


class AnalysisRequest(BaseModel):

    resume_id: str

    job_description: str


class AnalysisSummary(BaseModel):

    id: str

    ats_score: int

    keyword_match_pct: float


class AnalysisResponse(BaseModel):

    ats_score: int

    keyword_match_pct: float

    matched_keywords: List[str]

    missing_keywords: List[str]

    section_feedback: Dict[str, Any]

    suggestions: List[str]