from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.chat import router as chat_router
from routes.payment import router as payment_router
from routes.orders import router as orders_router
from routes.audit import router as audit_router

app = FastAPI(title="AgentPay API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)
app.include_router(payment_router)
app.include_router(orders_router)
app.include_router(audit_router)


@app.get("/")
def home():
    return {"message": "AgentPay API Running 🚀"}