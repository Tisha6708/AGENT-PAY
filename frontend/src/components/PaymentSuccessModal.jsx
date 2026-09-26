import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccessModal({
  open,
  onClose,
  product,
  amount,
}) {
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl bg-[#0D0D0D] border border-white/10 p-8 text-white animate-in fade-in zoom-in duration-300">

        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-500/15 flex items-center justify-center">
            <CheckCircle2 size={46} className="text-green-400" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mt-6">
          Payment Successful
        </h2>

        <p className="text-zinc-400 text-center mt-2">
          Your purchase has been verified by AgentPay AI.
        </p>

        <div className="mt-8 rounded-2xl bg-white/5 border border-white/10 p-5">
          <div className="flex justify-between mb-3">
            <span className="text-zinc-500">Product</span>
            <span className="font-medium text-right">{product}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-500">Amount</span>
            <span className="text-xl font-bold">₹{amount}</span>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <button
            onClick={() => navigate("/orders")}
            className="w-full bg-white text-black py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-zinc-200 transition"
          >
            <Package size={18} />
            View My Orders
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl border border-white/10 text-zinc-300 hover:bg-white/5 transition flex items-center justify-center gap-2"
          >
            Continue Shopping
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}