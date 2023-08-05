'use client'

import React from 'react'
import styles from './styles.module.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from 'next/link';

const Footer = () => {

    return (
        <div className={styles['page_footer']}>
                Shterion Stamboliev @ 2023 <Link href={'https://github.com/ShterionStamboliev'} className={styles['footer__github_link']}><GitHubIcon /> </Link>
        </div>
    )
}

export default Footer