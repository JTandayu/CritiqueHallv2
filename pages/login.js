import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import styles from "@styles/Login.module.css";
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import Home from './home'
import Link from 'next/link'
import Logo from "@public/critiquehall.png";
import Discussions from "@public/discussions.png";
import { Button, ButtonGroup, Center, Text } from "@chakra-ui/react"
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
import { ColorModeScript, useColorModeValue } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react';
import cookie from "react-cookie";
import { useCookies } from 'react-cookie'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const MotionButton = motion(Button)

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
})



export default function Login({user}) {
  const { API_URL } = process.env
  const { API_KEY } = process.env

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [cookies, setCookies, removeCookies] = useCookies(['token', 'id', 'encrypted_id'])


    const submitLogin = async () =>{

      let formData = new FormData(); 
      formData.append('email', email);   //append the values with key, value pair
      formData.append('password', password);


      const config = {
        headers: { 
          'content-type': 'multipart/form-data',
          'X-API-KEY': `${API_KEY}`,
          'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
          // 'Accept-Encoding': 'gzip, deflate, br',
          'Accept': 'application/json',
        }
      }

      axios.post(`${API_URL}/api/login`, formData, config)
      .then(response => {
          console.log(response.data);
          setCookies('token', response.data.token)
          setCookies('display_name', response.data.display_name)
          // setCookies('id', response.data.id)
          setCookies('encrypted_id', response.data.encrypted_id)
          setCookies('profile_pic', response.data.profile_pic)
          document.getElementById('warning1').hidden=true;
          window.location.href = "/home"
      })
      .catch(error => {
          console.log(error);
          document.getElementById('warning1').removeAttribute('hidden');
          // window.location.href = "/login"
      });
    }

    

    return (
      <div className={styles.container} >
        <Head>
          <title>Critique Hall | Login</title>
          <meta name="description" content="Critique Hall by create next app" />
          <link rel="icon" href="/logo256.png" onLoad=""/>
        </Head>
  
        <Box as='main' bg={useColorModeValue('white', '#212121')} w={{lg: '100ch' , md: '100%' , sm: '100%' }} className={styles.main} 
          // animate = {{y: 0 , opacity: 1}}
          // initial = {{y: -70, opacity: 0}}
          // transition ={{duration: .7}}
          >
            <div className={styles.logo}>
            <Link href="/" passHref><Image src={Logo} 
             alt="Critique Hall Logo"></Image></Link>
            </div>
            
            <Heading mb={5} as="h2" size="lg" color={useColorModeValue('#1B1464')}>LOG-IN</Heading>
            <Box id='warning1' bg='red.100' w='30%' h='5vh' border='1px solid red' rounded='md' mb={4} mt={2} hidden>
              <Center>
                <Text mt='1vh'>Incorrect Email or Password</Text>
              </Center>
            </Box>
            <center><FormControl id="loginform" isRequired>
              <FormLabel>iACADEMY Email</FormLabel>
                <input id="email" value={email} className={styles.input_box} type="email" onChange={e => setEmail(e.target.value)}/>
                {/* <input placeholder="Username" id="email" value={email} className={styles.input_box} type="email" /> */}
                <br/>
                <br/>
              <FormLabel>Password</FormLabel>
                <input id="password" value={password} className={styles.input_box} type="password" onChange={e => setPassword(e.target.value)}/>
                {/* <input placeholder="Password" id="password" value={password} className={styles.input_box} type="password"/> */}
                <br/>
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
                  onClick={submitLogin}
                  > LOG-IN </MotionButton>
                  {/* <MotionButton
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={styles.LoginButton} 
                  colorScheme="messenger" 
                  type="submit" 
                  size="lg"
                  >
                  <Link href="/home">Login</Link>
                </MotionButton> */}
                </VStack>
            </FormControl></center>

            <p className={styles.register2}>
              <p>New User? <Link href="./register" passHref><a className={styles.signUpText}>Sign Up Now!</a></Link></p>
            </p>
            
        </Box>
      </div>
    )
  }