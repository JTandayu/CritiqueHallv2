import Head from 'next/head'
import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import Logo from "@public/critiquehall2.png";
import styles from "@styles/AdminDashboard.module.css";
// import { AdminNav } from "@component/adminnav";

// export async function getStaticProps(context) {
//     return {
//       props: {}, // will be passed to the page component as props
//     }
//   }

export default function AdminDashboard() {
    return (
        <div className={styles.container}>
            <Head>
            <title>Critique Hall - Admin Dashboard</title>
            <link rel="icon" href="/logo256.png" onLoad=""/>
            </Head>
        </div>
    )
}

// Work in Progress