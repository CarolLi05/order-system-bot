import { useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrderStatus } from "../store/orderSlice";
import { assignOrderToBot, clearBotOrder } from "../store/botSlice";
import { PENDING, PROCESSING, COMPLETED, IDLE } from "../util/status";

const PROCESSING_TIME = 10000; // 10 秒

export function useOrderProcessing() {
  const orders = useSelector((state) => state.order.orders);
  const bots = useSelector((state) => state.bot.bots);
  const dispatch = useDispatch();
  const timersRef = useRef(new Map());
  console.log("timersRef", timersRef.current);

  const processingOrder = useCallback(
    (orderId, botId) => {
      dispatch(updateOrderStatus({ orderId, status: PROCESSING, botId }));
      dispatch(assignOrderToBot({ botId, orderId }));
    },
    [dispatch],
  );

  const completeOrder = useCallback(
    (orderId, botId) => {
      dispatch(updateOrderStatus({ orderId, status: COMPLETED, botId }));
      dispatch(clearBotOrder({ botId }));
    },
    [dispatch],
  );

  // 處理訂單
  useEffect(() => {
    // 檢查是否有空閒的機器人及等待中的訂單，有的話開始分配
    const startProcessing = () => {
      const pendingOrders = orders.filter((order) => order.status === PENDING);
      const idleBots = bots.filter((bot) => bot.status === IDLE);
      if (pendingOrders.length === 0 || idleBots.length === 0) return;

      idleBots.forEach((bot) => {
        const orderToProcess = pendingOrders.shift();
        if (!orderToProcess) return;
        processingOrder(orderToProcess.id, bot.id);
        const timerId = setTimeout(() => {
          // 如果機器人還存在
          if (bot) {
            completeOrder(orderToProcess.id, bot.id);
          }
          timersRef.current.delete(timerId);
          clearTimeout(timerId);
        }, PROCESSING_TIME);
        timersRef.current.set(timerId, orderToProcess.id);
      });
    };

    const interval = setInterval(startProcessing, 500);

    return () => {
      clearInterval(interval);
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
    };
  }, [orders, bots, dispatch, processingOrder, completeOrder]);
}
