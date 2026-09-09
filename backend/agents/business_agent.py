from connectors.business_connector import search_businesses
from services.normalizer import normalize_businesses


def business_agent(state):

    query = state["shared"]["query"]
    city = state["shared"]["city"]

    raw = search_businesses(
        query=query,
        location=city
    )

    state["businesses"] = normalize_businesses(raw)

    return state