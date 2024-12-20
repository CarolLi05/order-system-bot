import { PROCESSING } from "../util/status";

export default function Bot({ botData }) {
  let BotClasses =
    "inline-flex flex-wrap algin-items-center justify-content-center px-2 py-1 rounded-full text-white text-sm";

  if (botData.status === PROCESSING) {
    BotClasses += " bg-blue-400";
  } else {
    BotClasses += " bg-gray-400";
  }

  return (
    <>
      <li className={BotClasses}>
        🤖 Bot #{botData.id}
        {botData.status === PROCESSING && ` ➡️ Order #${botData.currentOrder}`}
      </li>
    </>
  );
}
