import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase/config';
import {
    DocumentData,
    collection,
    getDocs,
    query,
    where,
} from 'firebase/firestore';
import LoadingSpinner from '../components/Navigation/LoadingSpinner';
import styles from '../my-todos/styles.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { handleDeleteTodo } from '../helpers/todoDelete';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

const TodoFetcher: React.FC<TodoProps> = () => {

    const [todoData, setTodoData] = useState<TodoProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [todoPerPage, setTodoPerPage] = useState<number | any>(5);
    const [currentPage, setCurrentPage] = useState<number | any>(1);

    useEffect(() => {
        getData();
    }, []);

    const todoCollection = collection(db, 'todos');

    const numberOfTodoPages = Math.ceil(todoData.length / todoPerPage);
    const todoPages: number[] = [...Array(numberOfTodoPages + 1).keys()].slice(1);
    const lastTodoIndex = currentPage * todoPerPage;
    const firstTodoIndex = lastTodoIndex - todoPerPage;

    const onPageTodos = todoData.slice(firstTodoIndex, lastTodoIndex);

    const prevPageHandler = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        };
    };

    const nextPageHandler = () => {
        if (currentPage !== numberOfTodoPages) {
            setCurrentPage(currentPage + 1);
        };
    };

    const handlePageChange = (event: SelectChangeEvent) => {
        setTodoPerPage(event.target.value as string);
    };

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

    return (
        <>
            <Box sx={{ maxWidth: 170 }}>
                <FormControl sx={{ minWidth: 170 }}>
                    <InputLabel>Show</InputLabel>
                    <Select
                        label="Todo"
                        onChange={handlePageChange}
                    >
                        <MenuItem value={5}>Five</MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <div className={styles['todo__tasks__container']}>
                {isLoading ?
                    <LoadingSpinner /> :
                    onPageTodos.map((todo: TodoProps, i: number) => (
                        (
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
                    ))}
                {/* <p className={styles['todo__card_paragraph']}>Drag and drop to reorder list</p> */}
            </div>

            <div className={styles['todo__paginator']}>
                <button onClick={prevPageHandler} className={styles['page__btn_changer']}>Prev</button>
                {todoPages.map((page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? styles['todo__page_btn'] : styles['todo__cursor_page']}>{page}</button>
                )))}
                <button onClick={nextPageHandler} className={styles['page__btn_changer']}>Next</button>
            </div>
        </>
    )
}

export default TodoFetcher;