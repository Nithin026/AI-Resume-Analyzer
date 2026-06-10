from dotenv import load_dotenv
import os

load_dotenv()

class Settings:

    MONGO_URI = os.getenv("MONGO_URI")

    DATABASE_NAME = os.getenv("DATABASE_NAME")

    JWT_SECRET = os.getenv("JWT_SECRET")

    JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")

    ACCESS_TOKEN_EXPIRE_MINUTES = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
    )
    GEMINI_API_KEY = os.getenv(
    "GEMINI_API_KEY"
)

settings = Settings()