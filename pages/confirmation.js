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
import { Button, ButtonGroup, Image, Input } from "@chakra-ui/react"
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
  const [cookies, setCookies, removeCookies] = useCookies(['token', 'id', 'encrypted_id'])

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

  const accountVerification = async () =>{

        let formData = new FormData(); 
        formData.append('verification_code', code);
        
        const config = {
          headers: { 
            'content-type': 'multipart/form-data',
            'X-API-KEY': `${API_KEY}`,
            'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
            // 'Accept-Encoding': 'gzip, deflate, br',
            'Accept': 'application/json',
            'User-Id': cookies.encrypted_id
          }
        }

        // console.log(email)
  
        axios.post(`${API_URL}/api/confirm_verification`, formData, config)
        .then(response => {
            toastIdRef.current = toast({ title: 'Account Verification Successful!', description: 'Login with your newly registered account.', status: 'success', duration: 3000, isClosable: true })
            console.log(response);
            setCookies('token', response.data.token)
            window.location = "/home"
        })
        .catch(error => {
            toastIdRef.current = toast({ title: 'Account Verification Unsuccessful!', description: 'Please try again.', status: 'error', duration: 3000, isClosable: true })
            console.log(error.response);
        });
    }

    return(
      <div className={useColorModeValue(styles.container, styles.container2)}>
        <Head>
          <title>Critique Hall | Confirm Verification</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href={useColorModeValue('logo256.png', 'logo256-dark.png')} onLoad=""/>
        </Head>
        
        <Box className={styles.main} bg={useColorModeValue('white', '#212121')} w={{lg: '100ch' , md: '100%' , sm: '100%', base: '100%'}} >
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

            <Heading fontFamily={'Raleway'} mb={10} as="h2" size="lg" color={useColorModeValue('#1B1464','#B2A3FF')}>Confirm Verification</Heading>
            {/* <p className={styles.description}>Kindly enter the verification code to verify your account</p> */}
            <center><FormControl id="forgotpassword" isRequired>
                <Input borderColor={useColorModeValue('black', 'white')} fontWeight={'bold'} size='lg' placeholder="6-Digit Code" className={styles.input_box} type="text" value={code} onChange={e => setCode(e.target.value)}/>
                {/* <FormHelperText className={styles.helperText}>This field is required.</FormHelperText> */}
                <br/>
                <Button
                  className={styles.login_button}
                  bgColor={useColorModeValue('#0C1F83', '#2346FF')}
                  color={useColorModeValue('white', 'white')}
                  _hover={{bgColor: 'blue'}} 
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

        </Box>
        </div>
    )
}
