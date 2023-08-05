'use client'

import { FunctionComponent } from "react";
import styles from '../../register/styles.module.css'
import Link from 'next/link';
import UserRegistration from "@/app/util/UserRegistration";


const Register: FunctionComponent = () => {

    return (
        <section className={styles['main__register__page__section']}>
            <div className={styles['main__register__page__inputs']}>
                <UserRegistration />
            </div>

            <div className={styles['main__register__page__login_redirect']}>
                <p className={styles['main__register__page__login_link']}>Already have an account? <Link href='/login'>Log in</Link> </p>
            </div>
        </section>
    )
}

export default Register