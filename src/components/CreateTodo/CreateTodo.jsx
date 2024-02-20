import todoStyles from '../Todo/Todo.module.css';
import createTodoStyles from './CreateTodo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { create } from '../../slices/todoSlice';
import { useState } from 'react';

const CreateTodo = () => {
    const dispatch = useDispatch();

    const [todoName, setTodoName] = useState('');
    const [todoDescription, setTodoDescription] = useState('');
    const nextIndex = useSelector((state) => state.todoList.nextIndex)

    const createTodo = event => {
        event.preventDefault();
        
        dispatch(create([nextIndex, todoName, todoDescription]));

        setTodoName('');
        setTodoDescription('');

        let form = document.getElementById('create-todo');
        form.style.display = 'none';
    }

    const cancel = event => {
        event.preventDefault();

        setTodoName('');
        setTodoDescription('');

        let form = document.getElementById('create-todo');
        form.style.display = 'none';
    }

    return (
        <div className={`${todoStyles.todo} ${createTodoStyles.todo}`} id='create-todo'>
            <form className={`${todoStyles.form} ${createTodoStyles.form}`}>
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
                    <button onClick={createTodo}>ОК</button>
                    <button onClick={cancel}>Отмена</button>
                </div>
            </form>
        </div>
    )
}

export default CreateTodo