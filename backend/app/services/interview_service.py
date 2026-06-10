import json

from google.api_core.exceptions import (
    ResourceExhausted
)

from app.services.gemini_service import (
    model
)


def generate_interview_questions(
    role,
    difficulty,
    interview_type,
    number_of_questions,
    resume_text,
    use_resume
):

    prompt = f"""
You are an expert technical interviewer.

Your task is to generate exactly {number_of_questions} interview questions for the given role.

Role:
{role}

Difficulty:
{difficulty}

Interview Type:
{interview_type}

Use Resume:
{use_resume}

Resume Content:
{resume_text}

Rules:

1. Generate exactly {number_of_questions} questions.

2. Questions must match the specified role and difficulty level.

3. If use_resume is true:

   - 70% questions should be role-specific technical questions.
   - 30% questions should be based on the candidate's resume, projects, skills, and technologies.
   - Do NOT generate personal, behavioral, or career-objective questions.

4. If use_resume is false:

   - Generate only role-specific technical questions.

5. Questions must be practical, interview-oriented, and commonly asked in real interviews.

6. Avoid duplicate or very similar questions.

7. For each question provide:

   - id
   - question
   - answer
   - explanation
   - key_points

8. id must start from 1 and increment sequentially.

9. key_points must contain 3 to 6 important concepts related to the answer.

10. Answers should be concise and interview-focused.

11. Return ONLY valid JSON.

IMPORTANT:

- Return raw JSON only.
- Do not use markdown.
- Do not use ```json.
- Do not add any text before or after the JSON.
- The response must be directly parsable using json.loads().

Expected JSON format:

{{
    "questions": [
        {{
            "id": 1,
            "question": "",
            "answer": "",
            "explanation": "",
            "key_points": []
        }}
    ]
}}
"""

    try:

        response = model.generate_content(
            prompt
        )

    except ResourceExhausted:

        raise Exception(
            "Gemini API quota exceeded. Please try again later."
        )

    except Exception as e:

        raise Exception(
            f"Gemini Error: {str(e)}"
        )

    text = response.text.strip()

    print("\n===== GEMINI RESPONSE =====")
    print(repr(text))
    print("===========================\n")

    if not text:

        raise Exception(
            "Gemini returned an empty response."
        )

    text = text.replace(
        "```json",
        ""
    )

    text = text.replace(
        "```",
        ""
    )

    text = text.strip()

    try:

        result = json.loads(
            text
        )

    except json.JSONDecodeError as e:

        print("\n===== INVALID JSON =====")
        print(text)
        print("========================\n")

        raise Exception(
            f"Gemini returned invalid JSON: {str(e)}"
        )

    if "questions" not in result:

        raise Exception(
            "Gemini response does not contain questions."
        )

    return result