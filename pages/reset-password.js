import Head from 'next/head'
// import Image from 'next/image'
import styles from "@styles/ResetPassword.module.css";
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
// import Home from './home'
import Link from 'next/link'
// import Logo from "@public/critiquehall.png";
import { Heading } from '@chakra-ui/react'
import { Box, Image, Text } from "@chakra-ui/react"
import { Button, ButtonGroup, Input } from "@chakra-ui/react"
import { Stack, HStack, VStack, Center } from "@chakra-ui/react"
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
import { useState } from 'react';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { useToast } from '@chakra-ui/react'
import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';



const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
})

const MotionButton = motion(Button)

// export async function getServerSideProps(context){
//   const token = await context.params.token;
//   const userId = await context.params.userId;

//   return{
//     props:{
//       token,
//       userId
//     }
//   }
// }

export default function ResetPassword({}){
  const { API_URL } = process.env
  const { API_KEY } = process.env
  const router =useRouter()
  // const url = router.query.user_id
  // console.log(url)

  const [password, setPassword] = useState('')
  const [confirm_password, setConfirmPassword] = useState('')
  const toast = useToast()
  const toastIdRef = React.useRef()

  const token = router.query.token;
  const userId = router.query.user_id;

  // console.log(token);
  // console.log(userId)

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

    const resetPassword = async () =>{
        let formData = new FormData(); 
        formData.append('new_password', password);
        formData.append('confirm_new_password', confirm_password);
        formData.append('token', token);
        formData.append('user_id', userId);

        const config = {
          headers: { 
            'content-type': 'multipart/form-data',
            'X-API-KEY': `${API_KEY}`,
            'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
            // 'Accept-Encoding': 'gzip, deflate, br',
            'Accept': 'application/json',

          }
        }

        if (password == '' || confirm_password == ''){
          // document.getElementById('warning2').removeAttribute('hidden');
          // document.getElementById('warning1').hidden=true;
          toastIdRef.current = toast({ position: 'top', title: 'Please fill up all the fields.', status: 'error', duration: 3000, isClosable: true })
          return;
        }else if (password !== confirm_password){
          // document.getElementById('warning1').removeAttribute('hidden');
          // document.getElementById('warning2').hidden=true;
          toastIdRef.current = toast({ position: 'top', title: 'Passwords do not match.', status: 'error', duration: 3000, isClosable: true })
          return;
        }else{
        axios.post(`${API_URL}/api/reset_password`, formData, config)
        .then(response => {
            toastIdRef.current = toast({position: 'top', title: 'Your password has been successfully reset!', status: 'success', duration: 3000, isClosable: true })
            console.log(response);
            router.replace('/login')
        })
        .catch(error => {
          // toastIdRef.current = toast({ title: 'Reset Password Unsuccessful!', description: 'Please try again!', status: 'error', duration: 2000, isClosable: true })
            console.log(error);
            if(typeof error.response === 'undefined'){
              toastIdRef.current = toast({ position: 'top', title: 'Something is wrong in the server. Please try again later.', status: 'error', duration: 3000, isClosable: true })
            }
            else if(error.reponse.data.status == 'Token Expired'){
              toastIdRef.current = toast({ position: 'top', title: 'Reset password link expired, please send a new one.', status: 'error', duration: 3000, isClosable: true })
            }
            // window.location = "/reset-password"
        });
      }
    }

    return(
      <div className={useColorModeValue(styles.container, styles.container2)}>
        <Head>
          <title>Critique Hall | Reset Password</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href={useColorModeValue('/logo256.png', '/logo256-dark.png')} onLoad=""/>
          <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap" rel="stylesheet" />
        </Head>
        
        <Box className={styles.main} bg={useColorModeValue('white', '#212121')} w={{'2xl': '50vw' , xl: '50vw', lg: '50vw' , md: '100%' , sm: '100%', base: '100%'}}>
            <center>
            
            <div className={styles.logo}>
            <Image src={useColorModeValue('/critiquehall.png', '/critiquehall-dark.png')} alt="Critique Hall Logo"/>
            </div>

            <Heading fontFamily={'Raleway'} mb={2} as="h2" size="lg" color={useColorModeValue('#1B1464','#B2A3FF')}>Reset Password</Heading>
            <br />
            <Box id='warning1' color='red' w='80%' h='5vh' mb={4} mt={2} hidden>
              <Center>
                <Text mt='1vh'>New Password and Confirm New Password do not match!</Text>
              </Center>
            </Box>
            <Box id='warning2' color='red' w='80%' h='5vh' mb={4} mt={2} hidden>
              <Center>
                <Text mt='1vh'>Please input all the fields!</Text>
              </Center>
            </Box>
            {/* <p className={styles.description}>Kindly enter your E-mail Address to receive a link for further process in changing your password.</p> */}
            <center><FormControl id="forgotpassword" action="/home">
                <FormLabel>New Password</FormLabel>
                <Input borderColor={useColorModeValue('black', 'white')}  size={{lg: 'lg', base: 'sm'}} width={{lg:'40vh', base: '40vh'}} className={styles.input_box} type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                {/* <input placeholder="New Password" className={styles.input_box} type="password" value={password} onChange={e => setPassword(e.target.value)}/> */}
                {/* <FormHelperText className={styles.helperText}>This field is required.</FormHelperText> */}
                <br/>
                <br />
                <FormLabel>Confirm New Password</FormLabel>
                <Input borderColor={useColorModeValue('black', 'white')}  size={{lg: 'lg', base: 'sm'}} width={{lg:'40vh', base: '40vh'}} className={styles.input_box} type="password" value={confirm_password} onChange={e => setConfirmPassword(e.target.value)}/>
                {/* <input placeholder="Confirm New Password" className={styles.input_box} type="password" value={confirm_password} onChange={e => setConfirmPassword(e.target.value)}/> */}
                <br/>
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
                  onClick={resetPassword}
                  >
                Reset
                </Button>
                {/* </PopoverTrigger>
                <PopoverContent color="white" bg="green.800" borderColor="green.800">
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader pt={4} fontWeight="bold" border="0">Reset Password Successful!</PopoverHeader>
                <PopoverBody>Your password has been successfully reset! Login with your new password.
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