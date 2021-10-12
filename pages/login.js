import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import styles from '../styles/Login.module.css'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import Home from './home'
import Link from 'next/link'
import Logo from '../public/critiquehall2.png'
import { Button, ButtonGroup } from "@chakra-ui/react"
import { Stack, HStack, VStack } from "@chakra-ui/react"
import { Heading } from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react"

const MotionButton = motion(Button)

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
            <Link href="/"><Image src={Logo} 
            alt="Critique Hall Logo"></Image></Link>
            </div>
            
            <Heading mb={2} as="h2" size="lg">Login</Heading>
            <center><FormControl id="loginform" isRequired>
              <FormLabel>Username</FormLabel>
                <input placeholder="Username" className={styles.input_box} type="text"/>
                <br/>
              <FormLabel>Password</FormLabel>
                <input placeholder="Password" className={styles.input_box} type="password"/>
                <br/>
                <p className={styles.register}>
                <p><Link href="./forgot-password"><a>Forgot Password?</a></Link></p>
                </p>
                <VStack direction="row" spacing={8} align="center">
                <MotionButton
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={styles.LoginButton} 
                  colorScheme="messenger" 
                  type="submit" 
                  size="lg"
                  >
                  <Link href="/home">Login</Link>
                </MotionButton>
                </VStack>
            </FormControl></center>

            <p className={styles.register2}>
              <p>New User? <Link href="./register"><a className={styles.signUpText}>Sign Up Now!</a></Link></p>
            </p>

        </motion.main>
      </div>
    )
  }
  
 function CheckLogin(param) {


   }