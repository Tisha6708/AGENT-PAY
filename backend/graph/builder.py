from langgraph.graph import StateGraph, END

from graph.state import AgentState
from graph.router import route_query

from agents.product_agent import product_agent

builder = StateGraph(AgentState)

builder.add_node("router", route_query)
builder.add_node("product", product_agent)

builder.set_entry_point("router")

builder.add_conditional_edges(
    "router",
    lambda state: state["goal"],
    {
        "product": "product"
    }
)

builder.add_edge("product", END)

graph = builder.compile()