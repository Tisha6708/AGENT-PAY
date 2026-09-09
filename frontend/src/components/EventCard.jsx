import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  ExternalLink,
} from "lucide-react";

export default function EventCard({ event }) {
  return (
    <div className="h-full flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition duration-300">

      {/* Image */}
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-44 object-cover"
        />

        {/* Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold">
          🎉 Event
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">

        {/* Title */}
        <h3 className="text-lg font-bold leading-snug line-clamp-2 min-h-[56px]">
          {event.title}
        </h3>

        {/* Date */}
        <div className="flex items-center gap-2 text-gray-600 text-sm mt-3">
          <Calendar size={15} className="text-violet-600" />
          <span>{event.date}</span>
        </div>

        {/* Time */}
        {event.time && (
          <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
            <Clock size={15} className="text-violet-600" />
            <span>{event.time}</span>
          </div>
        )}

        {/* Venue */}
        <div className="flex items-start gap-2 text-gray-600 text-sm mt-2">
          <MapPin
            size={15}
            className="text-pink-500 mt-0.5 shrink-0"
          />
          <div>
            <p className="font-medium text-gray-800">{event.venue}</p>
            <p className="text-xs text-gray-500 line-clamp-2">
              {event.address}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Starting from</p>
            <p className="text-xl font-bold text-violet-600">
              {event.price || "Free"}
            </p>
          </div>

          <a
            href={event.booking}
            target="_blank"
            rel="noreferrer"
            className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition"
          >
            <Ticket size={16} />
            Book
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}