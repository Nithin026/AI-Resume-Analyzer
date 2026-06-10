from app.database.mongodb import db
from bson import ObjectId

interview_sessions_collection = db[
    "interview_sessions"
]


def create_interview_session(
    data: dict
):

    result = interview_sessions_collection.insert_one(
        data
    )

    return str(
        result.inserted_id
    )


def get_interview_by_id(
    session_id: str
):

    interview = interview_sessions_collection.find_one(
        {
            "_id": ObjectId(
                session_id
            )
        }
    )

    if interview:
        interview["_id"] = str(
            interview["_id"]
        )

    return interview


def get_user_interviews(
    user_id: str
):

    interviews = list(
        interview_sessions_collection.find(
            {
                "user_id": user_id
            }
        )
    )

    for interview in interviews:

        interview["_id"] = str(
            interview["_id"]
        )

    return interviews

def delete_interview(
    session_id: str
):

    return interview_sessions_collection.delete_one(
        {
            "_id": ObjectId(
                session_id
            )
        }
    )