import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ChatPreview from "../components/ChatPreview";
import FeatureStrip from "../components/FeatureStrip";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(139,92,246,0.14),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(124,58,237,0.08),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.02),transparent)]" />
      </div>

      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 xl:px-16 pt-28 pb-8">
        {/* Navbar */}
        <Navbar />

        {/* Hero */}
        <section
          id="hero"
          className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 xl:gap-24 items-center min-h-[78vh] py-12"
        >
          <Hero />
          <ChatPreview />
        </section>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent my-8" />

        {/* Features */}
        <section id="features" className="py-8">
          <FeatureStrip />
        </section>

        {/* About */}
        <section
          id="about"
          className="py-16 border-t border-white/10 mt-10"
        >
          <div className="max-w-3xl">
            <p className="text-violet-400 text-sm font-medium uppercase tracking-[0.2em]">
              About AgentPay
            </p>

            <h2 className="text-4xl lg:text-5xl font-bold mt-5 leading-tight">
              The trust layer for autonomous AI payments.
            </h2>

            <p className="text-zinc-400 mt-6 text-lg leading-8">
              AgentPay is an AI-powered commerce platform that enables users to
              search, compare and purchase products using natural language.
              Every transaction passes through KYA verification, a programmable
              wallet and an AI Firewall before reaching the payment gateway.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500">
          <p>© 2026 AgentPay</p>
          <p>Secured by Razorpay • Powered by Gemini + LangGraph</p>
        </footer>
      </div>
    </div>
  );
}