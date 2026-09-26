import { FcGoogle } from "react-icons/fc";
import { ShieldCheck, Wallet, Sparkles } from "lucide-react";
import { signInWithGoogle } from "../firebase";

export default function Hero() {
  return (
    <div className="max-w-2xl">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-2 text-sm text-zinc-300">
        <Sparkles size={14} className="text-violet-400" />
        AI Commerce • Secure Payments
      </div>

      {/* Heading */}
      <h1 className="mt-8 text-6xl xl:text-7xl font-bold leading-[0.95] tracking-tight">
        Let AI shop.
        <br />
        <span className="text-zinc-400">You stay in control.</span>
      </h1>

      {/* Description */}
      <p className="mt-8 text-xl leading-9 text-zinc-400 max-w-xl">
        Search products, restaurants and events using natural language.
        Every transaction is protected by Wallet policies, KYA verification
        and an AI Firewall before payment.
      </p>

      {/* CTA */}
      <button
        onClick={signInWithGoogle}
        className="mt-10 flex items-center gap-3 bg-white text-black hover:bg-zinc-200 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-xl"
      >
        <FcGoogle size={24} />
        Continue with Google
      </button>

      <p className="mt-4 text-sm text-zinc-500">
        No card details are stored by AgentPay.
      </p>

      {/* Trust metrics */}
      <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
        <div>
          <ShieldCheck className="text-violet-400 mb-3" size={22} />
          <h3 className="text-2xl font-bold">KYA</h3>
          <p className="text-sm text-zinc-500 mt-1">Verified AI identity</p>
        </div>

        <div>
          <Wallet className="text-violet-400 mb-3" size={22} />
          <h3 className="text-2xl font-bold">Wallet</h3>
          <p className="text-sm text-zinc-500 mt-1">Programmable limits</p>
        </div>

        <div>
          <Sparkles className="text-violet-400 mb-3" size={22} />
          <h3 className="text-2xl font-bold">24/7</h3>
          <p className="text-sm text-zinc-500 mt-1">AI transaction guard</p>
        </div>
      </div>
    </div>
  );
}