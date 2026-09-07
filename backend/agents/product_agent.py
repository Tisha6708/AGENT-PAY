from services.normalizer import normalize_products
from services.comparision_engine import parse_price
from connectors.product_connector import search_products

def product_agent(state):

    budget = state["shared"].get("budget")

    raw = search_products(
        query=state["shared"]["query"]
    )

    products = normalize_products(raw)

    if budget:
        products = [
            p for p in products
            if parse_price(p["price"]) <= budget
        ]

    state["products"] = products

    return state