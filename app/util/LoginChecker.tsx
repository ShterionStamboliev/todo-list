import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { runEmptyFieldError, runInvalidInputData, runSuccessfulLogin } from '../alerts/onSuccess';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { Button, TextField } from '@mui/material';
import styles from '../components/Navigation/styles.module.css'
import Link from 'next/link';

const LoginChecker = () => {
    const router = useRouter();
    const [userData, setUserData] = useState({
        email: '',
        password: ''
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
            if (!userData.password) {
                return runInvalidInputData();
            };
            if (!userData.email) {
                return runInvalidInputData();
            };
            if (userData.password === '') {
                return runEmptyFieldError();
            };
            if (userData.email === '') {
                return runEmptyFieldError();
            };

            signInWithEmailAndPassword(auth, userData.email, userData.password)
                .then(() => {
                    runSuccessfulLogin();
                    return router.push('/');
                });
        } catch (error) {
            return runInvalidInputData();
        }
    }
    return (
        <>
            <div className={styles['main__login__page__inputs']}>
                <TextField
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    name='email'
                    value={userData.email}
                    onChange={handleUserData}
                    className={styles['main__login__page__username']} />
                <TextField
                    id="standard-basic"
                    label="Password"
                    variant="standard"
                    name='password'
                    type='password'
                    value={userData.password}
                    onChange={handleUserData}
                    className={styles['main__login__page__password']} />
            </div>
            <Button
                className={styles['main__login__page__sign_in']}
                variant="contained"
                onClick={handleForm}>
                Login
            </Button>
            <div className={styles['main__login__page__signin_redirect']}>
                <p className={styles['main__login__page__signin_link']}>
                    Don't have an account? <Link href='/register'>Register</Link>
                </p>
            </div>
        </>
    )
}

export default LoginChecker