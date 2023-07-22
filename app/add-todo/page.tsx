import React from 'react'
import styles from './styles.module.css'

const AddTodo = () => {

    const todos: string[] = ['First', 'Second', 'Third', 'Fourth'];

    return (
        <>
            <section className={styles['todo__main__section']}>
                <div className={styles['todo__main__image']}>
                    <div className={styles['todo__form__container']}>
                        <h1 className={styles['todo__main__header']}>T O D O</h1>
                        <div className={styles['todo__main__form']}>
                            <input className={styles['todo__main__input']} type="text" placeholder='Add task' />
                            <button className={styles['todo__add__button']}>+</button>
                        </div>
                    </div>

                    <div className={styles['todo__tasks__container']}>
                        {todos.map((todo) => (
                            <div className={styles['todo__card']}>
                                <input className={styles['todo__radio__btn']} type="radio" name="radio" id="radio-input" />
                                {todo}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles['todo__alt__image']}></div>
            </section>
        </>
    )
}

export default AddTodo