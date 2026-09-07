from graph.builder import graph

state = {
    "user_query": "Find Nike Air Max under 5000",

    "goal": "",

    "shared": {
        "query": "Nike Air Max",
        "budget": 5000
    },

    "products": [],
    "businesses": [],
    "events": [],
    "response": ""
}

result = graph.invoke(state)

print(result["goal"])
print(result["products"])