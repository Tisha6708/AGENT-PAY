from services.comparision_engine import build_comparison

def comparison_agent(state):

    products = state["products"]

    comparison = build_comparison(products)

    state["comparison"] = comparison

    return state