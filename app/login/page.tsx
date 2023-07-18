import React from 'react'
import { Metadata } from "next"
import styles from './styles.module.css'

export const metadata: Metadata = {
    title: 'Login'
};

const Login = () => {
    return (
        <div className={styles['main__login__page']}>
            <div className={styles['main__login__page__header']}>
                <h1>Sign In</h1>
            </div>
        </div>
    )
}

export default Login