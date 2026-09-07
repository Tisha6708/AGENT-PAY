import os
from dotenv import load_dotenv

load_dotenv()

OPENWEB_KEY = os.getenv("OPENWEB_API_KEY")

HEADERS = {
    "X-API-Key": OPENWEB_KEY,
    "Content-Type": "application/json"
}