from agents.product_agent import product_agent

state = {
    "user_query": "Nike Air Max under 5000",

    "goal": "buy_product",

    "shared": {
        "query": "Nike Air Max",
        "budget": 5000
    },

    "products": [],
    "businesses": [],
    "events": [],
    "response": ""
}

result = product_agent(state)

print(result["products"])
