import { Link, useParams } from "react-router-dom"
import Todo from "../Todo/Todo";
import styles from './TodoPage.module.css'
import { useSelector } from "react-redux";
import { RootState } from "../../slices";

const TodoPage = () => {
    let {id} = useParams();
    
    if (!id) id = '0'
    const todo = useSelector((state: RootState) => state.todoList.value)[id]

    const HomeButton = (
        <Link to='/'>
            <button className={styles.link}>
                <i className="fas fa-arrow-left"></i>
                &nbsp;Вернуться на главную страницу
            </button>
        </Link>
    )
    if (!todo) {
        return (
            <>
            <h1>Записка не найдена</h1>
            {HomeButton}
            </>
        )
    }
    return (
        <>
        <Todo index={todo.id} name={todo.name} description={todo.description} isMarked={todo.mark} isDone={todo.done} />
        {HomeButton}
        </>
    )
}

export default TodoPage;