import Head from 'next/head'
// import Image from 'next/image'
import styles from "@styles/ConfirmAccount.module.css";
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import Home from './home'
import Link from 'next/link'
// import Logo from "@public/critiquehall2.png";
import { Heading } from '@chakra-ui/react'
import { Box } from "@chakra-ui/react"
import { Button, ButtonGroup, Image, Input, Text } from "@chakra-ui/react"
import { Stack, HStack, VStack } from "@chakra-ui/react"
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react"
import { useState } from 'react'
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools'
import axios from "axios"
import { useCookies } from 'react-cookie';
import React from 'react';
import { useToast } from '@chakra-ui/react';
import { getCookie, setCookies, removeCookies } from 'cookies-next'
import {useRouter} from 'next/router'



const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
})


const MotionButton = motion(Button)

export default function ConfirmationPage(){
  const { API_URL } = process.env
  const { API_KEY } = process.env

  const [code, setCode] = useState('')
  // const [cookies] = useCookies()
  const user_id = getCookie('encrypted_id')
  const email = getCookie('email')
  const password = getCookie('password')

  const toast = useToast()
  const toastIdRef = React.useRef()
  const router = useRouter()

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

  const accountVerification = async () =>{

    if(code == '') {
      toastIdRef.current = toast({ position: 'top', title: 'Verification code is required.', status: 'error', duration: 3000, isClosable: true })
    }
    if(code.length > 6) {
      toastIdRef.current = toast({ position: 'top', title: 'Verification code must not exceed 6 numbers.', status: 'error', duration: 3000, isClosable: true })
    }

        let formData = new FormData(); 
        formData.append('verification_code', code);
        
        const config = {
          headers: { 
            'content-type': 'multipart/form-data',
            'X-API-KEY': `${API_KEY}`,
            'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
            // 'Accept-Encoding': 'gzip, deflate, br',
            'Accept': 'application/json',
            'User-Id': user_id
          }
        }

        // console.log(email)
  
        axios.post(`${API_URL}/api/confirm_verification`, formData, config)
        .then(response => {
            toastIdRef.current = toast({ position: 'top', title: 'Account verification successful!', status: 'success', duration: 3000, isClosable: true })
            // console.log(response.data);
            setCookies('token', response.data.token)
        }).then(()=>{
          removeCookies('email')
          removeCookies('password')
          router.push('/home')
        })
        .catch(error => {
            if(typeof error.response === 'undefined'){
              toastIdRef.current = toast({ position: 'top', title: 'Something is wrong in the server. Please try again later.', status: 'error', duration: 3000, isClosable: true })
            }
            if(error.response.data.status == 'Wrong code'){
              toastIdRef.current = toast({ position: 'top', title: 'Invalid code.', status: 'error', duration: 3000, isClosable: true })
            }
            if(error.response.data == '\n<div style="border:1px solid #990000;padding-left…nce\t\t\t</p>\n\n\t\t\n\t\n\n</div>{"status":"Code expired"}'){
              toastIdRef.current = toast({ position: 'top', title: 'Verification code expired.', status: 'error', duration: 3000, isClosable: true })
            }
            if(error.response.data.status == 'Code expired'){
              toastIdRef.current = toast({ position: 'top', title: 'Verification code expired.', status: 'error', duration: 3000, isClosable: true })
            }
            if(error.response.data.message == "<p>The Verification Code field must contain only numbers.</p>\n") {
              toastIdRef.current = toast({ position: 'top', title: 'Invalid code.', status: 'error', duration: 3000, isClosable: true })
            }
            if(error.response.data.message == "Email have been verified") {
              toastIdRef.current = toast({ position: 'top', title: 'Account already verified.', status: 'info', duration: 3000, isClosable: true })
            }
            // toastIdRef.current = toast({ position: 'top', title: 'Account verification unsuccessful!', description: 'Please try again.', status: 'error', duration: 3000, isClosable: true })
            console.log(error);
        });
    }

    const ResendCode = () =>{
      const config = {
        headers: { 
          'content-type': 'multipart/form-data',
          'X-API-KEY': `${API_KEY}`,
          'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
          'Accept': 'application/json',
        }
      }

      let formData2 = new FormData;
      formData2.append('email', email);
      formData2.append('password', password);
      // console.log(email)

      axios.post(`${API_URL}/api/login`, formData2, config)
      .then(response => {
          console.log(response.data);
          toastIdRef.current = toast({position: 'top', title: 'Verification code resent!', status: 'success', duration: 2000, isClosable: true })
          // window.location = "/confirmation"
      })
      .catch(error => {
          console.log(error.response);
      });
    }

    const backLogin = () =>{
      removeCookies('email')
      removeCookies('password')
      removeCookies('token')
      removeCookies('encrypted_id')
      removeCookies('display_name')
      router.replace('/')
    }

    return(
      <div className={useColorModeValue(styles.container, styles.container2)}>
        <Head>
          <title>Critique Hall | Email Verification</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href={useColorModeValue('/logo256.png', '/logo256-dark.png')} onLoad=""/>
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
            <Image src={useColorModeValue('critiquehall.png', 'critiquehall-dark.png')} 
             alt="Critique Hall Logo"/>
            </div>

            <Heading fontFamily={'Raleway'} mb={10} as="h2" size="lg" color={useColorModeValue('#1B1464','#B2A3FF')}>Email Verification</Heading>
            {/* <p className={styles.description}>Kindly enter the verification code to verify your account</p> */}
            <center><FormControl id="forgotpassword" isRequired>
                <Input borderColor={useColorModeValue('black', 'white')} fontWeight={'bold'} size={{lg: 'lg', base: 'sm'}} placeholder="6-Digit Code" className={styles.input_box} type="text" value={code} onChange={e => setCode(e.target.value)}/>
                {/* <FormHelperText className={styles.helperText}>This field is required.</FormHelperText> */}
                <br/>
                <Button
                  className={styles.login_button}
                  bgColor={useColorModeValue('#0C1F83', '#1D447E')}
                  color={useColorModeValue('white', 'white')}
                  _hover={{bgColor: useColorModeValue('#173cff', '#428eff')}}
                  size="lg"
                  onClick={accountVerification}
                  >
                Verify
                </Button>
                {/* <Popover
                placement="bottom"
                closeOnBlur={false}>
                <PopoverTrigger>
                
                </PopoverTrigger>
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

            {/* <p className={styles.register}>
              <p><Link href="./login"><a>Back to Login</a></Link></p>
            </p> */}
            </center>

            <Box display="flex">
            <Text _hover={{cursor:'pointer', textDecoration: 'underline'}} fontSize={{lg: "lg", base: "sm"}} color={useColorModeValue('#1BA3C1', '#1BA3C1')} mt={5} onClick={ResendCode}>Resend Code</Text>
            {/* <Text _hover={{cursor:'pointer', textDecoration: 'underline'}} fontSize={{lg: "lg", base: "sm"}} color={useColorModeValue('#1BA3C1', '#1BA3C1')} ml={5} mt={5} onClick={backLogin}>Back to Login</Text> */}
            </Box>  
        </Box>
        </div>
    )
}
