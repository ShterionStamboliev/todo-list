import React from 'react'
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'
import { runSignOutAlert } from '../alerts/onSuccess';
import { useRouter } from 'next/navigation';
import styles from '../../app/components/Navigation/styles.module.css'

const Logout = () => {

    const router = useRouter();

    const signOutUser = () => {
        signOut(auth)
            .then(() => {
                runSignOutAlert();
                router.push('/');
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    return (
        <button onClick={signOutUser} className={styles['top__navbar__logout_btn']}>Logout</button>
    )
}

export default Logout