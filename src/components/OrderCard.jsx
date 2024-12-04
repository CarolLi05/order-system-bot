export default function OrderCard({ orderData }) {
  return (
    <div
      className={`rounded-md border p-4 mb-2 ${orderData.type === "VIP" ? "border-amber-400 bg-amber-50" : "border-gray-200"} `}
    >
      <h2 className="text-lg font-bold mb-2">
        Order #{orderData.id}
        {orderData.type === "VIP" && (
          <span className="px-2 py-1 mr-1 rounded-full text-sm text-white bg-amber-400 ml-2">
            VIP
          </span>
        )}
      </h2>
      {orderData.botProcessing && <p>Bot #{orderData.botProcessing}</p>}
      <p>{orderData.createdAt}</p>
    </div>
  );
}
