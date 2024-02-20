import styles from './Todo.module.css';
import { useDispatch } from 'react-redux';
import { change, remove, mark, done } from '../../slices/todoSlice'
import { useState } from 'react';

const Todo = ({index, name, description, isMarked, isDone}) => {
    const dispatch = useDispatch();

    const [todoName, setTodoName] = useState(name);
    const [todoDescription, setTodoDescription] = useState(description);
    const [prevName, setPrevName] = useState(todoName);
    const [prevDescription, setPrevDescription] = useState(todoDescription);

    const [displayForm, setDisplayForm] = useState(false);

    const showChangeForm = () => {
        setPrevName(todoName);
        setPrevDescription(todoDescription);

        setDisplayForm(true);
    }

    const changeTodo = event => {
        event.preventDefault();

        dispatch(change([index, todoName, todoDescription]));

        setDisplayForm(false);
    }

    const cancelChange  = event => {
        event.preventDefault();

        setDisplayForm(false);

        setTodoName(prevName);
        setTodoDescription(prevDescription);
    }

    const removeTodo = () => {
        dispatch(remove(index))
    }

    return (
        <div key={index} data-index={index} className={`${styles.todo} ` + (isDone ? styles.todoDone : '')}>

            { displayForm ? 
            <form className={styles.form} id={`change-form-${index}`}>
                <div>
                    <label htmlFor="name">Название: </label>
                    <input type="text" name='name' value={todoName}
                    onChange={event => setTodoName(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="description">Описание: </label>
                    <input type="text" name="description" value={todoDescription}
                    onChange={event => setTodoDescription(event.target.value)} />
                </div>
                <div>
                    <button onClick={changeTodo}>ОК</button>
                    <button onClick={cancelChange}>Отмена</button>
                </div>
            </form>
            :
            <>
            <div id={`todo-${index}`}>
                <header className={styles.heading}>
                    <h2>{name}</h2>
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
                <button className={styles.changeBtn} onClick={showChangeForm}>Изменить</button>
                <button className={styles.deleteBtn} onClick={removeTodo}>Удалить</button>
            </div>
            </>
            }
        </div>
    )
}

export default Todo