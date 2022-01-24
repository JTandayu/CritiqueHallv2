import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import styles from "@styles/Login.module.css";
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import Home from './home'
import Link from 'next/link'
// import Logo from "@public/critiquehall.png";
import Discussions from "@public/discussions.png";
import { Button, ButtonGroup, Center, Text, Image, Input } from "@chakra-ui/react"
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

  // const { colorMode, toggleColorMode } = useColorMode()
  // colorMode === 'light' ? 'Dark' : 'Light'

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
      <div className={useColorModeValue(styles.container, styles.container2)}>
        <Head>
          <title>Critique Hall | Login</title>
          <meta name="description" content="Critique Hall by create next app" />
          <link rel="icon" href={useColorModeValue('logo256.png', 'logo256-dark.png')} onLoad=""/>
          <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap" rel="stylesheet" />
        </Head>
  
        <Box as='main' bg={useColorModeValue('white', '#212121')} w={{lg: '100ch' , md: '100%' , sm: '100%' }} className={styles.main} 
          // animate = {{y: 0 , opacity: 1}}
          // initial = {{y: -70, opacity: 0}}
          // transition ={{duration: .7}}
          >
            <div className={styles.logo}>
            <Link href="/" passHref><Image src={useColorModeValue('critiquehall.png', 'critiquehall-dark.png')} 
             alt="Critique Hall Logo"/></Link>
            </div>
            
            <Heading fontFamily={'Raleway'} mb={5} as="h2" size="lg" color={useColorModeValue('#1B1464','#B2A3FF')}>LOG-IN</Heading>
            <Box id='warning1' bg='red.100' w='30%' h='5vh' border='1px solid red' rounded='md' mb={4} mt={2} hidden>
              <Center>
                <Text mt='1vh'>Incorrect Email or Password</Text>
              </Center>
            </Box>
            <center><FormControl id="loginform" isRequired>
              <FormLabel>iACADEMY Email</FormLabel>
                <Input size='lg' width={'30vh'} id="email" value={email} className={styles.input_box} type="email" onChange={e => setEmail(e.target.value)} />
                {/* <input placeholder="Username" id="email" value={email} className={styles.input_box} type="email" /> */}
                <br/>
                <br/>
              <FormLabel>Password</FormLabel>
                <Input size='lg' width={'30vh'} id="password" value={password} className={styles.input_box} type="password" onChange={e => setPassword(e.target.value)} />
                {/* <input placeholder="Password" id="password" value={password} className={styles.input_box} type="password"/> */}
                <br/>
                <br/>
                <p className={styles.register}>
                <Text fontSize='md' color={useColorModeValue('#1E9CE3', '#1BA3C1')}><Link href="./forgot-password"><a>Forgot Password?</a></Link></Text>
                </p>
                <VStack direction="row" spacing={8} align="center">
                <Button
                  // whileHover={{ scale: 1.2 }}
                  // whileTap={{ scale: 0.9 }}
                  className={styles.LoginButton} 
                  bgColor={useColorModeValue('#0C1F83', '#2346FF')}
                  color={useColorModeValue('white', 'white')}
                  _hover={{bgColor: 'blue'}} 
                  type="submit" 
                  size="lg"
                  onClick={submitLogin}
                  > LOG-IN </Button>
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
              <Text fontSize='sm'>New user?<Link href="./register" passHref><Text _hover={{cursor:'pointer'}} fontSize='lg' className={styles.signUpText} color={useColorModeValue('#1E9CE3', '#1BA3C1')}>Sign Up Now!</Text></Link></Text>
            </p>
            
        </Box>
      </div>
    )
  }