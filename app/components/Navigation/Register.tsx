'use client'

import { FunctionComponent, useState } from "react";
import styles from '../../register/styles.module.css'
import { Button, TextField } from '@mui/material';
import Link from 'next/link';
import { db, auth } from '../../firebase/config';
import { useRouter } from 'next/navigation';
import { runSuccessfulRegistration, runPasswordError } from '../../alerts/onSuccess';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Register: FunctionComponent = () => {
    const router = useRouter();
    const [error, setError] = useState<string>('');
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        repeatPassword: ''
    });

    const handleUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleForm = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();

        try {
            if (userData.password !== userData.repeatPassword) {
                return runPasswordError();
            }
            createUserWithEmailAndPassword(auth, userData.email, userData.password)
                .then((userCredentials) => {
                    const user = userCredentials.user;
                    const docRef = doc(db, 'users', user.uid);
                    setDoc(docRef, {
                        email: userData.email,
                        createdOn: new Date().toLocaleDateString(),
                        todoList: []
                    }).then(() => {
                        runSuccessfulRegistration();
                        setError('Welcome');
                        return router.push('/');
                    })
                });
        } catch (error) {
            return setError('Password mismatch')
        }
    };

    return (
        <section className={styles['main__register__page__section']}>
            <div className={styles['main__register__page__inputs']}>
                <TextField
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    name='email'
                    value={userData.email}
                    onChange={handleUserData}
                    className={styles['main__register__page__username']}
                />
                <TextField
                    id="standard-basic"
                    label="Password"
                    variant="standard"
                    name='password'
                    type='password'
                    value={userData.password}
                    onChange={handleUserData}
                    className={styles['main__register__page__password']}
                />
                <TextField
                    id="standard-basic"
                    label="Confirm password"
                    variant="standard"
                    name='repeatPassword'
                    type='password'
                    value={userData.repeatPassword}
                    onChange={handleUserData}
                    className={styles['main__register__page__re__password']}
                />
            </div>
            <Button
                className={styles['main__register__page__sign_in']}
                variant="contained"
                onClick={handleForm}>
                Submit
            </Button>
            <div className={styles['main__register__page__login_redirect']}>
                <p className={styles['main__register__page__login_link']}>Already have an account? <Link href='/login'>Log in</Link> </p>
            </div>
        </section>
    )
}

export default Register