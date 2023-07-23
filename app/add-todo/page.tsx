'use client'

import React, { useState } from 'react'
import styles from './styles.module.css'
import { doc, setDoc, collection, writeBatch, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { useRouter } from 'next/navigation';

const AddTodo = () => {
    const router = useRouter();
    const todos: string[] = ['First', 'Second', 'Third', 'Fourth'];

    const [todo, setTodo] = useState({
        todoInput: ''
    });

    const user = auth.currentUser;
   
    const handleTodoSubmit = async () => {
        if (user) {
            const userDoc = doc(db, 'users', user.uid);
            const batch = writeBatch(db);
            const userDocs = collection(db, 'todos');
        
            await addDoc(userDocs, {
                author: {
                    owner: user.uid
                }
            }).then(async (doc) => {
                const docId = doc.id;
                await setDoc(userDoc, {
                    todo: {
                        [docId]: {
                            todoTitle: todo.todoInput,
                            isCompleted: false
                        }
                    }
                }, { merge: true })
            })
            await batch.commit();
            return router.push('/');
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo({
            ...todo,
            [e.target.name]: e.target.value
        })
    };

    return (
        <>
            <section className={styles['todo__main__section']}>
                <div className={styles['todo__main__image']}>
                    <div className={styles['todo__form__container']}>
                        <h1 className={styles['todo__main__header']}>T O D O</h1>
                        <div className={styles['todo__main__form']}>
                            <input
                                className={styles['todo__main__input']}
                                type="text" placeholder='Add task'
                                name='todoInput'
                                onChange={handleInput}
                                value={todo.todoInput} />
                            <button className={styles['todo__add__button']} onClick={handleTodoSubmit}>+</button>
                        </div>
                    </div>

                    <div className={styles['todo__tasks__container']}>
                        {todos.map((todo) => (
                            <div className={styles['todo__card']}>
                                <input
                                    className={styles['todo__radio__btn']}
                                    type="radio"
                                    id="radio-input" />
                                {todo}
                            </div>
                        ))}
                        <p className={styles['todo__card_paragraph']}>Drag and drop to reorder list</p>
                    </div>
                </div>
                <div className={styles['todo__alt__image']}></div>
            </section>
        </>
    )
}

export default AddTodo