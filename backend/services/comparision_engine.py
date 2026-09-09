import re
from collections import defaultdict

def parse_price(price_text):
    if not price_text:
        return None

    match = re.search(r"[\d,]+(?:\.\d+)?", price_text)

    if not match:
        return None

    return float(match.group().replace(",", ""))


def build_comparison(products):

    groups = defaultdict(list)

    # Group similar products
    for product in products:
        key = product["title"].lower().replace("men's", "").replace("women's", "")
        groups[key].append(product)

    comparison = []

    for _, offers in groups.items():

        valid = [
            p for p in offers
            if parse_price(p["price"]) is not None
        ]

        if not valid:
            continue

        best = min(valid, key=lambda x: parse_price(x["price"]))
        highest = max(valid, key=lambda x: parse_price(x["price"]))

        comparison.append({
            "title": best["title"],
            "best_price": best["price"],
            "best_seller": best["seller"],
            "best_image": best["image"],
            "best_url": best["url"],
            "saved": int(
                parse_price(highest["price"]) -
                parse_price(best["price"])
            ),
            "offers": sorted(
                valid,
                key=lambda x: parse_price(x["price"])
            )
        })

    return comparison