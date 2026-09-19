from fastapi import APIRouter
from services.firestore_service import db

router = APIRouter()

@router.get("/orders/{uid}")
def get_orders(uid: str):

    docs = (
        db.collection("orders")
        .where("uid", "==", uid)
        .order_by("created_at", direction="DESCENDING")
        .stream()
    )

    orders = []

    for doc in docs:
        data = doc.to_dict()

        orders.append({
            "id": doc.id,
            "product": data["product"],
            "amount": data["amount"],
            "status": data["status"],
            "payment_id": data["payment_id"],
            "created_at": data["created_at"].isoformat()
        })

    return orders