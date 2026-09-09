from fastapi import APIRouter
from pydantic import BaseModel
from graph.extractor import extract_entities
from graph.builder import graph

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
def chat(request: ChatRequest):

    entities = extract_entities(request.message)

    state = {
        "user_query": request.message,
        "goal": "",
        "shared": {
            "query": entities["query"],
            "city": entities["city"],
            "budget": entities["budget"],
            "currency": entities["currency"]
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
        "comparison": result["comparison"],
        "businesses": result["businesses"],
        "events": result["events"]
    }