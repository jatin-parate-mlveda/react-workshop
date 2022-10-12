import { Suspense, useEffect, useLayoutEffect, useState } from "react";
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

// const toDosResource = createResource(fetchToDoes("asc"));

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
    <div className="container mt-3">
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

function App() {
  return (
    <ErrorBoundary fallback={<h1>Something went wrong!</h1>}>
      <Suspense fallback={<LoadingPage />}>
        <TodoApp />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
