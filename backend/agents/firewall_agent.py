from datetime import datetime

def firewall_agent(state):

    amount = state["payment"]["amount"]
    category = "Shopping"

    risk_score = 0
    reasons = []

    if amount > 10000:
        risk_score += 40
        reasons.append("High-value purchase")

    hour = datetime.now().hour

    if hour >= 23 or hour <= 5:
        risk_score += 30
        reasons.append("Late-night transaction")

    if category not in ["Shopping", "Travel"]:
        risk_score += 50
        reasons.append("Unknown category")

    state["firewall"] = {
        "approved": risk_score < 70,
        "risk": risk_score,
        "reasons": reasons
    }

    return state