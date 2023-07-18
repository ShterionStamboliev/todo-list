"use client"

import React, { useState, useEffect } from 'react'
import { Metadata } from "next"
import styles from './styles.module.css'
import { Button, TextField } from '@mui/material';

export const metadata: Metadata = {
    title: 'Login'
};

const Login = () => {

    const [userData, setUserData] = useState({
        username: '',
        password: ''
    });


    const handleUserData = (e: any) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className={styles['main__login__page']}>
            <div className={styles['main__login__page__header']}>
                <h1>Sign In</h1>
            </div>

            <section className={styles['main__login__page__section']}>
                <div className={styles['main__login__page__inputs']}>
                    <TextField
                        id="standard-basic"
                        label="Username"
                        variant="standard"
                        name='username'
                        value={userData.username}
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
                    variant="contained">
                    Login
                </Button>
            </section>
        </div>
    )
}

export default Login