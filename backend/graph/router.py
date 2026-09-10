from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
import os

load_dotenv()

llm = ChatGoogleGenerativeAI(
    model="gemini-3.6-flash",
    google_api_key=os.getenv("GEMINI_API_KEY"),
    temperature=0
)

SYSTEM = """
You are an intent router.

Return ONLY one word.

Options:
- product
- business
- events

Examples:

Find Nike shoes -> product

Best cafes in Jaipur -> business

Restaurants in Delhi -> business

Concerts in Mumbai this weekend -> events
"""

def route_query(state):

    query = state["user_query"]

    try:
        result = llm.invoke(f"{SYSTEM}\n\nUser: {query}")

        if isinstance(result.content, list):
            intent = "".join(
                part if isinstance(part, str)
                else part.get("text", "")
                for part in result.content
            )
        else:
            intent = result.content

        state["goal"] = intent.strip().lower()

    except Exception:
        q = query.lower()

        if any(word in q for word in ["cafe", "cafes", "restaurant", "restaurants", "food"]):
            state["goal"] = "business"

        elif any(word in q for word in ["event", "events", "concert", "show", "festival"]):
            state["goal"] = "events"

        else:
            state["goal"] = "product"

    return state