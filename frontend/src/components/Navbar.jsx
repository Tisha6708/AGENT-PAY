import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { signInWithGoogle } from "../firebase";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef(null);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      // Hide immediately while scrolling
      setVisible(false);

      // Show after scrolling stops
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setVisible(true);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1600px]
      transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-24 opacity-0"
      }`}
    >
      <nav className="px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>

          <div>
            <h1 className="font-bold text-lg text-white">AgentPay</h1>
            <p className="text-xs text-zinc-500">AI Commerce</p>
          </div>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-md text-zinc-400">
          <button onClick={() => scrollTo("features")} className="hover:text-white transition">
            Features
          </button>

          <button onClick={() => scrollTo("features")} className="hover:text-white transition">
            Security
          </button>

          <button onClick={() => scrollTo("about")} className="hover:text-white transition">
            About
          </button>
        </div>

        {/* CTA */}
        <button
          onClick={signInWithGoogle}
          className="bg-white text-black hover:bg-zinc-200 px-5 py-2.5 rounded-xl font-semibold transition"
        >
          Get Started
        </button>
      </nav>
    </header>
  );
}