import { useEffect, useState } from "react";
import { Package, ArrowLeft, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getOrders } from "../services/orders";
import OrderCard from "../components/OrderCard";

export default function OrdersPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    getOrders(user.uid).then(setOrders);
  }, [user]);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/chat")}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <h1 className="text-2xl font-bold">My Orders</h1>
              <p className="text-sm text-zinc-500">
                Verified purchases made through AgentPay
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm">
            <Package size={16} />
            {orders.length} Orders
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-24">
            <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <ShoppingBag size={42} className="text-zinc-500" />
            </div>

            <h2 className="text-3xl font-bold">No orders yet</h2>

            <p className="text-zinc-500 mt-4 max-w-md leading-7">
              Your completed purchases will appear here with payment verification and transaction history.
            </p>

            <button
              onClick={() => navigate("/chat")}
              className="mt-8 bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-xl font-medium transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}