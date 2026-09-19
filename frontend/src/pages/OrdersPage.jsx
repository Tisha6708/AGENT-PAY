import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getOrders } from "../services/orders";
import OrderCard from "../components/OrderCard";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    getOrders(user.uid).then(setOrders);
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-white p-8">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center gap-3 mb-8">
          <div className="bg-violet-600 p-3 rounded-xl">
            <Package className="text-white" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">My Orders</h1>
            <p className="text-gray-500">
              All your verified AgentPay purchases
            </p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border">
            <Package
              size={48}
              className="mx-auto text-gray-300 mb-4"
            />
            <h2 className="text-xl font-semibold">
              No orders yet
            </h2>
            <p className="text-gray-500 mt-2">
              Complete your first purchase to see it here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}