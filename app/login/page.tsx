import { Metadata } from "next"
import styles from './styles.module.css'
import Login from "../components/Navigation/Login";

export const metadata: Metadata = {
    title: 'Login'
};

const LoginPage = () => {

    return (
        <div className={styles['main__login__page']}>
            <div className={styles['main__login__page__header']}>
                <h1>Sign In</h1>
            </div>
            <Login />
        </div>
    )
}

export default LoginPage