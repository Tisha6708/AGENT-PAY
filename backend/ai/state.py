conversation_state = {
    "category": None,
    "city": None,
    "budget": None,
    "currency": "INR",
    "check_in": None,
    "check_out": None,
    "guests": None
}

def get_state():
    return conversation_state

def update_state(data: dict):
    for key, value in data.items():
        if key in conversation_state and value is not None:
            conversation_state[key] = value

def reset_state():
    for key in conversation_state:
        conversation_state[key] = None

    conversation_state["currency"] = "INR"