export default function OrderCard({ orderData }) {
  return (
    <div
      className={`rounded-md border p-4 mb-2 ${orderData.type === "VIP" ? "border-yellow-400 bg-yellow-50" : "border-gray-200"} `}
    >
      <p className="text-lg font-bold mb-2">
        Order # {orderData.id}
        {orderData.type === "VIP" && (
          <span className="px-2 py-1 rounded-full text-sm text-white bg-yellow-400 ml-2">
            VIP
          </span>
        )}
      </p>
      <span>{orderData.createdAt}</span>
    </div>
  );
}
