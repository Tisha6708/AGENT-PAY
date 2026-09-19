export default function OrderCard({ order }) {
  const date = new Date(order.created_at).toLocaleDateString("en-IN");

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-lg">{order.product}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Payment ID: {order.payment_id}
          </p>
        </div>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          {order.status}
        </span>
      </div>

      <div className="flex justify-between items-end mt-5">
        <div>
          <p className="text-gray-500 text-sm">Purchased on</p>
          <p className="font-medium">{date}</p>
        </div>

        <p className="text-2xl font-bold text-violet-700">
          ₹{order.amount}
        </p>
      </div>
    </div>
  );
}