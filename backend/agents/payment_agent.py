from agents.wallet_agent import wallet_agent
from agents.kya_agent import kya_agent
from agents.firewall_agent import firewall_agent

from services.razorpay_service import create_order


def payment_agent(state):

    # 1️⃣ Wallet Verification
    state = wallet_agent(state)

    if not state["wallet"]["approved"]:
        state["payment"]["order"] = None
        return state

    # 2️⃣ KYA Verification
    state = kya_agent(state)

    if not state["kya"]["approved"]:
        state["payment"]["order"] = None
        return state

    # 3️⃣ AI Firewall Verification
    state = firewall_agent(state)

    if not state["firewall"]["approved"]:
        state["payment"]["order"] = None
        return state

    # 4️⃣ Create Razorpay Order
    order = create_order(
        amount=state["payment"]["amount"],
        receipt=f"agentpay_{state['user']['uid'][:8]}"
    )

    state["payment"]["order"] = order

    return state