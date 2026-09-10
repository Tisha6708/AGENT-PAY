import { useAuth } from "../context/AuthContext";
import { createPayment } from "../services/payment";

export default function ProductCard({ product }) {
  const { user } = useAuth();

  const handlePayment = async () => {
    try {
      // Convert "₹39,999" → 39999
      const amount = Number(product.price.replace(/[₹,]/g, ""));

      // Create Razorpay order from backend
      const order = await createPayment(amount, product.title, user);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "AgentPay",
        description: product.title,
        order_id: order.id,

        prefill: {
          name: user.displayName,
          email: user.email,
        },

        theme: {
          color: "#7C3AED",
        },

        handler: async function (response) {
          // Verify payment with backend
          const verifyRes = await fetch(
            "http://127.0.0.1:8000/verify-payment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            }
          );

          const data = await verifyRes.json();

          if (data.verified) {
            alert("✅ Payment Verified!");
            console.log("Verified Payment:", response);
          } else {
            alert("❌ Payment Verification Failed");
          }
        },

        modal: {
          ondismiss: () => {
            console.log("Payment cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while initiating payment.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border group">
      <div className="bg-gray-50 h-52 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-44 object-contain group-hover:scale-105 transition"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold line-clamp-2 h-12">
          {product.title}
        </h3>

        <div className="flex justify-between items-center mt-3">
          <span className="text-2xl font-bold text-violet-700">
            {product.price}
          </span>

          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg text-xs">
            ⭐ {product.rating}
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          {product.seller}
        </p>

        <button
          onClick={handlePayment}
          className="w-full mt-4 bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl font-medium transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}