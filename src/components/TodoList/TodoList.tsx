import { useCallback, useEffect, useMemo, useState } from "react";
import { AddTodo } from "../AddTodo/AddTodo";
import styles from "./TodoList.module.css";
import { TodoItem } from "../TodoItem/TodoItem";
import { getInitialTodos, saveTodosInStorage } from "./Utils";

export interface Todo {
  id: string;
  text: string;
  isComplete: boolean;
  createdAt: number;
  completedAt?: number;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>(getInitialTodos());

  useEffect(() => {
    saveTodosInStorage(todos);
  }, [todos]);

  const onAdd = useCallback((text: string) => {
    setTodos((previous) => [
      ...previous,
      {
        id: Date.now().toString(),
        text,
        isComplete: false,
        createdAt: Date.now(),
      },
    ]);
  }, []);

  const onToggle = useCallback((id: string, isComplete: boolean) => {
    setTodos((previous) =>
      previous.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              isComplete,
              completedAt: isComplete ? Date.now() : undefined,
            }
          : todo
      )
    );
  }, []);

  const onDelete = useCallback((id: string) => {
    setTodos((previous) => previous.filter((todo) => todo.id !== id));
  }, []);

  const [incompleteTodos, completeTodos] = useMemo(() => {
    const incomplete = todos.filter((todo) => !todo.isComplete);
    const complete = todos.filter((todo) => todo.isComplete);

    incomplete.sort((a, b) => b.createdAt - a.createdAt);
    complete.sort(
      (a, b) => (a.completedAt as number) - (b.completedAt as number)
    );

    return [incomplete, complete];
  }, [todos]);

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>Todo List</h2>
      <AddTodo onAdd={onAdd} />

      <ul className={styles.list}>
        {incompleteTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
        {completeTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </main>
  );
};
