import {
  ShieldCheck,
  Wallet,
  Shield,
  ArrowRight,
} from "lucide-react";

export default function FeatureStrip() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Know Your Agent",
      subtitle: "Identity Layer",
      desc: "Every AI agent is cryptographically verified before it can act on behalf of a user.",
    },
    {
      icon: Wallet,
      title: "Programmable Wallet",
      subtitle: "Authorization Layer",
      desc: "Users define spending limits, merchant rules and payment permissions that AI cannot exceed.",
    },
    {
      icon: Shield,
      title: "AI Firewall",
      subtitle: "Risk Layer",
      desc: "Transactions are analyzed in real time and high-risk payments are blocked before authorization.",
    },
  ];

  return (
    <section className="py-10">
      {/* Section heading */}
      <div className="max-w-3xl mb-12">
        <p className="text-violet-400 font-medium text-sm uppercase tracking-[0.2em]">
          Security Architecture
        </p>

        <h2 className="text-4xl lg:text-5xl font-bold mt-4 leading-tight">
          Three layers of trust
          <span className="text-zinc-500"> before every payment.</span>
        </h2>

        <p className="text-zinc-400 mt-5 text-lg leading-8">
          AgentPay combines identity verification, programmable wallets and
          AI-driven fraud prevention to ensure autonomous commerce remains safe.
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="group rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] p-7 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <f.icon className="text-violet-400" size={26} />
            </div>

            <p className="text-xs uppercase tracking-wider text-zinc-500 mt-6">
              {f.subtitle}
            </p>

            <h3 className="text-2xl font-bold mt-2">{f.title}</h3>

            <p className="text-zinc-400 mt-4 leading-7">
              {f.desc}
            </p>

            <div className="mt-8 flex items-center gap-2 text-violet-400 text-sm font-medium group-hover:gap-3 transition-all">
              Learn more
              <ArrowRight size={16} />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom metrics */}
      <div className="mt-14 rounded-3xl border border-white/10 bg-white/[0.02] px-8 py-7">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-bold text-white">3</h3>
            <p className="text-zinc-500 text-sm mt-2">Security Layers</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white">100%</h3>
            <p className="text-zinc-500 text-sm mt-2">User Controlled Limits</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white">24/7</h3>
            <p className="text-zinc-500 text-sm mt-2">AI Risk Monitoring</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white">RBI</h3>
            <p className="text-zinc-500 text-sm mt-2">Tokenization Ready</p>
          </div>
        </div>
      </div>
    </section>
  );
}