import {
  CheckCircle2,
  Receipt,
  CalendarDays,
  CreditCard,
} from "lucide-react";

export default function OrderCard({ order }) {
  const date = new Date(order.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="group rounded-3xl border border-white/10 bg-[#0D0D0D] p-6 hover:border-violet-500/30 hover:bg-[#111111] transition-all duration-300">

      {/* Top */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Receipt className="text-violet-400" size={24} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white leading-snug">
              {order.product}
            </h2>

            <div className="flex items-center gap-2 mt-2 text-zinc-500 text-sm">
              <CreditCard size={14} />
              <span className="truncate max-w-[220px]">
                {order.payment_id}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm border border-green-500/20">
          <CheckCircle2 size={15} />
          Paid
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/10 my-5" />

      {/* Bottom */}
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <CalendarDays size={14} />
            Purchased on
          </div>

          <p className="text-white font-medium mt-1">
            {date}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-zinc-500 uppercase tracking-wider">
            Amount
          </p>

          <h3 className="text-3xl font-bold text-white">
            ₹{order.amount}
          </h3>
        </div>
      </div>
    </div>
  );
}