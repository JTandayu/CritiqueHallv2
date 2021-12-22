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
import { useState } from 'react';

const MotionButton = motion(Button)

// export async function getServerSideProps(){
//   const { API_URL } = process.env

//   const res = await fetch(`${API_URL}/api/login`)
//   const data = await res.json()

//   return {
//     props: { 
//       status: data
//     },
//   }
// }



export default function Login({user}) {
  const { API_URL } = process.env
  const { API_KEY } = process.env

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



    // const submitLogin = async () =>{
    //   const response =  await fetch(`${API_URL}/api/login`,  {
    //     method: 'POST',
    //     body: JSON.stringify({email, password}),
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'X-API-KEY': `${API_KEY}`
    //     },
    //   })
    //   const data = await response.json()
    //   console.log(data)
    // }

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
                {/* <input placeholder="Username" id="email" value={email} className={styles.input_box} type="email" onChange={e => setEmail(e.target.value)}/> */}
                <input placeholder="Username" id="email" value={email} className={styles.input_box} type="email" />
                <br/>
              <FormLabel>Password</FormLabel>
                {/* <input placeholder="Password" id="password" value={password} className={styles.input_box} type="password" onChange={e => setPassword(e.target.value)}/> */}
                <input placeholder="Password" id="password" value={password} className={styles.input_box} type="password"/>
                <br/>
                <p className={styles.register}>
                <p><Link href="./forgot-password"><a>Forgot Password?</a></Link></p>
                </p>
                <VStack direction="row" spacing={8} align="center">
                {/* <MotionButton
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={styles.LoginButton} 
                  colorScheme="messenger" 
                  type="submit" 
                  size="lg"
                  onClick={submitLogin}
                  ></MotionButton> */}
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