import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import styles from '../styles/AdminLogin.module.css'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
// import Home from './home'
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


export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}

export default function AdminLogin() {
    return (
      <div className={styles.container} >
        <Head>
          <title>Admin Login</title>
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
            
            <Heading mb={2} as="h2" size="lg">Admin Login</Heading>
            <br />
            <center><FormControl id="loginform" isRequired>
              <FormLabel>Username</FormLabel>
                <input placeholder="Username" className={styles.input_box} type="text"/>
                <br/>
              <FormLabel>Password</FormLabel>
                <input placeholder="Password" className={styles.input_box} type="password"/>
                <br/>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  >
                <VStack direction="row" spacing={8} align="center">
                <Button className={styles.LoginButton} colorScheme="yellow" type="submit" size="lg">Login</Button>
                </VStack>
                </motion.button>
            </FormControl></center>

            {/* <p className={styles.register}>
              <p><Link href="./forgot-password"><a>Forgot Password?</a></Link></p>
              <p><Link href="./register"><a>New User?</a></Link></p>
            </p> */}

        </motion.main>

      </div>
    )
  }
 function CheckLogin(param) {


   }