import { useDispatch, useSelector } from "react-redux";
import { addBot, removeBot } from "../store/botSlice";

export default function BotControl() {
  const dispatch = useDispatch();
  const bots = useSelector((state) => state.bot.bots);

  return (
    <div className="flex flex-row flex-wrap items-center justify-between space-x-2 rounded-lg border p-4 bg-white">
      <span className="font-bold text-lg">🤖 Bots： {bots.length}</span>
      <div className="flex gap-2">
        <button
          className="inline-flex items-center px-3 py-2 rounded-lg text-white bg-emerald-500 border border-emerald-500 hover:text-white hover:bg-emerald-400 hover:border-emerald-400"
          onClick={() => dispatch(addBot())}
        >
          + Bot
        </button>
        <button
          className="inline-flex items-center px-3 py-2 rounded-lg text-white bg-rose-500 border border-rose-400 hover:text-white hover:bg-rose-400 hover:border-rose-400"
          onClick={() => dispatch(removeBot())}
        >
          - Bot
        </button>
      </div>
    </div>
  );
}
