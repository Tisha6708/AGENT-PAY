
import { useState } from "react";
import { Sparkles, Send, ShoppingBag } from "lucide-react";

import { sendMessage } from "../services/api";

import ProductCard from "../components/ProductCard";
import BusinessCard from "../components/BusinessCard";
import EventCard from "../components/EventCard";
import ComparisonCard from "../components/ComparisonCard";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const user = {
      type: "user",
      text: message,
    };

    setMessages((prev) => [...prev, user]);
    setLoading(true);

    try {
      const res = await sendMessage(message);

      console.log("API Response:", res);

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          goal: res.goal,
          products: res.products || [],
          comparison: res.comparison || [],
          businesses: res.businesses || [],
          events: res.events || [],
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          goal: "error",
          text: "Something went wrong. Please try again.",
        },
      ]);
    }

    setLoading(false);
    setMessage("");
  };

  const currentGoal =
    [...messages].reverse().find((m) => m.type === "bot")?.goal || "product";

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-100 flex">

      {/* Sidebar */}
      <div className="w-64 bg-white/70 backdrop-blur-xl border-r hidden md:flex flex-col p-5">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-violet-600 p-2 rounded-xl">
            <Sparkles className="text-white" size={20} />
          </div>
          <div>
            <h1 className="font-bold text-lg">AgentPay</h1>
            <p className="text-xs text-gray-500">AI Commerce</p>
          </div>
        </div>

        <div className="space-y-2">
          <div
            className={`p-3 rounded-xl ${
              currentGoal === "product"
                ? "bg-violet-100 text-violet-700"
                : "hover:bg-gray-100"
            }`}
          >
            🛍 Product Search
          </div>

          <div
            className={`p-3 rounded-xl ${
              currentGoal === "business"
                ? "bg-violet-100 text-violet-700"
                : "hover:bg-gray-100"
            }`}
          >
            ☕ Cafés & Restaurants
          </div>

          <div
            className={`p-3 rounded-xl ${
              currentGoal === "events"
                ? "bg-violet-100 text-violet-700"
                : "hover:bg-gray-100"
            }`}
          >
            🎉 Events
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <div className="backdrop-blur-xl bg-white/70 border-b px-8 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Good Evening, Tisha 👋</h2>
            <p className="text-sm text-gray-500">
              Discover products, cafés and experiences in real time
            </p>
          </div>

          <div className="bg-violet-600 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
            <Sparkles size={14} />
            Gemini + LangGraph
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">

          {messages.length === 0 && (
            <div className="text-center mt-24">
              <ShoppingBag
                size={52}
                className="mx-auto text-violet-600 mb-4"
              />

              <h2 className="text-3xl font-bold mb-2">
                What would you like to discover?
              </h2>

              <p className="text-gray-500">
                Try “Nike Air Max under ₹5000”, “Best cafés in Jaipur” or
                “Concerts in Bangalore this weekend”.
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i}>

              {/* User */}
              {msg.type === "user" && (
                <div className="flex justify-end">
                  <div className="bg-violet-600 text-white px-5 py-3 rounded-3xl max-w-lg shadow-lg">
                    {msg.text}
                  </div>
                </div>
              )}

              {/* Bot */}
              {msg.type === "bot" && (
                <div className="space-y-4">

                  <div className="flex items-center gap-2">
                    <div className="bg-violet-600 w-9 h-9 rounded-full flex items-center justify-center">
                      <Sparkles size={18} className="text-white" />
                    </div>
                    <span className="font-semibold">AgentPay</span>
                  </div>

                  {/* PRODUCTS */}
                  {msg.goal === "product" && (
                    <>
                      <p className="text-gray-600">
                        I compared prices across marketplaces and found the best deal ✨
                      </p>

                      {msg.comparison?.length > 0 && (
                        <ComparisonCard comparison={msg.comparison[0]} />
                      )}

                      <h3 className="font-semibold text-lg pt-2">
                        All Products
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {msg.products?.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* BUSINESS */}
                  {msg.goal === "business" && (
                    <>
                      <p className="text-gray-600">
                        I found some great places for you ☕
                      </p>

                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {msg.businesses?.map((business) => (
                          <BusinessCard
                            key={business.id}
                            business={business}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* EVENTS */}
                  {msg.goal === "events" && (
                    <>
                      <p className="text-gray-600">
                        I found exciting events happening near you 🎉
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {msg.events?.map((event) => (
                          <EventCard key={event.id} event={event} />
                        ))}
                      </div>
                    </>
                  )}

                  {/* ERROR */}
                  {msg.goal === "error" && (
                    <p className="text-red-500">{msg.text}</p>
                  )}

                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 text-gray-500">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-violet-500 border-t-transparent"></div>
              AgentPay is thinking...
            </div>
          )}

        </div>

        {/* Input */}
        <div className="p-6 border-t bg-white/70 backdrop-blur-xl">
          <div className="flex gap-3 bg-white rounded-2xl shadow-md p-2">

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Find Nike shoes, cafés or events..."
              className="flex-1 px-4 outline-none bg-transparent"
            />

            <button
              onClick={handleSend}
              className="bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-xl transition"
            >
              <Send size={18} />
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}