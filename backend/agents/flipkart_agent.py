from connectors.product_connector import search_products
from services.normalizer import normalize_products

def flipkart_agent(state):
    try:
        raw = search_products(
            query=state["shared"]["query"],
            marketplace="Flipkart"
        )

        return {
            "products": normalize_products(raw)
        }

    except Exception as e:
        print("Flipkart failed:", e)

        return {
            "products": []
        }