REQUIRED_FIELDS = {
    "hotel": [
        "city",
        "check_in",
        "check_out",
        "guests",
        "budget"
    ]
}


def get_missing_fields(state):

    category = state.get("category")

    if category is None:
        return ["category"]

    required = REQUIRED_FIELDS.get(category, [])

    missing = []

    for field in required:
        if state.get(field) is None:
            missing.append(field)

    return missing