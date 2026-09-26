import {
  Sparkles,
  ShieldCheck,
  Wallet,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function ChatPreview() {
  return (
    <div className="relative scale-105">
      {/* Glow */}
      <div className="absolute -inset-6 bg-violet-600/10 blur-3xl rounded-full" />

      <div className="relative rounded-[28px] border border-white/10 bg-[#111111] shadow-[0_25px_80px_rgba(0,0,0,0.45)] overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.03]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-zinc-500">AgentPay Assistant</p>
              <h3 className="font-semibold">AI Commerce Session</h3>
            </div>
          </div>

          <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
            <CheckCircle2 size={14} />
            Secure
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* User query */}
          <div className="flex justify-end">
            <div className="bg-violet-600 text-white px-4 py-3 rounded-2xl max-w-[80%] text-sm">
              Find Nike shoes under ₹5,000
            </div>
          </div>

          {/* AI response */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-violet-400 text-sm font-medium">
              <Sparkles size={15} />
              Comparing Amazon • Flipkart • Nykaa
            </div>

            <div className="mt-4 flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold">Nike Air Max</h3>
                <p className="text-sm text-zinc-500 mt-1">
                  Best value • ⭐ 4.5 • Amazon
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold">₹4,799</p>
                <p className="text-xs text-emerald-400">Save ₹1,200</p>
              </div>
            </div>

            <button className="mt-5 w-full bg-white text-black hover:bg-zinc-200 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition">
              Continue to Payment
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Wallet */}
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wallet className="text-violet-400" size={22} />
                <div>
                  <h4 className="font-semibold">AI Wallet</h4>
                  <p className="text-xs text-zinc-500">
                    Spending authorization
                  </p>
                </div>
              </div>

              <span className="text-emerald-400 text-sm font-medium">
                Approved
              </span>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-xs text-zinc-500 mb-2">
                <span>Limit ₹5,000</span>
                <span>₹4,799 used</span>
              </div>

              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full w-[96%] bg-emerald-400 rounded-full" />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-white/10 rounded-xl p-4 bg-white/[0.02]">
              <ShieldCheck className="text-violet-400 mb-2" size={20} />
              <p className="text-sm font-medium">KYA Verified</p>
              <p className="text-xs text-zinc-500 mt-1">
                Trusted AI Agent
              </p>
            </div>

            <div className="border border-white/10 rounded-xl p-4 bg-white/[0.02]">
              <CheckCircle2 className="text-emerald-400 mb-2" size={20} />
              <p className="text-sm font-medium">Firewall</p>
              <p className="text-xs text-zinc-500 mt-1">Risk Score: 12/100</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}