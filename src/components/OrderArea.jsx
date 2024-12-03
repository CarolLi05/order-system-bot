import { useSelector } from "react-redux";

import OrderCard from "./OrderCard";

export default function OrderArea({ status }) {
  const orders = useSelector((state) => state.order.orders);
  const filteredOrders = orders.filter((order) => order.status === status);

  return (
    <div className="rounded-md border p-4">
      <p className="text-xl font-bold mb-4">
        {status}（{filteredOrders.length}）
      </p>
      {filteredOrders.map((order) => (
        <OrderCard key={order.id} orderData={order} />
      ))}
    </div>
  );
}
