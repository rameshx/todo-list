import { Todo } from "./TodoList";

export const getInitialTodos = (): Todo[] => {
  const todosInStorage = localStorage.getItem("todos");

  if (!todosInStorage) return [];

  return JSON.parse(todosInStorage);
};

export const saveTodosInStorage = (todos: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
