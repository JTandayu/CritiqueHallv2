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
            <Link href="/home">
                <Image src={Logo}></Image>
            </Link>
        </div>
        <nav>
            <button className={styles.nav_button}></button>
            <ul>
                <li><Link href="/home"><a>Home</a></Link></li>
                <li><Link href=""><a>Critique</a></Link></li>
                <li><Link href=""><a>Feedback</a></Link></li>
                {/* Profile will be changed into a dropdown with AccName as label */}
                <li><Link href=""><a>Profile</a></Link></li>
            </ul>
        </nav>
    </div>
    )
}

