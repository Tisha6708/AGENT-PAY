from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

from graph.extractor import extract_entities
from graph.builder import graph

router = APIRouter()

class User(BaseModel):
    uid: str
    name: str
    email: str

class ChatRequest(BaseModel):
    message: str
    user: Optional[User] = None


@router.post("/chat")
def chat(request: ChatRequest):

    entities = extract_entities(request.message)

    state = {
        "user": request.user.model_dump() if request.user else None,   # ✅ Added
        "user_query": request.message,
        "goal": "",
        "shared": {
            "query": entities["query"],
            "city": entities["city"],
            "budget": entities["budget"],
            "currency": entities["currency"]
        },
        "products": [],
        "comparison": [],
        "businesses": [],
        "events": [],
        "response": ""
    }
    print(state["user"])
    result = graph.invoke(state)

    return {
        "goal": result["goal"],
        "products": result["products"],
        "comparison": result["comparison"],
        "businesses": result["businesses"],
        "events": result["events"],
        "user": result.get("user", {})   # ✅ Fixed
    }