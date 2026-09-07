import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def extract_fields(message, state):

    prompt = f"""
You are an information extractor.

Current conversation state:
{state}

User message:
{message}

Rules:
- Return ONLY valid JSON.
- Update only fields that are missing.
- Never overwrite an existing value.
- If check_in already exists and check_out is empty, a new date should become check_out.

Fields:
category, city, budget, currency, check_in, check_out, guests
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
    )

    text = response.text.replace("```json", "").replace("```", "").strip()
    return json.loads(text)