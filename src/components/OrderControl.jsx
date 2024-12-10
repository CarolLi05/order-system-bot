import { useDispatch } from "react-redux";
import { addOrder } from "../store/orderSlice";

export default function Control() {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center space-x-2 rounded-lg border p-4 bg-white">
      <button
        type="button"
        className="inline-flex items-center px-3 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-400"
        onClick={() =>
          dispatch(addOrder({ type: "NORMAL", createdTime: Date.now() }))
        }
      >+ Normal Order</button>

      <button
        className="inline-flex items-center px-3 py-2 rounded-lg text-gray-800 bg-amber-400 hover:bg-amber-300"
        onClick={() =>
          dispatch(addOrder({ type: "VIP", createdTime: Date.now() }))
        }
      >
        + 👑 VIP Order
      </button>
    </div>
  );
}
