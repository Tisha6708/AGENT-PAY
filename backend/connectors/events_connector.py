import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENWEB_API_KEY")

BASE_URL = "https://api.openwebninja.com/realtime-events-data/search-events"

def search_events(query, location):
    headers = {
        "X-API-Key": API_KEY
    }

    params = {
        "query": f"{query} in {location}",
        "date": "any",
        "is_virtual": "false"
    }

    response = requests.get(
        BASE_URL,
        headers=headers,
        params=params,
        timeout=20
    )

    response.raise_for_status()
    return response.json()