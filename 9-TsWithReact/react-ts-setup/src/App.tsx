import React, { useState } from "react";
import CounterOutput from "./components/CounterOutput";

interface IAppState {
  counterValue?: number;
}

const App: React.FC<IAppState> = () => {
  const [counterValue, setClicks] = useState(0);

  return (
    <div style={{ textAlign: "center" }}>
      <CounterOutput counter={counterValue} />
      <button onClick={() => setClicks(counterValue + 1)}>Increment</button>
      <button onClick={() => setClicks(counterValue - 1)}>Decrement</button>
    </div>
  );
};

export default App;
