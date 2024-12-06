import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrderStatus, resetProcessingOrder } from "../store/orderSlice";
import { assignOrderToBot, clearBotOrder } from "../store/botSlice";
import { useOrderTimer } from "./useOrderTimer";
import { PENDING, PROCESSING, IDLE, COMPLETED } from "../util/status";

const PROCESSING_TIME = 10000; // 10 秒

export function useOrderProcessing() {
  const orders = useSelector((state) => state.order.orders);
  const bots = useSelector((state) => state.bot.bots);
  const dispatch = useDispatch();
  const { setTimer, clearTimer } = useOrderTimer();

  const completeOrder = useCallback(
    (orderId, botId) => {
      dispatch(
        updateOrderStatus({
          orderId,
          status: COMPLETED,
          botId: null,
          completedAt: Date.now(),
        }),
      );
      dispatch(clearBotOrder(botId));
      clearTimer(orderId);
    },
    [dispatch, clearTimer],
  );

  const processingOrder = useCallback(
    (order, bot) => {
      dispatch(
        updateOrderStatus({
          orderId: order.id,
          status: PROCESSING,
          botId: bot.id,
          startedAt: Date.now(),
        }),
      );
      dispatch(assignOrderToBot({ botId: bot.id, orderId: order.id }));

      setTimer(
        order.id,
        () => completeOrder(order.id, bot.id),
        PROCESSING_TIME,
      );
    },
    [dispatch, setTimer, completeOrder],
  );

  const cancelOrder = useCallback(
    (botId) => {
      dispatch(resetProcessingOrder(botId));
    },
    [dispatch],
  );

  // 機器人被刪除，重設訂單狀態
  useEffect(() => {
    const currentBotIds = new Set(bots.map((bot) => bot.id));

    orders.forEach((order) => {
      if (order.status === PROCESSING) {
        if (!currentBotIds.has(order.processingBot)) {
          clearTimer(order.id);
          cancelOrder(order.processingBot);
        }
      }
    });
  }, [bots, orders, cancelOrder, clearTimer]);

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
        processingOrder(orderToProcess, bot);
      });
    };

    const interval = setInterval(startProcessing, 500);

    return () => clearInterval(interval);
  }, [orders, bots, processingOrder]);
}

export default useOrderProcessing;