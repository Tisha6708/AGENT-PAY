# 🚀 AgentPay — Let AI Shop. You Stay in Control.

> An AI-powered commerce assistant that doesn't just answer questions—it understands intent, compares marketplaces, authenticates users securely, and completes verified transactions.

## 🌟 The Story Behind AgentPay

Imagine telling an AI:

> *"Find me Samsung Galaxy S24 under ₹40,000."*

Instead of acting like a chatbot, AgentPay behaves like a **team of specialized agents**.

One agent understands what you want. Another searches marketplaces. A comparison agent finds the best deal. An authentication agent verifies your identity, and finally a payment agent securely initiates a Razorpay transaction.

The user experiences a single conversation, while multiple AI agents collaborate behind the scenes.

---

## 🧠 How It Works

```text
Natural Language Query
          │
          ▼
   Gemini Intent Router
          │
 ┌────────┼────────┐
 ▼        ▼        ▼
Product  Business  Events
 Agent    Agent     Agent
    │        │        │
    └──── LangGraph ──┘
            │
     Comparison Agent
            │
  Best Recommendation
            │
 Firebase Authentication
            │
 Razorpay Payment Agent
            │
   Verified Transaction
```

---

## ✨ What Makes It Different?

### 🤖 Multi-Agent Intelligence

Instead of one LLM doing everything, AgentPay assigns responsibilities to dedicated agents:

* **Router Agent** → Identifies user intent
* **Product Agent** → Fetches marketplace products
* **Business Agent** → Finds cafés & restaurants
* **Events Agent** → Discovers nearby events
* **Comparison Agent** → Recommends the best-priced option
* **Payment Agent** → Creates Razorpay orders
* **Auth Agent** → Maintains verified user identity

### 🔐 Secure by Design

AI never handles sensitive payment secrets.

* Google Sign-In via Firebase
* Backend identity propagation
* Razorpay order creation on server
* Signature verification after payment

This separates **AI reasoning** from **transaction security**.

### 💳 Conversational Commerce

Users don't navigate filters or multiple shopping sites.

They simply ask:

* *Nike Air Max under ₹5000*
* *Best cafés in Jaipur*
* *Events in Bangalore this weekend*

AgentPay converts conversation into actionable commerce.

---

## 🛠 Tech Stack

| Layer          | Technologies              |
| -------------- | ------------------------- |
| Frontend       | React, Vite, Tailwind CSS |
| Backend        | FastAPI                   |
| AI             | Gemini 3.6 Flash          |
| Orchestration  | LangGraph                 |
| Authentication | Firebase                  |
| Payments       | Razorpay                  |
| External APIs  | OpenWeb APIs              |

---

## 🎯 Key Capabilities

* Natural language product search
* Marketplace price comparison
* AI-powered recommendation engine
* Business & event discovery
* Google authentication
* Secure Razorpay checkout
* Backend payment verification

---

## 🔮 Future Vision

AgentPay is designed as a foundation for autonomous commerce. Future versions can negotiate prices, remember shopping preferences, manage hotel bookings, and maintain a unified transaction history—turning conversational AI into a trustworthy digital purchasing assistant.

---

**Built with ❤️ using LangGraph, Gemini, Firebase & Razorpay**
