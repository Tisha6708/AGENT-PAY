import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime, timezone
import os

# Initialize only once
if not firebase_admin._apps:
    cred = credentials.Certificate(
        os.path.join(os.path.dirname(__file__), "..", "firebase_key.json")
    )
    firebase_admin.initialize_app(cred)

db = firestore.client()


def save_order(order_data):
    db.collection("orders").add({
        **order_data,
        "created_at": datetime.utcnow()
    })

def save_audit(log):
    log["timestamp"] = datetime.utcnow()

    db.collection("audit_logs").add(log)

def get_wallet_settings(uid: str):
    doc = db.collection("wallet_settings").document(uid).get()

    if doc.exists:
        return doc.to_dict()

    # Default values for new users
    default = {
        "maxTransaction": 2000,
        "dailyLimit": 5000,
        "approvalLimit": 1000,
        "categories": {
            "Shopping": True,
            "Travel": True,
            "Food": False,
            "Entertainment": False,
        },
        "security": {
            "lateNight": True,
            "highValueOTP": True,
            "blockedAlert": True,
        },
    }

    db.collection("wallet_settings").document(uid).set(default)
    return default

def get_today_spending(uid: str):
    now = datetime.now(timezone.utc)

    start = datetime(now.year, now.month, now.day, tzinfo=timezone.utc)
    end = datetime(now.year, now.month, now.day, 23, 59, 59, tzinfo=timezone.utc)

    docs = (
        db.collection("orders")
        .where("uid", "==", uid)
        .where("created_at", ">=", start)
        .where("created_at", "<=", end)
        .stream()
    )

    total = 0
    for doc in docs:
        data = doc.to_dict()
        total += data.get("amount", 0)

    return total