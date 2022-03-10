import Head from 'next/head'
// import Image from 'next/image'
import styles from "@styles/ForgotPassword.module.css";
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import Home from './home'
import Link from 'next/link'
// import Logo from "@public/critiquehall.png";
import { Heading } from '@chakra-ui/react'
import { Box, Image, Text, Input } from "@chakra-ui/react"
import { Button, ButtonGroup } from "@chakra-ui/react"
import { Stack, HStack, VStack } from "@chakra-ui/react"
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react"
import { useState } from 'react'
import { useColorMode, useColorModeValue, Center } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools'
import React from 'react';
import { useToast } from '@chakra-ui/react'
import axios from "axios"


const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
})


const MotionButton = motion(Button)

export default function ForgotPassword(){
  const { API_URL } = process.env
  const { API_KEY } = process.env

  const [email, setEmail] = useState('')
  const toast = useToast()
  const toastIdRef = React.useRef()

  const { colorMode, toggleColorMode } = useColorMode()
  colorMode === 'light' ? 'Dark' : 'Light'
  const [ImgUrl, setImgUrl] = useState('dark-and-light.png')

  const changeDarkAndLightIcon = () => {
    toggleColorMode()
    if(colorMode === 'light'){
        setImgUrl('light-mode-icon.png')
    }else {
        setImgUrl('dark-mode-icon.png')
    }
  }

  const forgotPassword = async () =>{

        if (email == ''){
            // document.getElementById('warning1').removeAttribute('hidden');
            // document.getElementById('warning2').hidden=true;
            toastIdRef.current = toast({ position: 'top', title: 'Please input your email.', status: 'error', duration: 3000, isClosable: true })
        } else{

        

        let formData = new FormData(); 
        formData.append('email', email);
        
        const config = {
          headers: { 
            'content-type': 'multipart/form-data',
            'X-API-KEY': `${API_KEY}`,
            'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
            // 'Accept-Encoding': 'gzip, deflate, br',
            'Accept': 'application/json',
          }
        }

        // console.log(email)
  
        axios.post(`${API_URL}/api/forgot_password`, formData, config)
        .then(response => {
          toastIdRef.current = toast({ position: 'top', title: 'A link has been sent to your email.', status: 'success', duration: 3000, isClosable: true })
            // console.log(response);
            // window.location = "/home"
        })
        .catch(error => {
          // toastIdRef.current = toast({ title: 'Reset Password Link Error!', description: 'Please try again!', status: 'error', duration: 2000, isClosable: true })
            console.log(error);
            // console.log(error.response);
            if(typeof error.response === 'undefined'){
              toastIdRef.current = toast({ position: 'top', title: 'Something is wrong in the server. Please try again later.', status: 'error', duration: 3000, isClosable: true })
            }
            else if(error.response.data.status === "Wrong Credential"){
              // document.getElementById('warning2').removeAttribute('hidden');
              // document.getElementById('warning1').hidden=true;
              toastIdRef.current = toast({ position: 'top', title: 'Sorry, we could not find that email.', status: 'error', duration: 3000, isClosable: true })
            }else{
              toastIdRef.current = toast({ position: 'top', title: 'Invalid email input.', status: 'error', duration: 3000, isClosable: true })
            }
            // window.location = "/forgot-password"
        });}
    }

    return(
        <div className={useColorModeValue(styles.container, styles.container2)}>
        <Head>
          <title>Critique Hall | Forgot Password</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href={useColorModeValue('logo256.png', 'logo256-dark.png')} onLoad=""/>
          <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap" rel="stylesheet" />
        </Head>
        
        <Box className={styles.main} bg={useColorModeValue('white', '#212121')} w={{'2xl': '50vw' , xl: '50vw', lg: '50vw' , md: '100%' , sm: '100%', base: '100%'}}>
            <center>
            {/* <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={2}
                        ml={4}
                        w='50%'
                        onClick={changeDarkAndLightIcon}
                        _hover={{cursor:'pointer'}}
                        _active={{bgColor: 'none'}}
                    >
                        <Image className={styles.darkicon} src={ImgUrl} alt="darkmode" w="2em" h="2em" ml={'15em'} />
                    </Button> */}
            <div className={styles.logo}>
            <Image src={useColorModeValue('critiquehall.png', 'critiquehall-dark.png')} alt="Critique Hall Logo"/>
            </div>

            <Heading fontFamily={'Raleway'} mb={'10%'} as="h2" size="lg" color={useColorModeValue('#1B1464','#B2A3FF')}>Forgot Password</Heading>

            <Box id='warning1' color='red' w='100%' h='5vh' mb={4} mt={2} hidden>
              <Center>
                <Text mt='1vh' w="100%">Please input your Email!</Text>
              </Center>
            </Box>
            <Box id='warning2' color='red' w='100%' h='5vh' mb={4} mt={2} hidden>
              <Center>
                <Text mt='1vh'>Sorry, we couldn&rsquo;t find your email.</Text>
              </Center>
            </Box>

            <center><FormControl id="forgotpassword" action="/home">
                <FormLabel>Email</FormLabel>
                <Input borderColor={useColorModeValue('black', 'white')} size={{lg: 'lg', base: 'sm'}} width={{lg:'40vh', base: '40vh'}} className={styles.input_box} type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                {/* <FormHelperText className={styles.helperText}>This field is required.</FormHelperText> */}
                <br/>
                {/* <Popover
                placement="bottom"
                closeOnBlur={false}>
                <PopoverTrigger> */}
                <Button
                  // whileHover={{ scale: 1.2 }}
                  // whileTap={{ scale: 0.9 }}
                  className={styles.login_button}
                  bgColor={useColorModeValue('#0C1F83', '#1D447E')}
                  color={useColorModeValue('white', 'white')}
                  _hover={{bgColor: useColorModeValue('#173cff', '#428eff')}}
                  size="lg"
                  onClick={forgotPassword}
                  >
                Send
                </Button>
                {/* </PopoverTrigger>
                <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader pt={4} fontWeight="bold" border="0">Reset Password Link Sent!</PopoverHeader>
                <PopoverBody>We have sent a reset password confirmation to your e-mail.
                  Check on your primary or spam folder.
                </PopoverBody>
                </PopoverContent>
                </Popover> */}
            </FormControl></center>

            
            <Link href="/" passHref><Text _hover={{cursor:'pointer', textDecoration: 'underline'}} fontSize={{lg: "lg", base: "sm"}} color={useColorModeValue('#1BA3C1', '#1BA3C1')} mt={5}>Back to Login</Text></Link>
          
            </center>

        </Box>
        </div>
    )
}