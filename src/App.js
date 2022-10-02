import './App.css';
import { useState } from 'react';

function App() {
  const [visible, setVisible] = useState(false)
  return (
    <div>
      <button onClick={() => setVisible(!visible)}>toggle</button>
      {visible && <h1>Togglelable</h1>}
    </div>
  );
}

export default App;
