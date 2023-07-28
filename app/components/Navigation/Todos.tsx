'use client'

import styles from '../../my-todos/styles.module.css'
import TodoFetcher from '@/app/util/TodoFetcher';
import SubmitHandler from '@/app/util/SubmitHandler';

const AddTodo: React.FC<TodoProps> = ({ title }) => {

    return (
        <>
            <section className={styles['todo__main__section']}>
                <div className={styles['todo__main__image']}>
                    <div className={styles['todo__form__container']}>
                        <h1 className={styles['todo__main__header']}>T O D O</h1>
                        <div className={styles['todo__main__form']}>
                            <SubmitHandler />
                        </div>
                    </div>
                    <TodoFetcher title={title} />
                </div>
                <div className={styles['todo__alt__image']}></div>
            </section>
        </>
    )
}

export default AddTodo