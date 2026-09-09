from services.normalizer import normalize_products
from services.comparision_engine import parse_price
from connectors.product_connector import search_products


def product_agent(state):

    budget = state["shared"].get("budget")

    raw = search_products(
        query=state["shared"]["query"],
        max_price=budget
    )

    products = normalize_products(raw)

    # Safe budget filtering
    if budget is not None:
        filtered = []

        for p in products:
            price = parse_price(p["price"])

            if price is not None and price <= budget:
                filtered.append(p)

        products = filtered

    state["products"] = products

    return state