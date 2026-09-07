import requests
from connectors.openweb_client import HEADERS

URL = "https://api.openwebninja.com/realtime-product-search/search-light-v2"

def search_products(query, max_price=None, country="in", language="en", limit=10):

    params = {
        "q": query,
        "country": country,
        "language": language,
        "limit": limit
    }

    if max_price:
        params["max_price"] = max_price

    response = requests.get(
        URL,
        headers=HEADERS,
        params=params
    )

    print(response.status_code)
    print(response.text)

    response.raise_for_status()
    return response.json()