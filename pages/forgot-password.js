import Head from 'next/head'
import Image from 'next/image'
import styles from "@styles/ForgotPassword.module.css";
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import Home from './home'
import Link from 'next/link'
import Logo from "@public/critiquehall2.png";
import { Heading } from '@chakra-ui/react'
import { Box } from "@chakra-ui/react"
import { Button, ButtonGroup } from "@chakra-ui/react"
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
import { useColorModeValue } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools'
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

  const forgotPassword = async () =>{

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
            console.log(response);
            // window.location = "/home"
        })
        .catch(error => {
            console.log(error);
            console.log(error.response);
            // window.location = "/forgot-password"
        });
    }

    return(
        <div className={styles.container} >
        <Head>
          <title>Forgot Password</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/logo256.png" onLoad=""/>
        </Head>
        
        <Box className={styles.main} bg={useColorModeValue('white', '#1a202c')} w={{lg: '100ch' , md: '100%' , sm: '100%' }} >
            <center>
            <div className={styles.logo}>
            <Link href="/"><Image src={Logo} alt="Critique Hall Logo"></Image></Link>
            </div>

            <Heading mb={2} as="h2" size="lg">FORGOT PASSWORD</Heading>
            <p className={styles.description}>Kindly enter your iACADEMY Email to receive a link for further process in changing your password.</p>
            <center><FormControl id="forgotpassword" action="/home" isRequired>
                <input placeholder="iACADEMY Email" className={styles.input_box} type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                <FormHelperText className={styles.helperText}>This field is required.</FormHelperText>
                <br/>
                <Popover
                placement="bottom"
                closeOnBlur={false}>
                <PopoverTrigger>
                <MotionButton
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={styles.login_button}
                  colorScheme="messenger"
                  size="lg"
                  onClick={forgotPassword}
                  >
                Send
                </MotionButton>
                </PopoverTrigger>
                <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader pt={4} fontWeight="bold" border="0">Reset Password Link Sent!</PopoverHeader>
                <PopoverBody>We have sent a reset password confirmation to your e-mail.
                  Check on your primary or spam folder.
                </PopoverBody>
                </PopoverContent>
                </Popover>
            </FormControl></center>

            <p className={styles.register}>
              <p><Link href="./login"><a>Back to Login</a></Link></p>
            </p>
            </center>

        </Box>
        </div>
    )
}