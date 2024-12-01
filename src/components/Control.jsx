export default function Control() {
  let defaultButtonClasses =
    "inline-flex algin-items-center justify-content-center px-3 py-2 rounded-md text-sm";

  return (
    <div className="flex flex-row flex-wrap space-x-2 rounded-md border p-4">
      <button
        className={`${defaultButtonClasses} text-white bg-blue-500 hover:bg-blue-600`}
      >
        + Normal Order
      </button>

      <button
        className={`${defaultButtonClasses} text-white bg-orange-500 hover:bg-orange-600`}
      >
        + VIP Order
      </button>
      <button
        className={`${defaultButtonClasses} text-blue-500 bg-white border border-blue-500 hover:text-white hover:bg-blue-600 hover:border-blue-600`}
      >
        + Bot
      </button>
      <button
        className={`${defaultButtonClasses} text-red-500 bg-white border border-red-500 hover:text-white hover:bg-red-600 hover:border-red-600`}
      >
        - Bot
      </button>
    </div>
  );
}
