import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Send,
  Package,
  Shield,
  User,
} from "lucide-react";

import { sendMessage } from "../services/api";
import { useAuth } from "../context/AuthContext";

import ProductCard from "../components/ProductCard";
import BusinessCard from "../components/BusinessCard";
import EventCard from "../components/EventCard";
import ComparisonCard from "../components/ComparisonCard";

export default function ChatPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = {
      type: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await sendMessage(message, user);

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

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">

      {/* ---------- NAVBAR ---------- */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          {/* Logo */}
          <div
            onClick={() => navigate("/chat")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
              <Sparkles size={20} />
            </div>

            <div>
              <h1 className="text-xl font-bold">AgentPay</h1>
              <p className="text-xs text-zinc-500">
                AI Commerce Platform
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            <button
              onClick={() => navigate("/orders")}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/5 transition text-zinc-300"
            >
              <Package size={16} />
              Orders
            </button>

            <button
              onClick={() => navigate("/audit")}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/5 transition text-zinc-300"
            >
              <Shield size={16} />
              Audit
            </button>

            {/* Profile */}
            <button
              onClick={() => navigate("/profile")}
              className="w-11 h-11 rounded-full overflow-hidden hover:scale-105 transition"
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center rounded-full">
                  <User size={18} />
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ---------- MAIN ---------- */}
      <main className="flex-1 overflow-y-auto pb-36">
        <div className="max-w-6xl mx-auto px-6 py-10">

          {/* Hero */}
          {messages.length === 0 && (
            <div className="text-center mt-16 mb-20">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 text-violet-300 text-sm mb-8">
                <Sparkles size={14} />
                Gemini + LangGraph Powered
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Hi, {user?.displayName?.split(" ")[0]} 👋
                <br />
                <span className="text-violet-400">
                  What would you like to discover?
                </span>
              </h1>

              <p className="text-zinc-500 text-lg max-w-2xl mx-auto mt-6 leading-8">
                Search products, compare prices, discover restaurants,
                and explore events using AI-powered commerce.
              </p>

              {/* Suggestions */}
              <div className="flex flex-wrap justify-center gap-3 mt-10">
                {[
                  "Nike shoes under ₹5000",
                  "Best cafés in Bangalore",
                  "Concerts this weekend",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => setMessage(item)}
                    className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-sm transition"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Conversation */}
          <div className="space-y-8">
            {messages.map((msg, i) => (
              <div key={i}>

                {/* USER */}
                {msg.type === "user" && (
                  <div className="flex justify-end">
                    <div className="bg-violet-600 px-5 py-3 rounded-3xl max-w-xl">
                      {msg.text}
                    </div>
                  </div>
                )}

                {/* BOT */}
                {msg.type === "bot" && (
                  <div className="space-y-5">

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center">
                        <Sparkles size={18} />
                      </div>

                      <div>
                        <h3 className="font-semibold">AgentPay AI</h3>
                        <p className="text-xs text-zinc-500">
                          Comparing trusted sources...
                        </p>
                      </div>
                    </div>

                    {/* Products */}
                    {msg.goal === "product" && (
                      <>
                        <p className="text-zinc-400">
                          I searched multiple marketplaces and found the best available options.
                        </p>

                        {msg.comparison?.length > 0 && (
                          <ComparisonCard comparison={msg.comparison[0]} />
                        )}

                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                          {msg.products.map((product, index) => (
                            <ProductCard
                              key={`${product.id}-${index}`}
                              product={product}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    {/* Businesses */}
                    {msg.goal === "business" && (
                      <>
                        <p className="text-zinc-400">
                          Here are the highest rated places near you.
                        </p>

                        <div className="grid lg:grid-cols-2 gap-5">
                          {msg.businesses.map((business) => (
                            <BusinessCard
                              key={business.id}
                              business={business}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    {/* Events */}
                    {msg.goal === "events" && (
                      <>
                        <p className="text-zinc-400">
                          These events match your search.
                        </p>

                        <div className="grid lg:grid-cols-2 gap-5">
                          {msg.events.map((event) => (
                            <EventCard
                              key={event.id}
                              event={event}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    {/* Error */}
                    {msg.goal === "error" && (
                      <p className="text-red-400">{msg.text}</p>
                    )}

                  </div>
                )}

              </div>
            ))}

            {/* Loading */}
            {loading && (
              <div className="flex items-center gap-3 text-zinc-500">
                <div className="w-5 h-5 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
                AgentPay is thinking...
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ---------- INPUT ---------- */}
      <div className="sticky bottom-10 bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-xl">
        <div className="max-w-5xl mx-auto p-5">

          <div className="flex items-center gap-3 bg-[#111111] rounded-2xl px-4 py-3">

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSend()
              }
              placeholder="Ask AgentPay to find products, restaurants or events..."
              className="flex-1 bg-transparent outline-none text-white placeholder:text-zinc-500"
            />

            <button
              onClick={handleSend}
              className="w-11 h-11 rounded-xl bg-violet-600 hover:bg-violet-700 flex items-center justify-center transition"
            >
              <Send size={18} />
            </button>

          </div>

        </div>
      </div>

    </div>
  );
}