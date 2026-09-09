from typing import TypedDict, Annotated
import operator

class AgentState(TypedDict):
    user_query: str
    goal: str

    shared: dict

    products: Annotated[list, operator.add]
    comparison: list
    businesses: list
    events: list

    response: str