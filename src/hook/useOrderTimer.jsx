/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useCallback, useEffect } from "react";

export const useOrderTimer = () => {
  const timers = useRef(new Map());

  const clearTimer = useCallback((orderId) => {
    if (timers.current.has(orderId)) {
      clearTimeout(timers.current.get(orderId));
      timers.current.delete(orderId);
    }
  }, []);

  const setTimer = useCallback(
    (orderId, callback, duration) => {
      clearTimer(orderId);
      const timerId = setTimeout(callback, duration);
      timers.current.set(orderId, timerId);
    },
    [clearTimer],
  );

  useEffect(() => {
    return () => {
      timers.current.forEach((timerId) => clearTimeout(timerId));
      timers.current.clear();
    };
  }, []);

  return { setTimer, clearTimer };
};
