import { useSelector } from "react-redux";
import OrderCard from "./OrderCard";
import { PENDING, PROCESSING, COMPLETED } from "../util/status";

export default function OrderArea({ status }) {
  const orders = useSelector((state) => state.order.orders);
  const filteredOrders = orders.filter((order) => order.status === status);
  // 找出 VIP 跟 NORMAL 訂單
  const vipOrders = filteredOrders.filter((order) => order.type === "VIP");
  const normalOrders = filteredOrders.filter(
    (order) => order.type === "NORMAL",
  );
  // 排序 VIP 跟 NORMAL 訂單
  const sortedVipOrders = vipOrders.sort((a, b) => a.createdAt - b.createdAt);
  const sortedNormalOrders = normalOrders.sort(
    (a, b) => a.createdAt - b.createdAt,
  );
  // 建立 pending 訂單
  const pendingOrders = [...sortedVipOrders, ...sortedNormalOrders];

  const sortedProcessingOrders = filteredOrders.sort(
    (a, b) => a.startedAt - b.startedAt,
  );
  const sortedCompletedOrders = filteredOrders.sort(
    (a, b) => b.completedAt - a.completedAt,
  );

  return (
    <div className="rounded-md border p-4 bg-white">
      <h2 id={`${status}-heading`} className="text-xl font-bold mb-4">
        {status}
        <span>（{filteredOrders.length}）</span>
      </h2>
      <ul className="space-y-3" aria-labelledby={`${status}-heading`}>
        {status === PENDING &&
          pendingOrders.map((order) => (
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
      </ul>
    </div>
  );
}
