from connectors.events_connector import search_events
from services.normalizer import normalize_events

def events_agent(state):
    query = state["shared"]["query"]
    city = state["shared"]["city"]

    raw = search_events(query=query, location=city)

    print("RAW:", raw.keys())          # no extra API call
    print("COUNT:", len(raw["data"]))

    events = normalize_events(raw)

    print("NORMALIZED:", len(events))

    state["events"] = events
    return state