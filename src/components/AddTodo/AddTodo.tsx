import { memo, useState } from "react";
import styles from "./AddTodo.module.css";
import { Button } from "../Button/Button";

interface AddTodoProps {
  onAdd: (todoText: string) => void;
}

export const AddTodo = memo((props: AddTodoProps) => {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (!value.trim()) return;
    props.onAdd(value);
    setValue("");
  };

  return (
    <div className={styles["add-todo"]}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder="Type a todo and press enter"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAdd();
          }
        }}
      />
      <Button onClick={handleAdd}>Add Todo</Button>
    </div>
  );
});
