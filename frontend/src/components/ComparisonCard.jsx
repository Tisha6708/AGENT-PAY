import { useState } from "react";
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

export default function ComparisonCard({ comparison }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-[#111111] to-[#0A0A0A] overflow-hidden mb-8">

      {/* AI Header */}
      <div className="p-6 border-b border-white/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 text-sm border border-violet-500/20">
          <Sparkles size={14} />
          AI Recommendation
        </div>

        <div className="mt-5 flex gap-5 items-center">
          <div className="w-28 h-28 rounded-2xl bg-[#1A1A1A] flex items-center justify-center p-3 border border-white/10">
            <img
              src={comparison.best_image}
              alt={comparison.title}
              className="max-h-24 object-contain"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white leading-snug">
              {comparison.title}
            </h2>

            <div className="flex items-center gap-2 mt-2 text-emerald-400 text-sm">
              <ShieldCheck size={15} />
              Best verified offer
            </div>

            <div className="flex items-end gap-3 mt-4">
              <h1 className="text-4xl font-bold text-white">
                {comparison.best_price}
              </h1>

              {comparison.saved > 0 && (
                <span className="text-emerald-400 font-medium">
                  Save ₹{comparison.saved}
                </span>
              )}
            </div>

            <p className="text-zinc-500 mt-1">
              Seller: {comparison.best_seller}
            </p>
          </div>
        </div>
      </div>

      {/* Compare Button */}
      <div className="p-5">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 px-5 py-4 hover:bg-white/10 transition"
        >
          <div className="text-left">
            <p className="text-white font-semibold">
              Compare all offers
            </p>
            <p className="text-sm text-zinc-500">
              {comparison.offers.length} marketplaces analyzed
            </p>
          </div>

          {open ? (
            <ChevronUp className="text-zinc-400" />
          ) : (
            <ChevronDown className="text-zinc-400" />
          )}
        </button>

        {/* Offers */}
        {open && (
          <div className="space-y-3 mt-5">
            {comparison.offers.map((offer) => (
              <div
                key={offer.id}
                className="flex items-center gap-4 rounded-2xl bg-[#111111] border border-white/10 p-4 hover:border-violet-500/20 transition"
              >
                <div className="w-16 h-16 rounded-xl bg-[#1A1A1A] flex items-center justify-center p-2">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="max-h-12 object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white truncate">
                    {offer.title}
                  </h3>

                  <p className="text-sm text-zinc-500">
                    {offer.seller}
                  </p>
                </div>

                <div className="text-right">
                  <h3 className="font-bold text-white">
                    {offer.price}
                  </h3>

                  {offer.original_price && (
                    <p className="text-xs line-through text-zinc-500">
                      {offer.original_price}
                    </p>
                  )}

                  <a
                    href={offer.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-violet-400 text-xs mt-2 hover:text-violet-300"
                  >
                    Visit
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}