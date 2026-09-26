from services.firestore_service import db

def get_wallet(uid: str):
    doc = db.collection("wallets").document(uid).get()

    if not doc.exists:
        return None

    return doc.to_dict()