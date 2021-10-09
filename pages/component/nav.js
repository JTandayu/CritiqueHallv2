import Head from 'next/head'
import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import styles from '../../styles/component/Nav.module.css'
import Link from 'next/link'


export default function Nav(){
    return(
    <div className={styles.container}>
        <ul>
            <li><Link href=""><a>Home</a></Link></li>
            <li><Link href=""><a>Critique</a></Link></li>
            <li><Link href=""><a>Feedback</a></Link></li>
            <li></li>
        </ul>
    </div>
    )
}

