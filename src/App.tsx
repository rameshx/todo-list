import { TodoList } from "./components/TodoList/TodoList";
import styles from "./App.module.css";

function App() {
  return (
    <section className={styles.app}>
      <TodoList />
    </section>
  );
}

export default App;
