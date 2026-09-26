import requests
from connectors.openweb_client import HEADERS

URL = "https://api.openwebninja.com/realtime-product-search/search-v2"

def search_products(query, marketplace=None, country="in", language="en", limit=5):

    search_query = query

    if marketplace:
        search_query = f"{query} {marketplace}"

    params = {
        "q": search_query,
        "country": country,
        "language": language,
        "limit": limit
    }

    response = requests.get(
        URL,
        headers=HEADERS,
        params=params
    )

    response.raise_for_status()
    return response.json()