import {
  Star,
  MapPin,
  Navigation,
  CheckCircle2,
} from "lucide-react";

export default function BusinessCard({ business }) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-[#0D0D0D] overflow-hidden hover:border-violet-500/30 hover:bg-[#111111] transition-all duration-300">

      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

        {/* Type badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10 text-xs text-zinc-200">
          {business.type}
        </div>

        {/* Rating */}
        <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10 text-sm text-white">
          <Star
            size={14}
            className="fill-yellow-400 text-yellow-400"
          />
          {business.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col">

        <h3 className="text-xl font-semibold text-white leading-7">
          {business.name}
        </h3>

        {/* Address */}
        <div className="flex items-start gap-2 mt-3 text-sm">
          <MapPin
            size={15}
            className="text-violet-400 mt-0.5 shrink-0"
          />

          <p className="text-zinc-400 line-clamp-2">
            {business.address}
          </p>
        </div>

        {/* Info Row */}
        <div className="flex justify-between items-center mt-5">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider">
              Price
            </p>

            <p className="font-semibold text-white">
              {business.price_level || "N/A"}
            </p>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end gap-1 text-emerald-400 text-sm">
              <CheckCircle2 size={14} />
              {business.status}
            </div>

            <p className="text-xs text-zinc-500 mt-1">
              {business.reviews} reviews
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-5" />

        {/* Maps CTA */}
        <a
          href={business.map}
          target="_blank"
          rel="noreferrer"
          className="w-full"
        >
          <button className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 py-3 rounded-2xl font-semibold transition">
            <Navigation size={17} />
            Open in Maps
          </button>
        </a>

      </div>
    </div>
  );
}