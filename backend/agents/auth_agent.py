def auth_agent(state):

    user = state.get("user", {})

    # Temporary mock authentication
    if not user:
        state["user"] = {
            "id": "usr_001",
            "name": "Tisha",
            "email": "tisha@gmail.com",
            "authenticated": True
        }

    return state