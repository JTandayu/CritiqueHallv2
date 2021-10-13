import Head from 'next/head'
import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import Layout from './layout/layout'
import styles from "@styles/Home.module.css";

export default function Home(){
    return(
        <div className={styles.container}>
        <Head>
        <title>Home</title>
        <meta name="description" content="Critique Hall generated by Next App" />
        <link rel="icon" href="/logo256.png" onLoad=""/>
        </Head>
        
            
        </div>
    )
}

