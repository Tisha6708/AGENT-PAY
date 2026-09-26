import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAuditLogs } from "../services/audit";
import {
  Shield,
  ArrowLeft,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function AuditPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!user) return;

    async function load() {
      const data = await getAuditLogs(user.uid);
      setLogs(data);
    }

    load();
  }, [user]);

  const approved = logs.filter(
    (l) => l.status === "approved"
  ).length;

  const blocked = logs.filter(
    (l) => l.status !== "approved"
  ).length;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/chat")}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <h1 className="text-2xl font-bold">
                AI Audit Trail
              </h1>
              <p className="text-sm text-zinc-500">
                Every decision made before payment
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm">
            <Shield size={16} />
            {logs.length} Records
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          <div className="rounded-2xl border border-white/10 bg-[#0D0D0D] p-5">
            <p className="text-zinc-500 text-sm">
              Total Checks
            </p>
            <h2 className="text-4xl font-bold mt-2">
              {logs.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
            <p className="text-green-400 text-sm">
              Approved
            </p>
            <h2 className="text-4xl font-bold mt-2">
              {approved}
            </h2>
          </div>

          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
            <p className="text-red-400 text-sm">
              Blocked
            </p>
            <h2 className="text-4xl font-bold mt-2">
              {blocked}
            </h2>
          </div>
        </div>

        {/* Empty */}
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <Shield
                size={42}
                className="text-zinc-500"
              />
            </div>

            <h2 className="text-3xl font-bold">
              No audit records
            </h2>

            <p className="text-zinc-500 mt-4 max-w-md leading-7">
              Every transaction checked by KYA, Wallet and AI
              Firewall will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {logs.map((log) => (
              <div
                key={log.id}
                className="rounded-2xl border border-white/10 bg-[#0D0D0D] p-6 hover:border-violet-500/30 transition"
              >
                {/* Top */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {log.product}
                    </h3>

                    <p className="text-zinc-500 text-sm mt-1">
                      {new Date(
                        log.timestamp
                      ).toLocaleString()}
                    </p>
                  </div>

                  {log.status === "approved" ? (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm">
                      <CheckCircle2 size={16} />
                      Approved
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-sm">
                      <XCircle size={16} />
                      Blocked
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div>
                    <p className="text-xs text-zinc-500">
                      Amount
                    </p>
                    <p className="font-semibold">
                      ₹{log.amount}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-zinc-500">
                      Agent
                    </p>
                    <p className="font-semibold">
                      {log.agent}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-zinc-500">
                      Layer
                    </p>
                    <p className="font-semibold">
                      {log.layer}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-zinc-500">
                      Risk Score
                    </p>
                    <p
                      className={`font-bold ${
                        log.risk > 60
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {log.risk}
                    </p>
                  </div>
                </div>

                {/* AI Reason */}
                <div className="mt-5 rounded-xl bg-white/5 border border-white/5 p-4">
                  <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
                    AI Explanation
                  </p>

                  <p className="text-zinc-300 leading-7">
                    {log.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}