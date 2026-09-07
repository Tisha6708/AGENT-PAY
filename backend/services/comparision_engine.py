import re

def parse_price(price_text: str):
    if not price_text:
        return None

    match = re.search(r"[\d,]+(?:\.\d+)?", price_text)

    if not match:
        return None

    return float(match.group().replace(",", ""))