import React from 'react'
import styles from './styles.module.css'
import Link from 'next/link'

const Navigation = () => {
    return (
        <div className={styles['top__navbar__left']}>
            <Link href='/' className={styles['top__navbar__home']}>Todo-List</Link>
            <div className={styles['top__navbar__right']}>
                <Link href='/add' className={styles['top__navbar__add']}>Add Todo</Link>
                <Link href='/login' className={styles['top__navbar__login']}>Login</Link>
                <Link href='/register' className={styles['top__navbar__register']}>Register</Link>
            </div>
        </div>
    )
}
export default Navigation