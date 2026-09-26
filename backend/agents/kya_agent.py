from services.kya_service import get_agent

def kya_agent(state):

    agent = get_agent("product-agent-v1")

    if not agent:
        state["kya"] = {
            "approved": False,
            "reason": "Unknown agent"
        }
        return state

    amount = state["payment"]["amount"]

    if not agent["trusted"]:
        state["kya"] = {
            "approved": False,
            "reason": "Agent is not trusted"
        }
        return state

    if amount > agent["max_limit"]:
        state["kya"] = {
            "approved": False,
            "reason": "Amount exceeds agent limit"
        }
        return state

    state["kya"] = {
        "approved": True,
        "agent": agent["name"],
        "reason": "Verified trusted agent"
    }

    return state