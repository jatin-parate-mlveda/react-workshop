import { useState } from "react";
import "./App.css";
import Body from "./components/Body";
import Header from "./components/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <Header count={count} setCount={setCount} />
      <Body count={count} setCount={setCount} />
    </div>
  );
}

export default App;
