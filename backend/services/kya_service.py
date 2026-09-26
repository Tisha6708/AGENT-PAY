from services.firestore_service import db

def get_agent(agent_id: str):
    doc = db.collection("agents").document(agent_id).get()

    if not doc.exists:
        return None

    return doc.to_dict()