import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

const todoAxios = axios.create({
  baseURL: "http://localhost:3001/todos",
});

export const createTodo = (task = "") =>
  todoAxios
    .post("", { task, createdAt: new Date().toISOString() })
    .then((res) => res.data);

export const fetchToDoes = (sortDirection) =>
  todoAxios
    .get("", { params: { _order: sortDirection, _sort: "task" } })
    .then((res) => res.data);

export const patchTodo = (id, obj) =>
  todoAxios.patch(id.toString(), obj).then((res) => res.data);

export const deleteTodo = (id) =>
  todoAxios.delete(id.toString()).then((res) => res.data);

export default todoAxios;
