import os
import json
import re
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

llm = ChatGoogleGenerativeAI(
    model="gemini-3.6-flash",
    google_api_key=os.getenv("GEMINI_API_KEY")
)

SYSTEM = """
Extract useful entities from the user's message.

Return ONLY valid JSON.

Schema:
{
  "query": string,
  "city": string | null,
  "budget": number | null,
  "currency": "INR"
}

Examples:

Input: Find Nike shoes under ₹5000
Output:
{"query":"Nike shoes","city":null,"budget":5000,"currency":"INR"}

Input: Best cafes in Jaipur
Output:
{"query":"cafes","city":"Jaipur","budget":null,"currency":"INR"}

Input: Restaurants in Delhi under ₹800
Output:
{"query":"restaurants","city":"Delhi","budget":800,"currency":"INR"}

Input: AirPods Pro
Output:
{"query":"AirPods Pro","city":null,"budget":null,"currency":"INR"}
"""

# Common city corrections
CITY_FIX = {
    "Banglore": "Bangalore",
    "Bengaluru": "Bangalore",
    "Bombay": "Mumbai"
}


def extract_entities(text):
    response = llm.invoke(f"{SYSTEM}\n\nUser: {text}")

    content = response.content

    if isinstance(content, list):
        content = "".join(
            part if isinstance(part, str)
            else part.get("text", "")
            for part in content
        )

    content = content.strip()
    content = re.sub(r"^```json|^```|```$", "", content).strip()

    # Fallback if Gemini returns nothing
    if not content:
        return {
            "query": text,
            "city": None,
            "budget": None,
            "currency": "INR"
        }

    try:
        data = json.loads(content)

        # Normalize city names
        city = data.get("city")
        if city in CITY_FIX:
            data["city"] = CITY_FIX[city]

        return data

    except json.JSONDecodeError:
        return {
            "query": text,
            "city": None,
            "budget": None,
            "currency": "INR"
        }