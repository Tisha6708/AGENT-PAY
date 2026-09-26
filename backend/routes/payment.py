from fastapi import APIRouter
from pydantic import BaseModel

from agents.payment_agent import payment_agent
from services.razorpay_service import verify_signature
from services.firestore_service import save_order
from services.firestore_service import save_audit
from services.firestore_service import get_wallet_settings
from services.firestore_service import get_today_spending

router = APIRouter()

class User(BaseModel):
    uid: str
    name: str
    email: str

class PaymentRequest(BaseModel):
    amount: int
    product_name: str
    user: User

class VerifyRequest(BaseModel):
    uid: str
    name: str
    email: str
    product: str
    amount: int

    order_id: str
    payment_id: str
    signature: str

@router.post("/payment")
def create_payment(request: PaymentRequest):

    wallet_settings = get_wallet_settings(request.user.uid)
    today_spent = get_today_spending(request.user.uid)

    state = {
        "user": request.user.model_dump(),
        "wallet_settings": wallet_settings,
        "today_spent": today_spent,
        "payment": {
            "amount": request.amount,
            "product": request.product_name,
            "order": None,
        },
    }

    result = payment_agent(state)

    # 🚫 Wallet blocked
    if not result["wallet"]["approved"]:
        save_audit({
        "uid": request.user.uid,
        "agent": "product-agent-v1",
        "product": request.product_name,
        "amount": request.amount,
        "status": "blocked",
        "layer": "Wallet",
        "reason": result["wallet"]["reason"]
        })

        return {
            "success": False,
            "reason": result["wallet"]["reason"]
        }

    # 🚫 KYA blocked
    if not result["kya"]["approved"]:
        save_audit({
        "uid": request.user.uid,
        "agent": "product-agent-v1",
        "product": request.product_name,
        "amount": request.amount,
        "status": "blocked",
        "layer": "KYA",
        "reason": result["kya"]["reason"]
        })

        return {
            "success": False,
            "reason": result["kya"]["reason"]
        }

    # Firewall blocked
    if not result["firewall"]["approved"]:
        save_audit({
        "uid": request.user.uid,
        "agent": "product-agent-v1",
        "product": request.product_name,
        "amount": request.amount,
        "status": "blocked",
        "layer": "Firewall",
        "reason": ", ".join(result["firewall"]["reasons"]),
        "risk": result["firewall"]["risk"]
        })

        return {
            "success": False,
            "reason": "AI Firewall blocked this transaction",
            "risk": result["firewall"]["risk"],
            "details": result["firewall"]["reasons"]
        }

    # ✅ Approved
    return {
        "success": True,
        "order": result["payment"]["order"]
    }


@router.post("/verify-payment")
def verify_payment(request: VerifyRequest):

    verified = verify_signature(
        request.order_id,
        request.payment_id,
        request.signature
    )

    if verified:
        save_order({
            "uid": request.uid,
            "name": request.name,
            "email": request.email,
            "product": request.product,
            "amount": request.amount,
            "order_id": request.order_id,
            "payment_id": request.payment_id,
            "status": "paid"
        })

        save_audit({
            "uid": request.uid,
            "agent": "product-agent-v1",
            "product": request.product,
            "amount": request.amount,
            "status": "approved",
            "layer": "Razorpay",
            "reason": "Payment completed successfully",
            "risk": 0
        })

    return {
        "verified": verified
    }