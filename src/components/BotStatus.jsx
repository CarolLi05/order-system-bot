import { useSelector } from "react-redux";

import Bot from "./Bot";

export default function BotStatus() {
  const bots = useSelector((state) => state.bot.bots);
  return (
    <div className="rounded-md border p-4">
      <p className="text-xl font-bold mb-2">Bot Status</p>
      <ul>
        {bots.length > 0 && bots.map((bot) => (
          <Bot key={bot.id} id={bot.id} status={bot.status} />
        ))}
      </ul>
    </div>
  );
}
