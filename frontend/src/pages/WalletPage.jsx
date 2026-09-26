import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ArrowLeft,
  Wallet,
  Shield,
  Clock,
  CheckCircle2,
  Save,
  Check,
} from "lucide-react";

import {
  getWalletSettings,
  saveWalletSettings,
} from "../services/wallet";

export default function WalletPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  const [maxTransaction, setMaxTransaction] = useState(2000);
  const [dailyLimit, setDailyLimit] = useState(5000);
  const [approvalLimit, setApprovalLimit] = useState(1000);

  const [categories, setCategories] = useState({
    Shopping: true,
    Travel: true,
    Food: false,
    Entertainment: false,
  });

  const [lateNight, setLateNight] = useState(true);
  const [highValueOTP, setHighValueOTP] = useState(true);
  const [blockedAlert, setBlockedAlert] = useState(true);

  // Load user's wallet settings
  useEffect(() => {
    if (!user) return;

    async function loadWallet() {
      const data = await getWalletSettings(user.uid);

      setMaxTransaction(data.maxTransaction);
      setDailyLimit(data.dailyLimit);
      setApprovalLimit(data.approvalLimit);

      setCategories(data.categories);

      setLateNight(data.security.lateNight);
      setHighValueOTP(data.security.highValueOTP);
      setBlockedAlert(data.security.blockedAlert);

      setLoading(false);
    }

    loadWallet();
  }, [user]);

  const toggleCategory = (key) => {
    setCategories({
      ...categories,
      [key]: !categories[key],
    });
  };

  const handleSave = async () => {
    if (!user) return;

    await saveWalletSettings(user.uid, {
      maxTransaction,
      dailyLimit,
      approvalLimit,
      categories,
      security: {
        lateNight,
        highValueOTP,
        blockedAlert,
      },
    });

    setSaved(true);

    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        Loading wallet...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-4">
          <button
            onClick={() => navigate("/profile")}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-2xl font-bold">Wallet Settings</h1>
            <p className="text-sm text-zinc-500">
              Define exactly how your AI can spend money
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        {/* Spending Controls */}
        <section className="rounded-3xl bg-[#0D0D0D] p-6">
          <div className="flex items-center gap-3 mb-6">
            <Wallet className="text-violet-400" />
            <h2 className="text-xl font-semibold">
              Spending Controls
            </h2>
          </div>

          <div className="space-y-7">
            {/* Max Transaction */}
            <SliderRow
              title="Maximum per transaction"
              value={maxTransaction}
              setter={setMaxTransaction}
              min={500}
              max={100000}
            />

            {/* Daily */}
            <SliderRow
              title="Daily AI spending limit"
              value={dailyLimit}
              setter={setDailyLimit}
              min={1000}
              max={200000}
            />

            {/* Approval */}
            <SliderRow
              title="Manual approval required above"
              value={approvalLimit}
              setter={setApprovalLimit}
              min={500}
              max={50000}
            />
          </div>
        </section>

        {/* Categories */}
        <section className="rounded-3xl bg-[#0D0D0D] p-6">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="text-violet-400" />
            <h2 className="text-xl font-semibold">
              Allowed Categories
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Object.keys(categories).map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`rounded-2xl p-4 transition ${
                  categories[cat]
                    ? "bg-violet-500/10 ring-1 ring-violet-500"
                    : "bg-white/5"
                }`}
              >
                <h3 className="font-medium">{cat}</h3>
                <p
                  className={`text-sm mt-1 ${
                    categories[cat]
                      ? "text-violet-300"
                      : "text-zinc-500"
                  }`}
                >
                  {categories[cat] ? "Allowed" : "Blocked"}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Security */}
        <section className="rounded-3xl bg-[#0D0D0D] p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-violet-400" />
            <h2 className="text-xl font-semibold">
              Security Rules
            </h2>
          </div>

          <div className="space-y-5">
            <Toggle
              title="Late-night protection"
              desc="Block AI payments from 11 PM – 5 AM"
              value={lateNight}
              onChange={setLateNight}
            />

            <Toggle
              title="High-value OTP verification"
              desc="Require approval for expensive purchases"
              value={highValueOTP}
              onChange={setHighValueOTP}
            />

            <Toggle
              title="Blocked payment notifications"
              desc="Notify me whenever Firewall blocks a payment"
              value={blockedAlert}
              onChange={setBlockedAlert}
            />
          </div>
        </section>

        {/* Future */}
        <section className="rounded-3xl bg-amber-500/5 p-6">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="text-amber-400" />
            <h2 className="text-xl font-semibold">
              Temporary Permission
            </h2>
          </div>

          <p className="text-zinc-400 leading-7">
            Need to buy something expensive today? You'll be able to create a temporary spending limit that automatically expires after 30 minutes.
          </p>

          <button className="mt-5 px-5 py-3 rounded-xl bg-amber-500/10 text-amber-300 cursor-not-allowed">
            Coming Soon
          </button>
        </section>

        {/* Save */}
        <button
          onClick={handleSave}
          className="w-full bg-violet-600 hover:bg-violet-700 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition"
        >
          {saved ? <Check size={18} /> : <Save size={18} />}
          {saved ? "Settings Saved" : "Save Wallet Settings"}
        </button>
      </main>
    </div>
  );
}

/* ---------- Components ---------- */

function SliderRow({
  title,
  value,
  setter,
  min,
  max,
}) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span>{title}</span>
        <span className="font-bold">
          ₹{value.toLocaleString("en-IN")}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step="500"
        value={value}
        onChange={(e) => setter(Number(e.target.value))}
        className="w-full accent-violet-500"
      />
    </div>
  );
}

function Toggle({
  title,
  desc,
  value,
  onChange,
}) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-zinc-500 mt-1">
          {desc}
        </p>
      </div>

      <button
        onClick={() => onChange(!value)}
        className={`w-14 h-8 rounded-full relative transition ${
          value ? "bg-violet-600" : "bg-zinc-700"
        }`}
      >
        <div
          className={`absolute top-1 w-6 h-6 rounded-full bg-white transition ${
            value ? "left-7" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}