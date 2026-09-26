import { useAuth } from "../context/AuthContext";
import { createPayment } from "../services/payment";
import { Star, ShieldCheck, ExternalLink } from "lucide-react";

export default function ProductCard({ product }) {
  const { user } = useAuth();

  const handlePayment = async () => {
    try {
      const amount = Number(
        product.price.replace(/[₹,]/g, "")
      );

      // Wallet + KYA + Firewall + Order
      const payment = await createPayment(
        amount,
        product.title,
        user
      );

      // Blocked
      if (!payment.success) {
        let message = `🛡️ ${payment.reason}`;

        if (payment.risk) {
          message += `\n\nRisk Score: ${payment.risk}/100`;
        }

        if (payment.details?.length) {
          message += `\n\nReasons:\n• ${payment.details.join("\n• ")}`;
        }

        alert(message);
        return;
      }

      const order = payment.order;

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
          const verifyRes = await fetch(
            "http://127.0.0.1:8000/verify-payment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                product: product.title,
                amount,
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            }
          );

          const data = await verifyRes.json();

          if (data.verified) {
            alert("✅ Payment Verified!");
          } else {
            alert("❌ Payment Verification Failed");
          }
        },

        modal: {
          ondismiss: () =>
            console.log("Payment cancelled"),
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      alert(
        "Something went wrong while initiating payment."
      );
    }
  };

  return (
    <div className="group rounded-3xl border border-white/10 bg-[#0D0D0D] overflow-hidden hover:border-violet-500/30 hover:bg-[#111111] transition-all duration-300">

      {/* Image */}
      <div className="relative bg-gradient-to-br from-[#181818] to-[#101010] h-60 flex items-center justify-center p-6">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-48 object-contain group-hover:scale-105 transition duration-300"
        />

        {/* Seller badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur text-xs text-zinc-300 border border-white/10">
          {product.seller || "Marketplace"}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">

        <h3 className="text-white font-semibold text-lg leading-7 line-clamp-2 min-h-[56px]">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3">
          <Star
            size={16}
            className="fill-yellow-400 text-yellow-400"
          />
          <span className="text-sm text-zinc-300">
            {product.rating || "N/A"}
          </span>
        </div>

        {/* Price */}
        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Best Price
            </p>
            <h2 className="text-3xl font-bold text-white">
              {product.price}
            </h2>
          </div>

          <div className="flex items-center gap-1 text-emerald-400 text-xs">
            <ShieldCheck size={14} />
            Verified
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-5" />

        {/* CTA */}
        <button
          onClick={handlePayment}
          className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 py-3 rounded-2xl font-semibold transition"
        >
          Buy with AgentPay
          <ExternalLink size={16} />
        </button>

      </div>
    </div>
  );
}