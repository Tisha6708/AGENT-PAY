import os
from dotenv import load_dotenv
from google import genai
from ai.prompts import SYSTEM_PROMPT

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def chat_with_gemini(message, state, missing):

    prompt = f"""
{SYSTEM_PROMPT}

Current conversation state:
{state}

Missing fields:
{missing}

Latest user message:
{message}

If fields are missing, ask ONLY for the first missing field.
If nothing is missing, reply exactly:
Perfect! I'm comparing the best hotels for you.
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
    )

    return response.text