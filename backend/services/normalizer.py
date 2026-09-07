from services.comparision_engine import parse_price

def normalize_products(raw, budget=None):
    products = []

    items = raw.get("data", {}).get("products", [])

    for item in items:
        products.append({
            "id": item.get("product_id"),
            "title": item.get("product_title"),
            "price": item.get("price"),
            "original_price": item.get("original_price"),
            "rating": item.get("product_rating"),
            "reviews": item.get("product_num_reviews"),
            "seller": item.get("store_name"),
            "image": item.get("product_photos", [None])[0],
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