import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  within,
  act,
  cleanup,
} from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";
import App from "../App";
import { PENDING, PROCESSING, COMPLETED } from "../util/status";

describe("order-system-bot", () => {
  beforeEach(() => {
    cleanup();
    vi.useFakeTimers(); // 使用模擬時間
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.useRealTimers(); // 每次測試運行後恢復日期
  });

  it("渲染主要 UI 元素", () => {
    expect(screen.getByText("+ Normal Order")).toBeInTheDocument();
    expect(screen.getByText("+ 👑 VIP Order")).toBeInTheDocument();
    expect(screen.getByText("+ Bot")).toBeInTheDocument();
    expect(screen.getByText("- Bot")).toBeInTheDocument();
    expect(screen.getByText(PENDING)).toBeInTheDocument();
    expect(screen.getByText(PROCESSING)).toBeInTheDocument();
    expect(screen.getByText(COMPLETED)).toBeInTheDocument();
  });

  it("新增一個 NORMAL 訂單和一個 VIP 訂單到 PENDING 區域", () => {
    const normalButton = screen.getByText("+ Normal Order");
    const vipButton = screen.getByText("+ 👑 VIP Order");

    fireEvent.click(normalButton);
    fireEvent.click(vipButton);

    const pendingOrderList = screen.getByRole("list", { name: /PENDING/i });
    // 取得 pending list 裡所有的 element
    const { getAllByRole } = within(pendingOrderList);
    // 所有的 listitem
    const listItems = getAllByRole("listitem");

    expect(listItems[0]).toHaveTextContent("VIP");
    expect(listItems[1]).toHaveTextContent("NORMAL");
  });

  it("處理訂單流程", async () => {
    const normalButton = screen.getByText("+ Normal Order");
    const botButton = screen.getByText("+ Bot");

    fireEvent.click(normalButton);
    fireEvent.click(botButton);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // screen.debug();

    const processingOrderList = screen.getByRole("list", {
      name: /PROCESSING/i,
    });

    // 取得 processing list 裡所有的 element
    const { getAllByRole: getAllByRoleProcessing } = within(processingOrderList);
    // 所有的 listitem
    const listItemsProcessing = getAllByRoleProcessing("listitem");
    expect(listItemsProcessing[0]).toHaveTextContent("處理時間");

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    const completedOrderList = screen.getByRole("list", {
      name: /COMPLETED/i,
    });

    // 取得 completed list 裡所有的 element
    const { getAllByRole: getAllByRoleCompleted } = within(completedOrderList);
    // 所有的 listitem
    const listItemsCompleted = getAllByRoleCompleted("listitem");
    expect(listItemsCompleted[0]).toHaveTextContent("完成時間");
  });
});
