import { useSelector } from 'react-redux';
import styles from '../styles/App.module.css';
import CreateTodo from './CreateTodo';
import Todo from './Todo';

export default () => {
    const todoList = Array.from(
        Object.values(useSelector((state) => state.todoList.value))
    );
    todoList.sort((a, b) => {
        if (a.mark && !b.mark) {
          return -1;
        } else if (!a.mark && b.mark) {
          return 1;
        } else {
          return 0;
        }
    });

    function createTodo() {
        let form = document.getElementById('create-todo');
        form.style.display = 'block';
    }

    return (
        <>
        <h1>Список заметок</h1>
        <button className={styles.createButton} onClick={createTodo}>Создать записку</button>
        <div id='todos' className={styles.todos}>
            <CreateTodo />
            {todoList.map(todo => (
                <Todo key={todo.id} index={todo.id} name={todo.name} description={todo.description} isMarked={todo.mark} isDone={todo.done}/>
            ))}
        </div>
        </>
    )
}