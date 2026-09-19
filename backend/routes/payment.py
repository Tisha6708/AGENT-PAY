from fastapi import APIRouter
from pydantic import BaseModel

from agents.payment_agent import payment_agent
from services.razorpay_service import verify_signature
from services.firestore_service import save_order

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

    state = {
        "user": request.user.model_dump(),
        "payment": {
            "amount": request.amount,
            "product": request.product_name,
            "order": None
        }
    }

    result = payment_agent(state)

    return result["payment"]["order"]

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

    return {
        "verified": verified
    }