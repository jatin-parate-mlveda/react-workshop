import Counter from "./Counter";

export default function Body({ count, setCount }) {
  return (
    <div className="bodyContainer">
      <h1>Container</h1>
      <Counter count={count} setCount={setCount} />
    </div>
  );
}
