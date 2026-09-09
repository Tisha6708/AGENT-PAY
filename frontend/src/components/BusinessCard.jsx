export default function BusinessCard({ business }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border hover:shadow-xl transition overflow-hidden max-w-[430px]">
      <img
        src={business.image}
        alt={business.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg leading-tight">
            {business.name}
          </h3>

          <div className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-lg whitespace-nowrap">
            ⭐ {business.rating}
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-1">{business.type}</p>

        <p className="text-xs text-gray-600 mt-3 line-clamp-2">
          📍 {business.address}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="font-semibold text-violet-700">
            {business.price_level || "N/A"}
          </span>

          <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
            {business.status}
          </span>
        </div>

        <div className="text-xs text-gray-400 mt-2">
          {business.reviews} reviews
        </div>

        <a href={business.map} target="_blank" rel="noreferrer">
          <button className="w-full mt-4 bg-black hover:bg-gray-900 text-white py-3 rounded-xl font-medium">
            View on Maps
          </button>
        </a>
      </div>
    </div>
  );
}