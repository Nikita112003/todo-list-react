import styles from './Todo.module.css'
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { change, done, mark, remove } from "../../slices/todoSlice";
import { createPortal } from 'react-dom';
import Form from '../Form/Form';

interface TodoProps {
    index: string,
    name: string,
    description: string,
    isMarked: boolean,
    isDone: boolean
}

const Todo = ({index, name, description, isMarked, isDone}: TodoProps) => {
    const dispatch = useDispatch();

    const [displayForm, setDisplayForm] = useState(false);

    const changeTodo = (todoName: string, todoDescription: string) => {
        dispatch(change([index, todoName,todoDescription]));

        setDisplayForm(false);
    }

    const cancelChange = () => {
        setDisplayForm(false);
    }

    return (
        <div key={index} data-index={index} className={`${styles.todo} ` + (isDone ? styles.todoDone : '')}>

            { displayForm && 
            createPortal(
                <Form name={name} description={description} okAction={changeTodo} cancelAction={cancelChange} />
                , document.body)}
            <>
            <div id={`todo-${index}`}>
                <header className={styles.heading}>
                    <h2 onClick={() => dispatch(done(index))}>{name}</h2>
                    <div>
                        <button title='Отметить как важное' onClick={() => dispatch(mark(index))}>
                            <i className={`${isMarked ? styles.marked + ' fas' : 'far'} fa-star`}></i>
                        </button>
                        <button title='Отметить как выполненное' onClick={() => dispatch(done(index))}>
                            <i className={`${isDone ? styles.done + ' fas' : 'far'} fa-check-circle`}></i>
                        </button>
                    </div>
                </header>
                <p>{description}</p>
            </div>

            <div id={`todo-${index}-buttons`}>
                <button className={styles.changeBtn} onClick={() => setDisplayForm(true)}>Изменить</button>
                <button className={styles.deleteBtn} onClick={() => dispatch(remove(index))}>Удалить</button>
            </div>
            </>
        </div>
    )
}

export default Todo