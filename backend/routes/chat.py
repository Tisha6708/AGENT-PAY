from fastapi import APIRouter
from pydantic import BaseModel

from graph.builder import graph

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
def chat(request: ChatRequest):

    state = {
        "user_query": request.message,
        "goal": "",
        "shared": {
            "query": request.message,
            "budget": 5000
        },
        "products": [],
        "businesses": [],
        "events": [],
        "response": ""
    }

    result = graph.invoke(state)

    return {
        "goal": result["goal"],
        "products": result["products"],
        "businesses": result["businesses"],
        "events": result["events"]
    }