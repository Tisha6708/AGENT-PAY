import os
import razorpay
from dotenv import load_dotenv

load_dotenv()

client = razorpay.Client(
    auth=(
        os.getenv("RAZORPAY_KEY_ID"),
        os.getenv("RAZORPAY_KEY_SECRET")
    )
)

def create_order(amount, receipt):

    return client.order.create({
        "amount": amount * 100,
        "currency": "INR",
        "receipt": receipt
    })

def verify_signature(order_id, payment_id, signature):
    try:
        client.utility.verify_payment_signature({
            "razorpay_order_id": order_id,
            "razorpay_payment_id": payment_id,
            "razorpay_signature": signature
        })
        return True

    except razorpay.errors.SignatureVerificationError:
        return False