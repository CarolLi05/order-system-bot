import { useSelector } from "react-redux";

import Bot from "./Bot";

export default function BotStatus() {
  const bots = useSelector((state) => state.bot.bots);
  return (
    <div className="rounded-lg border p-4 bg-white">
      <p className="text-xl font-bold mb-2">Bot Status</p>
      <ul>
        {bots.length > 0 &&
          bots.map((bot) => <Bot key={bot.id} botData={bot} />)}
      </ul>
    </div>
  );
}
