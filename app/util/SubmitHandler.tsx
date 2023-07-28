import React, { useState } from 'react'
import styles from '../my-todos/styles.module.css'
import { runEmptyFieldError } from '../alerts/onSuccess';
import { auth, db } from '../firebase/config';
import { addDoc, collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const SubmitHandler: React.FC = () => {
    const router = useRouter();
    const userDocs = collection(db, 'todos');
    const batch = writeBatch(db);

    const [todo, setTodo] = useState({
        todoInput: ''
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo({
            ...todo,
            [e.target.name]: e.target.value
        });
    };

    const handleTodoSubmit = async () => {
        if (todo.todoInput === '') {
            runEmptyFieldError();
            return;
        };

        if (auth.currentUser) {
            const userDoc = doc(db, 'users', auth.currentUser.uid);

            await addDoc(userDocs, {
                owner: auth.currentUser.email,
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
            return router.push('/my-todos');
        }
    };

    return (
        <>
            <input
                className={styles['todo__main__input']}
                type="text"
                placeholder='Add task'
                name='todoInput'
                onChange={handleInput}
                value={todo.todoInput}
            />
            <button className={styles['todo__add__button']} onClick={handleTodoSubmit}>+</button>
        </>
    )
}

export default SubmitHandler