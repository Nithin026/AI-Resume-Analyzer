import google.generativeai as genai
import json

from app.core.config import settings
import os



genai.configure(
    api_key=settings.GEMINI_API_KEY
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def analyze_resume(
    resume_text,
    job_description
):

    prompt = f"""
    You are an expert ATS resume screener.

    Respond ONLY with valid JSON.

    Resume:

    {resume_text}

    Job Description:

    {job_description}

    Return JSON:

    {{
        "ats_score": 0,
        "keyword_match_pct": 0,

        "matched_keywords": [],

        "missing_keywords": [],

        "section_feedback": {{

            "summary": "",

            "experience": "",

            "skills": "",

            "education": ""
        }},

        "suggestions": []
    }}
    """

    response = model.generate_content(
        prompt
    )

    result = response.text

    result = result.replace(
        "```json",
        ""
    )

    result = result.replace(
        "```",
        ""
    )

    result = result.strip()

    result = json.loads(
        result
    )

    result["ats_score"] = max(
        0,
        min(
            100,
            result.get(
                "ats_score",
                0
            )
        )
    )

    result["keyword_match_pct"] = max(
        0,
        min(
            100,
            result.get(
                "keyword_match_pct",
                0
            )
        )
    )

    return result