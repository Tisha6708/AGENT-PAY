from services.comparision_engine import parse_price

from services.comparision_engine import parse_price

def normalize_products(raw, budget=None):

    products = []
    items = raw.get("data", {}).get("products", [])

    for item in items:

        photos = item.get("product_photos") or []

        products.append({
            "id": item.get("product_id"),
            "title": item.get("product_title"),
            "price": item.get("price"),
            "original_price": item.get("original_price"),
            "rating": item.get("product_rating"),
            "reviews": item.get("product_num_reviews"),
            "seller": item.get("forced_store") or item.get("store_name"),
            "image": photos[0] if photos else None,
            "url": item.get("product_page_url"),
            "shipping": item.get("shipping"),
            "on_sale": item.get("on_sale")
        })

    if budget is not None:
        products = [
            p for p in products
            if parse_price(p["price"]) is not None
            and parse_price(p["price"]) <= budget
        ]

    return products

def normalize_businesses(raw):
    businesses = []

    for place in raw.get("data", []):
        photos = place.get("photos_sample", [])

        businesses.append({
            "id": place.get("business_id"),
            "name": place.get("name"),
            "rating": place.get("rating"),
            "reviews": place.get("review_count"),
            "address": place.get("address"),
            "city": place.get("city"),
            "price_level": place.get("price_level"),
            "status": place.get("opening_status"),
            "type": place.get("type"),

            # ⭐ Use the normal photo instead of photo_url_large
            "image": photos[0]["photo_url"] if photos else None,

            "website": place.get("website"),
            "booking": place.get("booking_link"),
            "map": place.get("place_link"),
        })

    return businesses

def normalize_events(raw):

    events = []

    for item in raw.get("data", []):

        venue = item.get("venue", {})

        events.append({
            "id": item.get("event_id"),
            "title": item.get("name"),
            "venue": venue.get("name"),
            "city": venue.get("city"),
            "date": item.get("date_human_readable"),
            "time": item.get("start_time"),
            "price": item.get("price"),
            "image": item.get("thumbnail"),
            "booking": item.get("link"),
            "address": venue.get("full_address")
        })

    return events