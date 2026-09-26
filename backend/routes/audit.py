from fastapi import APIRouter
from services.firestore_service import db

router = APIRouter()

@router.get("/audit/{uid}")
def get_audit_logs(uid: str):

    docs = (
        db.collection("audit_logs")
        .where("uid", "==", uid)
        .order_by("timestamp", direction="DESCENDING")
        .stream()
    )

    logs = []

    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id

        if "timestamp" in data:
            data["timestamp"] = data["timestamp"].isoformat()

        logs.append(data)

    return logs