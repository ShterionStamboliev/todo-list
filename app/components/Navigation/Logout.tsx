'use client'

import React, { FunctionComponent } from 'react'
import { auth } from '../../firebase/config'
import { signOut } from 'firebase/auth'
import { runSignOutAlert } from '../../alerts/onSuccess';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css'

const Logout: FunctionComponent = () => {

    const router = useRouter();

    const signOutUser = () => {
        signOut(auth)
            .then(() => {
                runSignOutAlert();
                router.push('/');
            })
            .catch((error) => {
                return error.message;
            })
    };

    return (
        <button onClick={signOutUser} className={styles['top__navbar__logout_btn']}>Logout</button>
    )
}

export default Logout