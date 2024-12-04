import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrderStatus } from "../store/orderSlice";
import { assignOrderToBot } from "../store/botSlice";
import { PENDING, PROCESSING, COMPLETED, IDLE } from "../util/status";

export function useOrderProcessing() {
  const orders = useSelector((state) => state.order.orders);
  const bots = useSelector((state) => state.bot.bots);
  const pendingOrders = orders.filter((order) => order.status === PENDING);
  const idleBots = bots.filter((bot) => bot.status === IDLE);
  const dispatch = useDispatch();

  useEffect(() => {
    idleBots.forEach((bot) => {
      const orderToProcess = pendingOrders.shift();
      if (orderToProcess) {
        dispatch(
          updateOrderStatus({
            orderId: orderToProcess.id,
            orderStatus: PROCESSING,
            botId: bot.id,
          }),
        );
        dispatch(
          assignOrderToBot({
            botId: bot.id,
            orderId: orderToProcess.id,
          }),
        );
      }
    });
  }, []);
}
