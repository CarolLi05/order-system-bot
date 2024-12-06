import Control from "./components/OrderControl";
import BotControl from "./components/BotControl";
import BotStatus from "./components/BotStatus";
import OrderArea from "./components/OrderArea";
import { PENDING, PROCESSING, COMPLETED } from "./util/status";
import { useOrderProcessing } from "./hook/useOrderProcessing";

function App() {
  useOrderProcessing();
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto space-y-5">
        <h1 className="text-3xl font-bold text-gray-800">Order System Bot</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Control />
          <BotControl />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <BotStatus />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <OrderArea status={PENDING} />
          <OrderArea status={PROCESSING} />
          <OrderArea status={COMPLETED} />
        </div>
      </div>
    </div>
  );
}

export default App;
