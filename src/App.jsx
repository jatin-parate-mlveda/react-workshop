import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState({ value: "", error: null });

  const onNameChange = (e) => {
    const newValue = e.target.value.trim();
    const error = Boolean(newValue)
      ? newValue === "invalid"
        ? "Invalid value"
        : null
      : "Required!";
    return setName({
      value: newValue,
      error,
    });
  };

  return (
    <div className="container mt-5">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            autoComplete="off"
            value={name.value}
            onChange={onNameChange}
            name="name"
            type="text"
            className={`form-control ${name.error ? "is-invalid" : ""}`}
            id="name"
            placeholder="Enter name"
          />
          {name.error && <div className="invalid-feedback">{name.error}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
