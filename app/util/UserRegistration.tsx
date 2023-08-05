import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { runPasswordError, runSuccessfulRegistration } from '../alerts/onSuccess';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { Button, TextField } from '@mui/material';
import styles from '../register/styles.module.css'

const UserRegistration = () => {
    const router = useRouter();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        repeatPassword: ''
    });

    const handleUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleForm = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();

        try {
            if (userData.password !== userData.repeatPassword) {
                return runPasswordError();
            }
            createUserWithEmailAndPassword(auth, userData.email, userData.password)
                .then((userCredentials) => {
                    const user = userCredentials.user;
                    const docRef = doc(db, 'users', user.uid);
                    setDoc(docRef, {
                        email: userData.email,
                        createdOn: new Date().toLocaleDateString(),
                        todoList: []
                    }).then(() => {
                        runSuccessfulRegistration();
                        return router.push('/');
                    })
                });
        } catch (error: any) {
            if (typeof Error === error) {
                return error.message
            }
        }
    };
    return (
        <>
            <TextField
                id="standard-basic"
                label="Email"
                variant="standard"
                name='email'
                value={userData.email}
                onChange={handleUserData}
                className={styles['main__register__page__username']}
            />
            <TextField
                id="standard-basic"
                label="Password"
                variant="standard"
                name='password'
                type='password'
                value={userData.password}
                onChange={handleUserData}
                className={styles['main__register__page__password']}
            />
            <TextField
                id="standard-basic"
                label="Confirm password"
                variant="standard"
                name='repeatPassword'
                type='password'
                value={userData.repeatPassword}
                onChange={handleUserData}
                className={styles['main__register__page__re__password']}
            />
            <Button
                className={styles['main__register__page__sign_in']}
                variant="contained"
                onClick={handleForm}>
                Submit
            </Button>
        </>
    )
}

export default UserRegistration