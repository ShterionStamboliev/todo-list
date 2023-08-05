'use client'

import styles from '../../my-todos/styles.module.css'
import TodoFetcher from '@/app/util/TodoFetcher';
import SubmitHandler from '@/app/util/TodoSubmitHandler';

const AddTodo: React.FC<TodoProps> = () => {

    return (
        <>
            <section className={styles['todo__main__section']}>
                <div className={styles['todo__main__image']}>
                    <SubmitHandler />
                    <TodoFetcher />
                </div>
                <div className={styles['todo__alt__image']}></div>
            </section>
        </>
    )
}

export default AddTodo