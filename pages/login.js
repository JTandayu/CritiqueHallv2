import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import styles from '../styles/Login.module.css'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import Home from './home'
import Link from 'next/link'
import Logo from '../public/critiquehall2.png'

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}

export default function Login() {
    return (
      <div className={styles.container} >
        <Head>
          <title>Log-In to Critique Hall</title>
          <meta name="description" content="Critique Hall by create next app" />
          <link rel="icon" href="/logo256.png" onLoad=""/>
        </Head>
  
        <motion.main className={styles.main} 
          animate = {{y: 0 , opacity: 1}}
          initial = {{y: -70, opacity: 0}}
          transition ={{duration: .7}}
          >
            <div className={styles.logo}>
            <Link href="/"><Image src={Logo}></Image></Link>
            </div>

            <form id="login" action="/home">
                <input placeholder="Username" className={styles.input_box} type="text"/>
                <br/>
                <input placeholder="Password" className={styles.input_box} type="password"/>
                <br/>
                <button type="submit" className={styles.login_button}>Login</button>
            </form>

            <p className={styles.register}>
              <p><Link href="./forgot-password"><a>Forgot Password?</a></Link></p>
              <p><Link href="./register"><a>New User?</a></Link></p>
            </p>

        </motion.main>

      </div>
    )
  }
 function CheckLogin(param) {


   }