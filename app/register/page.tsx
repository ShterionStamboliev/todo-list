import { Metadata } from "next"
import styles from './styles.module.css'
import Register from "../components/Navigation/Register";

export const metadata: Metadata = {
    title: 'Register'
};

const RegisterPage = () => {

    return (
        <div className={styles['main__register__page']}>
            <div className={styles['main__register__page__header']}>
                <h1>Register</h1>
            </div>
            <Register />
        </div>
    )
}

export default RegisterPage