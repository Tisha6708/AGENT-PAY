from datetime import datetime

def wallet_agent(state):
    amount = state["payment"]["amount"]
    settings = state["wallet_settings"]
    spent_today = state.get("today_spent", 0)

    max_transaction = settings["maxTransaction"]
    daily_limit = settings["dailyLimit"]
    approval_limit = settings["approvalLimit"]
    security = settings["security"]

    # 1. Maximum transaction limit
    if amount > max_transaction:
        state["wallet"] = {
            "approved": False,
            "reason": f"Amount exceeds your wallet limit of ₹{max_transaction}"
        }
        return state

    # 2. Daily spending limit
    if spent_today + amount > daily_limit:
        remaining = max(daily_limit - spent_today, 0)

        state["wallet"] = {
            "approved": False,
            "reason": f"Daily limit exceeded. Remaining balance: ₹{remaining}"
        }
        return state

    # 3. Late-night protection (11 PM – 5 AM)
    current_hour = datetime.now().hour

    if security["lateNight"] and (current_hour >= 23 or current_hour < 5):
        state["wallet"] = {
            "approved": False,
            "reason": "Late-night payments are blocked (11 PM–5 AM)"
        }
        return state

    # 4. Approval threshold
    state["wallet"] = {
        "approved": True,
        "approval_required": amount > approval_limit,
        "reason": "Wallet approved"
    }

    return state