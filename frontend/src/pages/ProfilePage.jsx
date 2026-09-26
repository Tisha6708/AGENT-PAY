import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getOrders } from "../services/orders";
import { getAuditLogs } from "../services/audit";
import {
  ArrowLeft,
  ShieldCheck,
  Wallet,
  Package,
  Shield,
  LogOut,
  ChevronRight,
  User,
} from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [orderCount, setOrderCount] = useState(0);
  const [auditCount, setAuditCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    async function load() {
      const orders = await getOrders(user.uid);
      const audits = await getAuditLogs(user.uid);

      setOrderCount(orders.length);
      setAuditCount(audits.length);
    }

    load();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-4">
          <button
            onClick={() => navigate("/chat")}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="text-sm text-zinc-500">
              Your AgentPay identity & permissions
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        {/* User Card */}
        <div className="rounded-3xl bg-[#0D0D0D] p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full overflow-hidden bg-zinc-800 flex items-center justify-center">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={42} className="text-zinc-400" />
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold">
                {user?.displayName || "User"}
              </h2>

              <p className="text-zinc-400 mt-2">{user?.email}</p>

              <div className="inline-flex items-center gap-2 mt-4 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm">
                <ShieldCheck size={15} />
                KYA Verified
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-5">
          <div className="rounded-2xl bg-[#0D0D0D] p-5">
            <Package className="text-violet-400 mb-3" />
            <p className="text-zinc-500 text-sm">Orders</p>
            <h3 className="text-3xl font-bold mt-1">{orderCount}</h3>
          </div>

          <div className="rounded-2xl bg-[#0D0D0D] p-5">
            <Shield className="text-violet-400 mb-3" />
            <p className="text-zinc-500 text-sm">Audit Records</p>
            <h3 className="text-3xl font-bold mt-1">{auditCount}</h3>
          </div>

          <div className="rounded-2xl bg-[#0D0D0D] p-5">
            <Wallet className="text-violet-400 mb-3" />
            <p className="text-zinc-500 text-sm">Wallet Status</p>
            <h3 className="text-xl font-semibold mt-2 text-emerald-400">
              Active
            </h3>
          </div>
        </div>

        {/* Settings */}
        <div className="rounded-3xl bg-[#0D0D0D] overflow-hidden">
          <button
            onClick={() => navigate("/wallet")}
            className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <Wallet className="text-violet-400" />
              </div>

              <div className="text-left">
                <h3 className="font-semibold text-lg">Wallet Settings</h3>
                <p className="text-sm text-zinc-500">
                  Spending limits & AI permissions
                </p>
              </div>
            </div>

            <ChevronRight className="text-zinc-500" />
          </button>

          <div className="h-px bg-white/10" />

          <button
            onClick={() => navigate("/audit")}
            className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <Shield className="text-violet-400" />
              </div>

              <div className="text-left">
                <h3 className="font-semibold text-lg">Security & Audit</h3>
                <p className="text-sm text-zinc-500">
                  View every AI decision
                </p>
              </div>
            </div>

            <ChevronRight className="text-zinc-500" />
          </button>
        </div>

        {/* Logout */}
        <button
          onClick={async () => {
            await logout();
            navigate("/");
          }}
          className="w-full rounded-2xl bg-red-500 hover:bg-red-600 py-4 font-semibold flex items-center justify-center gap-3 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </main>
    </div>
  );
}