from services.wallet_service import get_wallet

def wallet_agent(state):

    uid = state["user"]["uid"]
    amount = state["payment"]["amount"]

    wallet = get_wallet(uid)

    if not wallet:
        state["wallet"] = {
            "approved": False,
            "reason": "Wallet not configured"
        }
        return state

    if amount > wallet["transaction_limit"]:
        state["wallet"] = {
            "approved": False,
            "reason": f"Transaction exceeds ₹{wallet['transaction_limit']}"
        }
        return state
    
    state["wallet"] = {
        "approved": True,
        "reason": "Wallet approved"
    }

    return state