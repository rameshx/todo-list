import { ComponentProps } from "react";
import styles from "./Button.module.css";

export const Button = (props: ComponentProps<"button">) => {
  return (
    <button {...props} className={[styles.button, props.className].filter(Boolean).join(" ")} />
  );
};
