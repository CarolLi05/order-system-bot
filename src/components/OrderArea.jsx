import { useSelector } from "react-redux";

import OrderCard from "./OrderCard";

export default function OrderArea({ status }) {
  const orders = useSelector((state) => state.order.orders);
  const filteredOrders = orders.filter((order) => order.status === status);

  return (
    <div className="rounded-md border p-4 bg-white">
      <p className="text-xl font-bold mb-4">
        {status}（{filteredOrders.length}）
      </p>
      <div className="space-y-3">
        {filteredOrders.map((order) => (
          <OrderCard key={order.id} orderData={order} />
        ))}
      </div>
    </div>
  );
}
