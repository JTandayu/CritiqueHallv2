import Head from 'next/head'
import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import styles from '../../styles/component/Nav.module.css'
import Link from 'next/link'
import Logo from '../../public/critiquehall2.png'


export default function Nav(){
    return(
    <div className={styles.container}>
        <div className={styles.logo}>
                <Image src={Logo}></Image>
        </div>
        <ul className={styles.nav}>
            <li><Link href=""><a>Home</a></Link></li>
            <li><Link href=""><a>Critique</a></Link></li>
            <li><Link href=""><a>Feedback</a></Link></li>
            <li><Link href=""><a>Profile</a></Link></li>
        </ul>
    </div>
    )
}

