from langgraph.graph import StateGraph, START, END
from langgraph.constants import Send

from graph.state import AgentState
from graph.router import route_query

from agents.amazon_agent import amazon_agent
from agents.flipkart_agent import flipkart_agent
from agents.myntra_agent import myntra_agent
from agents.nykaa_agent import nykaa_agent

from agents.business_agent import business_agent
from agents.events_agent import events_agent
from agents.comparison_agent import comparison_agent
from agents.auth_agent import auth_agent


# ---------------- Graph ---------------- #

builder = StateGraph(AgentState)

builder.add_node("router", route_query)

builder.add_node("amazon", amazon_agent)
builder.add_node("flipkart", flipkart_agent)
builder.add_node("myntra", myntra_agent)
builder.add_node("nykaa", nykaa_agent)

builder.add_node("business", business_agent)
builder.add_node("events", events_agent)

builder.add_node("compare", comparison_agent)
builder.add_node("auth", auth_agent)


# ---------------- Routing ---------------- #

builder.add_edge(START, "router")


def route(state: AgentState):
    goal = state["goal"]

    if goal == "product":
        return [
            Send("amazon", state),
            Send("flipkart", state),
            Send("myntra", state),
            Send("nykaa", state),
        ]

    elif goal == "business":
        return Send("business", state)

    elif goal == "events":
        return Send("events", state)

    return END


builder.add_conditional_edges("router", route)


# ---------------- Fan In ---------------- #

builder.add_edge("amazon", "compare")
builder.add_edge("flipkart", "compare")
builder.add_edge("myntra", "compare")
builder.add_edge("nykaa", "compare")

builder.add_edge("compare", "auth")
builder.add_edge("auth", END)

builder.add_edge("business", END)
builder.add_edge("events", END)


# ---------------- Compile ---------------- #

graph = builder.compile()