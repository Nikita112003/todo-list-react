import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css';
import Todo from '../Todo/Todo';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import { create } from '../../slices/todoSlice';
import Form from '../Form/Form';

const App = () => {
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

    const dispatch = useDispatch();
    const nextIndex = useSelector(state => state.todoList.nextIndex)
    const [displayPortal, setDisplayPortal] = useState(false);

    const createTodo = (name, description) => {
        dispatch(create([nextIndex, name, description]));

        setDisplayPortal(false)
    }

    const cancel = () => {
        setDisplayPortal(false)
    }

    return (
        <>
        <h1>Список заметок</h1>
        <button className={styles.createButton} onClick={() => setDisplayPortal(true)}>Создать записку</button>
        {displayPortal && createPortal(
            <Form name={''} description={''} okAction={createTodo} cancelAction={cancel}/>, document.body
        )}
        <div id='todos' className={styles.todos}>
            {todoList.map(todo => (
                <Todo key={todo.id} index={todo.id} name={todo.name} description={todo.description} isMarked={todo.mark} isDone={todo.done}/>
            ))}
        </div>
        </>
    )
}

export default App