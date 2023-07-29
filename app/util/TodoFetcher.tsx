import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase/config';
import {
    DocumentData,
    collection,
    getDocs,
    query,
    where,
    doc,
    deleteDoc,
    updateDoc,
    deleteField,
    setDoc
} from 'firebase/firestore';
import LoadingSpinner from '../components/Navigation/LoadingSpinner';
import styles from '../my-todos/styles.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { runTodoDeleteSuccess } from '../alerts/onSuccess';

const TodoFetcher: React.FC<TodoProps> = () => {

    const [todoData, setTodoData] = useState<TodoProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const todoCollection = collection(db, 'todos');


    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            if (auth.currentUser) {
                const docData: TodoProps[] = [];
                const currentUserData = query(todoCollection, where("owner", "==", auth.currentUser.email));
                await getDocs(currentUserData).then((res) => {
                    res.forEach((doc: DocumentData) => {
                        docData.push({
                            ...doc.data(),
                            id: doc.id,
                        });
                    });
                });
                setTodoData(docData);
                setIsLoading(false);
            }
        } catch (error) {
            if (typeof Error === error) {
                return error;
            };
        };
    };

    const handleDeleteTodo = (id: any) => {
        if (auth.currentUser) {
            const userRef = doc(db, 'users', auth.currentUser.uid);
            deleteDoc(doc(db, 'todos', id)).then(async () => {
                await setDoc(userRef, {
                    todoList: {
                        [id]: deleteField()
                    }
                }, { merge: true });
            }
            )
        }
        runTodoDeleteSuccess();
    };

    return (
        <div className={styles['todo__tasks__container']}>
            {isLoading ?
                <LoadingSpinner /> :
                todoData.map((todo: TodoProps, i: number) => {
                    return (
                        <div className={styles['todo__card']} key={i}>
                            <input
                                className={styles['todo__radio__btn']}
                                type="radio"
                                id="radio-input"
                            />
                            {todo.title}
                            <button
                                onClick={() => handleDeleteTodo(todo.id)}
                                className={styles['todo__delete_btn']}>
                                <DeleteIcon />
                            </button>
                        </div>
                    )
                })}
            <p className={styles['todo__card_paragraph']}>Drag and drop to reorder list</p>
        </div>
    )
}

export default TodoFetcher;