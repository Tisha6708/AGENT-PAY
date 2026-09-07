function ChatPreview() {
  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6">
      <div className="bg-gradient-to-r from-violet-700 to-purple-600 rounded-2xl p-5 text-white mb-5">
        <p className="text-sm opacity-80">Travel Agent</p>
        <h3 className="text-2xl font-bold mt-1">Jaipur Hotels</h3>
      </div>

      <div className="space-y-3">
        <div className="bg-gray-100 rounded-xl p-3 w-fit">
          Find me hotels under ₹3000
        </div>

        <div className="bg-violet-100 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-violet-600 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-violet-700">
              Comparing 12 hotels...
            </span>
          </div>

          Lemon Tree offers the best value within your budget.
        </div>

        <div className="border rounded-xl p-4 hover:shadow transition cursor-pointer">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">Lemon Tree Jaipur</h4>

            <span className="font-bold text-green-600">₹2850</span>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            ⭐ 4.5 · 1.2 km away
          </p>

          <span className="inline-block mt-3 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
            AI Best Choice
          </span>
        </div>
      </div>
    </div>
  );
}

export default ChatPreview;