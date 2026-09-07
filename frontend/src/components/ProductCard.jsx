export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border group">
      <div className="bg-gray-50 h-52 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-44 object-contain group-hover:scale-105 transition"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold line-clamp-2 h-12">
          {product.title}
        </h3>

        <div className="flex justify-between items-center mt-3">
          <span className="text-2xl font-bold text-violet-700">
            {product.price}
          </span>

          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg text-xs">
            ⭐ {product.rating}
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          {product.seller}
        </p>

        <a href={product.url} target="_blank" rel="noreferrer">
          <button className="w-full mt-4 bg-black hover:bg-gray-900 text-white py-3 rounded-xl font-medium transition">
            View Product
          </button>
        </a>
      </div>
    </div>
  );
}