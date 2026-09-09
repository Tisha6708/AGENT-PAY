import { useState } from "react";
import { Trophy, ChevronDown, ChevronUp } from "lucide-react";

export default function ComparisonCard({ comparison }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-violet-100 overflow-hidden mb-6">

      {/* Hero */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <Trophy size={18} />
          <span className="font-semibold">BEST DEAL FOUND</span>
        </div>

        <div className="flex gap-5 items-center">
          <img
            src={comparison.best_image}
            alt={comparison.title}
            className="w-28 h-28 bg-white rounded-xl object-contain p-2"
          />

          <div className="flex-1">
            <h2 className="text-xl font-bold">{comparison.title}</h2>

            <p className="text-3xl font-bold mt-2">
              {comparison.best_price}
            </p>

            <p className="text-violet-100 mt-1">
              Seller: {comparison.best_seller}
            </p>

            {comparison.saved > 0 && (
              <div className="mt-3 inline-block bg-green-500 px-3 py-1 rounded-full text-sm font-semibold">
                Save ₹{comparison.saved}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Offers */}
      <div className="p-4">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center font-semibold text-violet-700"
        >
          <span>Compare all offers ({comparison.offers.length})</span>
          {open ? <ChevronUp /> : <ChevronDown />}
        </button>

        {open && (
          <div className="mt-4 space-y-3">
            {comparison.offers.map((offer) => (
              <div
                key={offer.id}
                className="flex items-center gap-3 p-3 rounded-xl border hover:bg-gray-50"
              >
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-16 h-16 object-contain"
                />

                <div className="flex-1">
                  <p className="font-medium text-sm">{offer.title}</p>
                  <p className="text-xs text-gray-500">{offer.seller}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold">{offer.price}</p>

                  {offer.original_price && (
                    <p className="text-xs line-through text-gray-400">
                      {offer.original_price}
                    </p>
                  )}

                  <a
                    href={offer.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-violet-600 font-semibold"
                  >
                    Visit →
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