from services.razorpay_service import create_order

def payment_agent(state):

    amount = state["payment"]["amount"]

    receipt = f"agentpay_{state['user']['uid'][:8]}"

    order = create_order(amount, receipt)

    state["payment"]["order"] = order

    return state