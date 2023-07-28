'use client'

import React from 'react'
import styles from '../components/Navigation/styles.module.css'
import Link from 'next/link'

const GuestNavigation: React.FC = () => {

    return (
        <>
            <div className={styles['top__navbar__left']}>
                <Link href='/' className={styles['top__navbar__home']}>Todo-List</Link>
                <div className={styles['top__navbar__right']}>
                    <Link href='/login' className={styles['top__navbar__login']}>Login</Link>
                    <Link href='/register' className={styles['top__navbar__register']}>Register</Link>
                </div>
            </div>
        </>
    )
}

export default GuestNavigation