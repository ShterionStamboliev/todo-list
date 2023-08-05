'use client'

import React, { useContext } from 'react'
import styles from '../components/Navigation/styles.module.css'
import Link from 'next/link'
import Logout from '@/app/logout/page'
import { AuthContext } from '@/app/context/AuthContext'

const UserNavigation: React.FC = () => {

    const user = useContext(AuthContext);

    return (
        <>
            <div className={styles['top__navbar__left']}>
                <Link href='/' className={styles['top__navbar__home']}>ListiFY</Link>
                <div className={styles['top__navbar__right']}>
                    <p className={styles['top__navbar__user']}>{`Logged in as ${user?.email}`}</p>
                    <Link href='/my-todos' className={styles['top__navbar__add']}>My todos</Link>
                    <Logout />
                </div>
            </div>
        </>
    )
}

export default UserNavigation