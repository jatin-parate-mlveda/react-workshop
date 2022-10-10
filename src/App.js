import { useState, Suspense, lazy, Fragment } from "react";
import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
// import Content from "./Content";

// code splitting
const Content = lazy(() => import('./Content'))

function useToggleState() {
  const [visible, setVisible] = useState(false);

  return [visible, () => setVisible(!visible)]
}

function App() {
  const [visible, toggle] = useToggleState()

  return (
    <>
      <button onClick={() => toggle()}>toggle</button>
      <ErrorBoundary fallback={<h1>Something went wrong!</h1>}>
        <Suspense fallback={<h1>Loading...</h1>}>
          {visible && <Content />}
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
