from typing import TypedDict, List, Dict, Any

class AgentState(TypedDict):

    user_query: str

    goal: str

    shared: Dict[str, Any]

    products: List[Dict]

    businesses: List[Dict]

    events: List[Dict]

    response: str