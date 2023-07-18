import React from 'react'
import { Metadata } from "next"
import styles from './styles.module.css'

export const metadata: Metadata = {
    title: 'Login'
};

const Login = () => {
    return (
        <div className={styles['main__login__page']}>
            This is the Login page
        </div>
    )
}

export default Login