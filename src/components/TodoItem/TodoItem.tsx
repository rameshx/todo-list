import { memo } from "react";
import { Button } from "../Button/Button";
import { Todo } from "../TodoList/TodoList";
import styles from "./TodoItem.module.css";

interface TodoProps {
  todo: Todo;
  onToggle: (id: string, isComplete: boolean) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = memo(({ todo, onToggle, onDelete }: TodoProps) => {
  return (
    <li className={styles["todo-item"]}>
      <label className={styles.label} htmlFor={todo.id}>
        <input
          type="checkbox"
          name="isComplete"
          id={todo.id}
          checked={todo.isComplete}
          onChange={(e) => onToggle(todo.id, e.currentTarget.checked)}
        />
        <span
          title={todo.text}
          className={[styles.text, todo.isComplete ? styles.checked : undefined]
            .filter(Boolean)
            .join(" ")}
        >
          {todo.text}
        </span>
      </label>
      <Button onClick={() => onDelete(todo.id)} className={styles.delete}>
        &#10005;
      </Button>
    </li>
  );
});
