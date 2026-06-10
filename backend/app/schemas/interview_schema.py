from pydantic import BaseModel


class GenerateInterviewRequest(
    BaseModel
):

    resume_id: str

    role: str

    number_of_questions: int

    difficulty: str

    interview_type: str

    use_resume: bool