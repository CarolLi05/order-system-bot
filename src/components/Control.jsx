import { useDispatch } from "react-redux";
import { addBot, removeBot } from "../store/botSlice";
import { addOrder } from "../store/orderSlice";

export default function Control() {
  const dispatch = useDispatch();

  let defaultButtonClasses = "inline-flex items-center px-3 py-2 rounded-lg";

  return (
    <div className="flex flex-row flex-wrap space-x-2 rounded-md border p-4">
      <button
        type="button"
        className={`${defaultButtonClasses} text-white bg-blue-500 hover:bg-blue-400`}
        onClick={() => dispatch(addOrder("NORMAL"))}
      >
        + Normal Order
      </button>

      <button
        className={`${defaultButtonClasses} text-white bg-amber-400 hover:bg-amber-300`}
        onClick={() => dispatch(addOrder("VIP"))}
      >
        👑 VIP Order
      </button>
      <button
        className={`${defaultButtonClasses} text-blue-400 bg-white border border-blue-400 hover:text-white hover:bg-blue-400 hover:border-blue-400`}
        onClick={() => dispatch(addBot())}
      >
        + Bot
      </button>
      <button
        className={`${defaultButtonClasses} text-rose-400 bg-white border border-rose-400 hover:text-white hover:bg-rose-400 hover:border-rose-400`}
        onClick={() => dispatch(removeBot())}
      >
        - Bot
      </button>
    </div>
  );
}
