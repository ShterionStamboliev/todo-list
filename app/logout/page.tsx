import React, { useContext } from 'react'
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'
import { AuthContext } from '../context/AuthContext';
import { runSignOutAlert } from '../alerts/onSuccess';
import { useRouter } from 'next/navigation';
import styles from '../components/Navigation/styles.module.css'

const Logout = () => {

    const user = useContext(AuthContext);
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