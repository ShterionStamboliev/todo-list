'use client'

import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import {
    doc,
    setDoc,
    collection,
    writeBatch,
    addDoc,
    getDocs,
    DocumentData,
    query,
    where
} from 'firebase/firestore';

import { auth, db } from '../firebase/config';
import { useRouter } from 'next/navigation';
import { runEmptyFieldError } from '../alerts/onSuccess';

type TodoProps = {
    title: string,
    owner: string,
}

const AddTodo = () => {
    const router = useRouter();
    const batch = writeBatch(db);
    const userDocs = collection(db, 'todos');
    const user = auth.currentUser;

    const [todo, setTodo] = useState({
        todoInput: ''
    });

    const [todoData, setTodoData] = useState<TodoProps[]>([]);

    const handleTodoSubmit = async () => {
        if (todo.todoInput === '') {
            runEmptyFieldError();
            return;
        };

        if (user) {
            const userDoc = doc(db, 'users', user.uid);

            await addDoc(userDocs, {
                owner: user.email,
                title: todo.todoInput
            }).then(async (doc) => {
                const docId = doc.id;
                await setDoc(userDoc, {
                    todoList: {
                        [docId]: {
                            todoTitle: todo.todoInput,
                            isCompleted: false
                        }
                    }
                }, { merge: true })
            })
            await batch.commit();
            setTodo({
                todoInput: ''
            });
            return router.push('/add-todo');
        }
    };

    function parseData(data: DocumentData[]): TodoProps[] {
        const result: TodoProps[] = [];

        data.forEach((doc) => {
            result.push({
                owner: doc.owner,
                title: doc.title
            });
        });

        return result;
    }

    useEffect(() => {
        const getData = async () => {
            const controller = new AbortController();
            try {
                // const query = await getDocs(collection(db, 'todos'));
                // const data = query.docs.map((doc: DocumentData) => ({
                //     ...doc.data()
                // }));
                if (user) {
                    const currentUserData = query(userDocs, where("owner", "==", user.email));
                    const snapshot = await getDocs(currentUserData);
                    const snapData = snapshot.docs.map((doc) => ({
                        ...doc.data()
                    }));
                    const dataParser = parseData(snapData);
                    setTodoData(dataParser);
                }
            } catch (error) {
                if (typeof Error === error) {
                    return error;
                }
            }
            return () => controller.abort();
        }
        getData();
    }, []);

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
                        {todoData.map((todo: TodoProps, i: number) => {
                            return (
                                <div className={styles['todo__card']} key={i}>
                                    <input
                                        className={styles['todo__radio__btn']}
                                        type="radio"
                                        id="radio-input" />
                                    {todo.title}
                                </div>
                            )
                        })}
                        <p className={styles['todo__card_paragraph']}>Drag and drop to reorder list</p>
                    </div>
                </div>
                <div className={styles['todo__alt__image']}></div>
            </section>
        </>
    )
}

export default AddTodo