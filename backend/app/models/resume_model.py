from app.database.mongodb import db
from bson import ObjectId

resumes_collection = db["resumes"]


def create_resume(data: dict):

    result = resumes_collection.insert_one(
        data
    )

    return str(result.inserted_id)


def update_resume_text(
    resume_id: str,
    parsed_text: str
):

    resumes_collection.update_one(
        {
            "_id": ObjectId(resume_id)
        },
        {
            "$set": {
                "parsed_text": parsed_text
            }
        }
    )


def get_resume_by_id(
    resume_id: str
):

    return resumes_collection.find_one(
        {
            "_id": ObjectId(
                resume_id
            )
        }
    )
def delete_resume(
    resume_id: str
):

    return resumes_collection.delete_one(
        {
            "_id": ObjectId(
                resume_id
            )
        }
    )

