import { useDispatch } from "react-redux";
import { addBot, removeBot } from "../store/botSlice";

export default function Control() {
  const dispatch = useDispatch();

  let defaultButtonClasses =
    "inline-flex algin-items-center justify-content-center px-3 py-2 rounded-md text-sm";

  const addBotHandler = () => {
    dispatch(addBot());
  };

  const removeBotHandler = () => {
    dispatch(removeBot());
  };

  return (
    <div className="flex flex-row flex-wrap space-x-2 rounded-md border p-4">
      <button
        className={`${defaultButtonClasses} text-white bg-blue-500 hover:bg-blue-600`}
      >
        + Normal Order
      </button>

      <button
        className={`${defaultButtonClasses} text-gray-900 bg-yellow-400 hover:bg-yellow-500`}
      >
        + VIP Order
      </button>
      <button
        className={`${defaultButtonClasses} text-blue-500 bg-white border border-blue-500 hover:text-white hover:bg-blue-600 hover:border-blue-600`}
        onClick={addBotHandler}
      >
        + Bot
      </button>
      <button
        className={`${defaultButtonClasses} text-red-500 bg-white border border-red-500 hover:text-white hover:bg-red-600 hover:border-red-600`}
        onClick={removeBotHandler}
      >
        - Bot
      </button>
    </div>
  );
}
