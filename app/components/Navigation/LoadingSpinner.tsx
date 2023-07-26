import React from 'react'
import styles from './styles.module.css'

const LoadingSpinner = () => {
    return (
        <div className={styles['loading__spinner__container']}>
            <div className={styles['loading__spinner']}></div>
        </div>
    );
};

export default LoadingSpinner;