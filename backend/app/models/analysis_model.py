from app.database.mongodb import db
from bson import ObjectId


analyses_collection = db[
    "analyses"
]


def create_analysis(data):

    result = analyses_collection.insert_one(
        data
    )

    return str(
        result.inserted_id
    )


def get_analysis_by_id(
    analysis_id
):

    return analyses_collection.find_one(
        {
            "_id": ObjectId(
                analysis_id
            )
        }
    )


def get_user_analyses(
    user_id
):

    return analyses_collection.find(
        {
            "user_id": user_id
        }
    )
def delete_analysis(
    analysis_id: str
):

    return analyses_collection.delete_one(
        {
            "_id": ObjectId(
                analysis_id
            )
        }
    )