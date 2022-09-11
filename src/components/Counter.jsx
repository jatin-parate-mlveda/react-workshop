export default function Counter({ count, setCount }) {
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
