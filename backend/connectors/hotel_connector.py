from connectors.mock_hotels import HOTELS

def search_hotels(state):

    city = state.get("city")
    budget = state.get("budget")

    results = []

    for hotel in HOTELS:

        if hotel["city"] == city and hotel["price"] <= budget:
            results.append(hotel)

    return results