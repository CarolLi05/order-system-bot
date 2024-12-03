import Control from "./components/Control";
import BotStatus from "./components/BotStatus";
import OrderArea from "./components/OrderArea";

function App() {
  return (
    <div className="container mx-auto py-8 gap-3">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-3">
          <Control />
        </div>
        <div className="col-span-3">
          <BotStatus />
        </div>
        <div>
          <OrderArea status="PENDING" />
        </div>
        <div>
          <OrderArea status="PROCESSING" />
        </div>
        <div>
          <OrderArea status="COMPLETED" />
        </div>
      </div>
    </div>
  );
}

export default App;
