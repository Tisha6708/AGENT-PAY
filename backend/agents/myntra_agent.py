from connectors.product_connector import search_products
from services.normalizer import normalize_products

def myntra_agent(state):
    try:
        raw = search_products(
            query=state["shared"]["query"],
            marketplace="Myntra"
        )

        return {
            "products": normalize_products(raw)
        }

    except Exception as e:
        print("Myntra failed:", e)

        return {
            "products": []
        }