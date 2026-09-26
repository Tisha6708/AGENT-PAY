from connectors.product_connector import search_products
from services.normalizer import normalize_products

def amazon_agent(state):
    try:
        raw = search_products(
            query=state["shared"]["query"],
            marketplace="Amazon"
        )

        # 👇 Print the actual photos array
        print("PHOTOS:", raw["data"]["products"][0]["product_photos"], flush=True)

        return {
            "products": normalize_products(raw)
        }

    except Exception as e:
        print("Amazon failed:", e)
        return {
            "products": []
        }