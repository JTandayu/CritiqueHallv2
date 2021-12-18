import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import styles from "@styles/Login.module.css";
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import Home from './home'
import Link from 'next/link'
import Logo from "@public/critiquehall2.png";
import { Button, ButtonGroup } from "@chakra-ui/react"
import { Stack, HStack, VStack } from "@chakra-ui/react"
import { Heading } from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react"
import { GetStaticProps } from 'next'

const MotionButton = motion(Button)

// export const getServerSideProps = withSession(async function ({ req, res }) {
//   if (!req.session.user) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: { user },
//   }
// })


export default function Login({user}) {
    return (
      <div className={styles.container} >
        <Head>
          <title>Login to Critique Hall</title>
          <meta name="description" content="Critique Hall by create next app" />
          <link rel="icon" href="/logo256.png" onLoad=""/>
        </Head>
  
        <main className={styles.main} 
          // animate = {{y: 0 , opacity: 1}}
          // initial = {{y: -70, opacity: 0}}
          // transition ={{duration: .7}}
          >
            <div className={styles.logo}>
            <Link href="/"><Image src={Logo} 
            alt="Critique Hall Logo"></Image></Link>
            </div>
            
            <Heading mb={2} as="h2" size="lg">Login</Heading>
            <center><FormControl id="loginform" isRequired>
              <FormLabel>Email Address</FormLabel>
                <input placeholder="Username" id="email" className={styles.input_box} type="email"/>
                <br/>
              <FormLabel>Password</FormLabel>
                <input placeholder="Password" id="password" className={styles.input_box} type="password"/>
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
                  {/* Login */}
                </MotionButton>
                </VStack>
            </FormControl></center>

            <p className={styles.register2}>
              <p>New User? <Link href="./register"><a className={styles.signUpText}>Sign Up Now!</a></Link></p>
            </p>

        </main>
      </div>
    )
  }
  
 function CheckLogin(param) {


   }