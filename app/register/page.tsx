"use client"

import React, { useState } from 'react'
import { Metadata } from "next"
import styles from './styles.module.css'
import { Button, TextField } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import signUp from '../auth/UserSignUp';
import { runSuccessfulRegistration, runPasswordError } from '../alerts/onSuccess';

export const metadata: Metadata = {
    title: 'Register'
};

const Register = () => {
    const router = useRouter();
    const [error, setError] = useState<string>('');
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

    const handleForm = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();

        try {
            if (userData.password !== userData.repeatPassword) {
                return runPasswordError();
            }
            await signUp(userData.email, userData.password)
                .then(() => {
                    runSuccessfulRegistration();
                });
            setError('Welcome');
            return router.push('/');
        } catch (error) {
            return setError('Password mismatch')
        }
    };

    return (
        <div className={styles['main__register__page']}>
            <div className={styles['main__register__page__header']}>
                <h1>Register</h1>
            </div>

            <section className={styles['main__register__page__section']}>
                <div className={styles['main__register__page__inputs']}>
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
                </div>
                <Button
                    className={styles['main__register__page__sign_in']}
                    variant="contained"
                    onClick={handleForm}>
                    Submit
                </Button>
                <div className={styles['main__register__page__login_redirect']}>
                    <p className={styles['main__register__page__login_link']}>Already have an account? <Link href='/login'>Log in</Link> </p>
                </div>
            </section>
        </div>
    )
}

export default Register