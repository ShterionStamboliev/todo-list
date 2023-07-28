import React, { useEffect, useState } from 'react'
import { parseData } from '../parsers/data';
import { auth, db } from '../firebase/config';
import {
    DocumentData,
    collection,
    getDocs,
    query,
    where
} from 'firebase/firestore';
import LoadingSpinner from '../components/Navigation/LoadingSpinner';
import styles from '../my-todos/styles.module.css'

const TodoFetcher: React.FC<TodoProps> = () => {

    const [todoData, setTodoData] = useState<TodoProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const todoCollection = collection(db, 'todos');

    const getData = async () => {
        try {
            if (auth.currentUser) {
                const currentUserData = query(todoCollection, where("owner", "==", auth.currentUser.email));
                const snapshot = await getDocs(currentUserData);
                const snapData = snapshot.docs.map((doc: DocumentData) => ({
                    ...doc.data()
                }));
                const dataParser = parseData(snapData);
                setTodoData(dataParser);
                setIsLoading(false);
            }
        } catch (error) {
            if (typeof Error === error) {
                return error;
            };
        };
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={styles['todo__tasks__container']}>
            {isLoading ? <LoadingSpinner /> : todoData.map((todo: TodoProps, i: number) => {
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
    )
}

export default TodoFetcher;