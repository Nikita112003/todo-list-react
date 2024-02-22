import styles from './Form.module.css';
import React, { useState } from "react";

interface FormProps {
    name: string,
    description: string,
    okAction: (name: string, description: string) => void;
    cancelAction: () => void;
}

const Form = ({name, description, okAction, cancelAction}: FormProps) => {
    const [todoName, setName] = useState(name);
    const [todoDescription, setDescription] = useState(description);

    const handleOkClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        okAction(todoName, todoDescription)
    }

    const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        cancelAction()
    }

    return (
        <form className={styles.form}>
            <div className={styles.input}>
                <label htmlFor="name">Название: </label>
                <input type="text" name='name' value={todoName}
                onChange={event => setName(event.target.value)}/>
            </div>
            <div className={styles.input}>
                <label htmlFor="description">Описание: </label>
                <input type="text" name="description" value={todoDescription}
                onChange={event => setDescription(event.target.value)} />
            </div>
            <div className={styles.buttons}>
                <button onClick={handleOkClick}>ОК</button>
                <button onClick={handleCancelClick}>Отмена</button>
            </div>
        </form>
    )
}

export default Form