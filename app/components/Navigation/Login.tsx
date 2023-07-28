'use client'

import React, { FunctionComponent } from 'react'
import { Metadata } from "next"
import styles from '../../login/styles.module.css'
import LoginChecker from '@/app/util/LoginChecker';

export const metadata: Metadata = {
    title: 'Login'
};

const Login: FunctionComponent = () => {

    return (
        <section className={styles['main__login__page__section']}>
            <LoginChecker />
        </section>
    )
}

export default Login