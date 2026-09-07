from connectors.hotel_connector import search_hotels
from services.comparision_engine import rank_hotels

def compare_hotels(state):

    hotels = search_hotels(state)

    ranked = rank_hotels(
        hotels,
        state["budget"]
    )

    return ranked