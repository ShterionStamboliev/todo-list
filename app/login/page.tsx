"use client"

import React, { useState, useEffect } from 'react'
import { Metadata } from "next"
import styles from './styles.module.css'
import { Button, TextField } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import signIn from '../auth/userSignIn'

export const metadata: Metadata = {
    title: 'Login'
};

const Login = () => {
    const router = useRouter();
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState<string>('');

    const handleUserData = (e: any) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleForm = async (e: any) => {
        e.preventDefault();

        try {
            if (!userData.password) {
                return setError('Invalid user data')
            };
            if (!userData.email) {
                return setError('Invalid user data')
            };
            if (userData.password === '') {
                return setError('Invalid user data')
            };
            if (userData.email === '') {
                return setError('Invalid user data')
            };
            
            await signIn(userData.email, userData.password);
            setError('Welcome');
            return router.push('/');
        } catch (error) {
            return setError('Password mismatch')
        }
    }

    return (
        <div className={styles['main__login__page']}>
            <div className={styles['main__login__page__header']}>
                <h1>Sign In</h1>
            </div>

            <section className={styles['main__login__page__section']}>
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
                    <p className={styles['main__login__page__signin_link']}>Don't have an account? <Link href='/register'>Register</Link>
                    </p>
                </div>
            </section>
        </div>
    )
}

export default Login