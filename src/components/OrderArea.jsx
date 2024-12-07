import { useSelector } from "react-redux";
import OrderCard from "./OrderCard";
import { PENDING, PROCESSING, COMPLETED } from "../util/status";

export default function OrderArea({ status }) {
  const orders = useSelector((state) => state.order.orders);
  const filteredOrders = orders.filter((order) => order.status === status);
  const sortedProcessingOrders = filteredOrders.sort(
    (a, b) => a.startedAt - b.startedAt,
  );
  const sortedCompletedOrders = filteredOrders.sort(
    (a, b) => b.completedAt - a.completedAt,
  );

  return (
    <div className="rounded-md border p-4 bg-white">
      <p className="text-xl font-bold mb-4">
        {status}（{filteredOrders.length}）
      </p>
      <div className="space-y-3">
        {status === PENDING &&
          filteredOrders.map((order) => (
            <OrderCard key={order.id} orderData={order} />
          ))}
        {status === PROCESSING &&
          sortedProcessingOrders.map((order) => (
            <OrderCard key={order.id} orderData={order} />
          ))}
        {status === COMPLETED &&
          sortedCompletedOrders.map((order) => (
            <OrderCard key={order.id} orderData={order} />
          ))}
      </div>
    </div>
  );
}
