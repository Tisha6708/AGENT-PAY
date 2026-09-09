import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENWEB_API_KEY")

BASE_URL = "https://api.openwebninja.com/local-business-data/search"

def search_businesses(query, location):

    headers = {
        "X-API-Key": API_KEY
    }

    params = {
        "query": f"{query} in {location}",
        "language": "en",
        "region": "in",
        "limit": 20
    }

    response = requests.get(
        BASE_URL,
        headers=headers,
        params=params
    )

    response.raise_for_status()

    return response.json()