import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
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