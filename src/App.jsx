import { Suspense, useEffect, useState } from "react";
import Gravatar from "react-gravatar";
import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import TaskEdit from "./TaskEdit";
import TaskInput from "./TaskInput";
import Todo from "./Todo";
import TasksList from "./TasksList";
import Toggle from "./Toggle";
import TodoListItem from "./TodoListItem";
import { addNewTask, deleteTask, editTask } from "./helpers";
import { fetchToDoes } from "./todoAxios";
import LoadingPage from "./LoadingPage";
import createResource from "./createResource";
import axios from "axios";

const userResource = createResource(axios.get("/user").then((res) => res.data));

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchToDoesError, setFetchToDoesError] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    setLoading(true);
    fetchToDoes(sortDirection)
      .then((toDoes) => {
        setTasks(toDoes);
      })
      .catch((err) => {
        setFetchToDoesError(err);
      })
      .finally(() => setLoading(false));
  }, [sortDirection]);

  if (fetchToDoesError) {
    throw fetchToDoesError;
  }

  if (loading) {
    return <LoadingPage />;
  }

  const onTaskAdded = (createdTodo) => {
    setTasks(addNewTask(tasks, createdTodo));
  };
  const onTaskDelete = (index) => {
    setTasks(deleteTask(index, tasks));
  };
  const onTaskEdit = (updatedTodo, index) => {
    setTasks(editTask(tasks, index, updatedTodo));
  };
  const onSort = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <div className="container mt-4">
      <TaskInput
        onSortClick={onSort}
        sortDirection={sortDirection}
        onTaskAdded={onTaskAdded}
      />
      <TasksList>
        {tasks.map((task, index) => (
          <TodoListItem key={task.id}>
            <Toggle
              render={(isOn, toggle) =>
                isOn ? (
                  <TaskEdit
                    task={task}
                    toggle={toggle}
                    index={index}
                    onEdit={onTaskEdit}
                  />
                ) : (
                  <Todo
                    task={task}
                    index={index}
                    onDelete={onTaskDelete}
                    onEditClick={toggle}
                  />
                )
              }
            />
          </TodoListItem>
        ))}
      </TasksList>
    </div>
  );
}

function TodoAppWithUser() {
  const currentUser = userResource.read();

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1 mr-auto">ToDos</span>
        {/* <span className="text-white">{currentUser.name}</span> */}
        <div style={{ overflow: "hidden" }} className="bg-info rounded-circle">
          <Gravatar
            style={{ width: "2rem", height: "2rem" }}
            title={currentUser.name}
            email={currentUser.email}
          />
        </div>
      </nav>
      <TodoApp />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary fallback={<h1>Something went wrong!</h1>}>
      <Suspense fallback={<LoadingPage />}>
        <TodoAppWithUser />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
