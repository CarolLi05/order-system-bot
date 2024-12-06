import { PROCESSING, COMPLETED } from "../util/status";

export default function OrderCard({ orderData }) {
  const changeStatusColor = (status) => {
    switch (status) {
      case PROCESSING:
        return "bg-blue-50";
      case COMPLETED:
        return "bg-green-50";
      default:
        return orderData.type === "VIP" ? "bg-amber-50" : "bg-white";
    }
  };

  const changeStatusBorderColor = (status) => {
    switch (status) {
      case PROCESSING:
        return "border-blue-400";
      case COMPLETED:
        return "border-green-400";
      default:
        return orderData.type === "VIP"
          ? "border-amber-400"
          : "border-gray-200";
    }
  };

  return (
    <div
      className={`rounded-md border p-4 ${changeStatusColor(orderData.status)} ${changeStatusBorderColor(orderData.status)}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg font-bold">Order #{orderData.id}</span>
        {orderData.type === "VIP" && (
          <span className="px-2 py-1 rounded-full text-sm font-bold text-white bg-amber-400">
            VIP
          </span>
        )}
        {orderData.processingBot && (
          <span className="text-sm text-gray-600">
            Bot #{orderData.processingBot}
          </span>
        )}
      </div>
      <p>created at：{orderData.createdAt}</p>
      {orderData.completedAt && <p>completed at：{orderData.completedAt}</p>}
    </div>
  );
}
