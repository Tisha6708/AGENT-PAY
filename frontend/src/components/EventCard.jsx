import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  ExternalLink,
} from "lucide-react";

export default function EventCard({ event }) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-[#0D0D0D] overflow-hidden hover:border-violet-500/30 hover:bg-[#111111] transition-all duration-300">

      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Event badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10 text-xs text-zinc-200">
          Live Event
        </div>

        {/* Price */}
        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-violet-600 text-white font-semibold text-sm">
          {event.price || "Free"}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col">

        <h3 className="text-xl font-semibold text-white leading-7 line-clamp-2 min-h-[56px]">
          {event.title}
        </h3>

        {/* Date */}
        <div className="flex items-center gap-2 mt-4 text-zinc-400 text-sm">
          <Calendar size={15} className="text-violet-400" />
          {event.date}
        </div>

        {/* Time */}
        {event.time && (
          <div className="flex items-center gap-2 mt-2 text-zinc-400 text-sm">
            <Clock size={15} className="text-violet-400" />
            {event.time}
          </div>
        )}

        {/* Venue */}
        <div className="flex items-start gap-2 mt-3 text-sm">
          <MapPin
            size={15}
            className="text-pink-400 mt-0.5 shrink-0"
          />

          <div>
            <p className="text-white font-medium">
              {event.venue}
            </p>

            <p className="text-zinc-500 text-xs mt-1 line-clamp-2">
              {event.address}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-5" />

        {/* CTA */}
        <a
          href={event.booking}
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 py-3 rounded-2xl font-semibold transition"
        >
          <Ticket size={17} />
          Book Tickets
          <ExternalLink size={15} />
        </a>

      </div>
    </div>
  );
}