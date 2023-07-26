'use client'

import React, { useContext } from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import Logout from '@/app/logout/page'
import { AuthContext } from '@/app/context/AuthContext'

const Navigation = () => {

    const user = useContext(AuthContext);

    return (
        <>
            {user === null
                ?
                <div className={styles['top__navbar__left']}>
                    <Link href='/' className={styles['top__navbar__home']}>Todo-List</Link>
                    <div className={styles['top__navbar__right']}>
                        {/* <Link href='/add' className={styles['top__navbar__add']}>Add Todo</Link> */}
                        <Link href='/login' className={styles['top__navbar__login']}>Login</Link>
                        <Link href='/register' className={styles['top__navbar__register']}>Register</Link>
                    </div>
                </div>
                :
                <div className={styles['top__navbar__left']}>
                    <Link href='/' className={styles['top__navbar__home']}>Todo-List</Link>
                    <div className={styles['top__navbar__right']}>
                        <Link href='/add-todo' className={styles['top__navbar__add']}>Add Todo</Link>
                        {/* <Link href='/login' className={styles['top__navbar__login']}>Login</Link> */}
                        {/* <Link href='/register' className={styles['top__navbar__register']}>Register</Link> */}
                        {/* <Link href='/register' className={styles['top__navbar__register']}>Register</Link> */}
                        <p className={styles['top__navbar__user']}>{`Logged in as ${user?.email}`}</p>
                        <Logout />
                    </div>
                </div>
            }
        </>
    )
}

export default Navigation