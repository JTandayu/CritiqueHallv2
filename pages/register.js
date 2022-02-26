import Head from 'next/head'
// import Image from 'next/image'
import styles from "@styles/Register.module.css";
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import Home from './home'
import Link from 'next/link'
// import Logo from "@public/critiquehall.png";
import { Button, ButtonGroup, useColorModeValue, Image, useColorMode } from "@chakra-ui/react"
import { Stack, HStack, VStack, SimpleGrid, Center } from "@chakra-ui/react"
import { Heading, Input, Text } from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react"
import { ArrowRightIcon, ArrowLeftIcon, CheckIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { Select } from "@chakra-ui/react"
import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react'
import axios from 'axios';
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { storage } from '../firebase.js'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useCookies } from 'react-cookie';
import React from 'react';
import { useToast, Checkbox, CheckboxGroup } from '@chakra-ui/react';
import TermsAndConditions from '@component/terms-and-conditions';
import PrivacyPolicy from '@component/privacy-policy';
import { getCookie, setCookies } from 'cookies-next'
import { useRouter } from 'next/router';
import { errorPrefix } from '@firebase/util';

const MotionButton = motion(Button)

function toPart2() {
  document.getElementById('part1').hidden=true;
  document.getElementById('part2').removeAttribute('hidden');
}

function toPart1() {
  document.getElementById('part2').hidden=true;
  document.getElementById('part1').removeAttribute('hidden');
}

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
})

// export async function getStaticProps(){
//   const { API_URL } = process.env
//   const { API_KEY } = process.env

//   const res2 = await fetch(`${API_URL}/api/get_departments` , {
//     method: 'GET',
//     headers: {
//         'content-type': 'multipart/form-data',
//         'X-API-KEY': `${API_KEY}`,
//         'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
//         // 'Accept-Encoding': 'gzip, deflate, br',
//         'Accept': 'application/json',
//     }
//   })

//   const data2 = await res2.json()

//   // console.log(data)
//   // console.log(data2)

//   return{
//     props: {
//       //  data: data.specialization, 
//        data2
//     }
//   }
// }

export default function Register({data2}) {
  const { API_URL } = process.env
  const { API_KEY } = process.env
  const router =useRouter()
  const url = router.query
  console.log(url)

  // const first_name, last_name, email, password, confirm_password, department, specialization, profile_pic, cover_pic = useState('')
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [user_name, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirmPassword] = useState('')
  const [department, setDepartment] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [specList, setSpecList] = useState([])
  const [depList, setDepList] = useState([])
  const [gender, setGender] = useState('')
  // const [cookies, setCookies, removeCookies] = useCookies()
  const [tnc, setTnc] = useState(false);
  
  const handleClick = () => {
    setTnc(!tnc)
    
  }
  console.log(tnc)
  

  const toast = useToast()
  const toastIdRef = React.useRef()

  const { colorMode, toggleColorMode } = useColorMode()
  colorMode === 'light' ? 'Dark' : 'Light'
  const [ImgUrl, setImgUrl] = useState('dark-mode-icon.png')

  const changeDarkAndLightIcon = () => {
    toggleColorMode()
    if(colorMode === 'light'){
        setImgUrl('light-mode-icon.png')
    }else {
        setImgUrl('dark-mode-icon.png')
    }
  }

    useEffect(() => {
      const config = {
        headers: { 
          'content-type': 'multipart/form-data',
          'X-API-KEY': `${API_KEY}`,
          'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
          'Accept': 'application/json',
        }
      }

      // axios.get(`${API_URL}/api/get_departments`, config)
      // .then(response => {
      //     console.log(response.data);
      //     setDepList(response.data.Departments);
      // })
      // .catch(error => {
      //     console.log(error);
      // });

      
    }, [])

    const getSpecList = e =>{

      // console.log(e)

      setDepartment(e)

      let formData = new FormData;
      formData.append('dept', e)

      const config = {
        headers: { 
          'content-type': 'multipart/form-data',
          'X-API-KEY': `${API_KEY}`,
          'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
          'Accept': 'application/json',
        }
      }

      axios.post(`${API_URL}/api/get_dept_special`, formData, config)
      .then(response => {
          console.log(response);
          setSpecList(response.data.specializations);
      })
      .catch(error => {
          console.log(error);
      });
    } 


    const submitRegister = async () =>{
      const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

      if(format.test(first_name)) {
        toastIdRef.current = toast({ position: 'top', title: 'First Name must contain alphanumeric characters.', status: 'error', duration: 3000, isClosable: true })
        return;
      }
      if(format.test(last_name)) {
        toastIdRef.current = toast({ position: 'top', title: 'Last Name must contain alphanumeric characters.', status: 'error', duration: 3000, isClosable: true })
        return;
      }
      if(format.test(user_name)) {
        toastIdRef.current = toast({ position: 'top', title: 'The Display Name field must contain alphanumeric characters (no special characters/spaces)', status: 'error', duration: 3000, isClosable: true })
        return;
      }
      if(first_name == '' || last_name == '' || user_name == '' || email == '' || password == '' || confirm_password == '' || specialization == ''){
        // document.getElementById('warning3').removeAttribute('hidden');
        // document.getElementById('warning1').hidden=true;
        // document.getElementById('warning2').hidden=true;
        toastIdRef.current = toast({ position: 'top', title: 'Please fill up all the fields.', status: 'error', duration: 3000, isClosable: true })
      }if(password != confirm_password){
        // document.getElementById('warning1').removeAttribute('hidden');
        // document.getElementById('warning2').hidden=true;
        // document.getElementById('warning3').hidden=true;
        toastIdRef.current = toast({ position: 'top', title: 'Passwords do not match.', status: 'error', duration: 3000, isClosable: true })
      }if(tnc == false){
        // document.getElementById('warning3').removeAttribute('hidden');
        // document.getElementById('warning1').hidden=true;
        // document.getElementById('warning2').hidden=true;
        toastIdRef.current = toast({ position: 'top', title: 'Please accept the Terms and Conditions and Privacy Policy.', status: 'error', duration: 3000, isClosable: true })
        return;
      }if(password.length < 8 || confirm_password.length < 8){
        toastIdRef.current = toast({ position: 'top', title: 'Password must be a minimum of 8 characters.', status: 'error', duration: 3000, isClosable: true })
        return;
      }
      if(password.length > 100 || confirm_password.length > 100){
        toastIdRef.current = toast({ position: 'top', title: 'Password must not exceed 100 characters.', status: 'error', duration: 3000, isClosable: true })
        return;
      }
      if(specialization.length > 100){
        toastIdRef.current = toast({ position: 'top', title: 'Specialization must not exceed 100 characters.', status: 'error', duration: 3000, isClosable: true })
        return;
      }
      if(first_name.length > 50 || last_name.length > 50){
        toastIdRef.current = toast({ position: 'top', title: 'First Name and Last Name must not exceed 50 characters.', status: 'error', duration: 3000, isClosable: true })
        return;
      }if(user_name.length > 16){
        toastIdRef.current = toast({ position: 'top', title: 'Display Name must not exceed 16 characters.', status: 'error', duration: 3000, isClosable: true })
        return;
      }if(user_name.matches("\\S+") && (user_name.length() > 0)){
        toastIdRef.current = toast({ position: 'top', title: 'The Display Name field must contain alphanumeric characters (no special characters/spaces)', status: 'error', duration: 3000, isClosable: true })
        return;
      }

      let formData = new FormData(); 
      formData.append('first_name', first_name);   //append the values with key, value pair
      formData.append('last_name', last_name);
      formData.append('display_name', user_name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('confirm_password', confirm_password);
      // formData.append('department', department);
      formData.append('specialization', specialization);
      formData.append('gender', "o")


      const config = {
        headers: { 
          'content-type': 'multipart/form-data',
          'X-API-KEY': `${API_KEY}`,
          'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
          'Accept': 'application/json',
        }
      }

      if(tnc != true){

      }else{
        axios.post(`${API_URL}/api/register`, formData, config)
        .then(response => {
          toastIdRef.current = toast({ position: 'top', title: 'Account successfully registered!', description: 'A 6-Digit code has been sent to your email. Please check your spam section if it does not appear in your inbox.', status: 'success', duration: 3000, isClosable: true })
            console.log(response.data);
            submitLogin()
        })
        .catch(error => {
          // toastIdRef.current = toast({ title: 'Account Creation Unsuccessful!', description: 'Please try again.', status: 'error', duration: 2000, isClosable: true })
            console.log(error.response);

            if(error.response.data.message == "<p>Display Name is already used</p>\n" || error.response.data.message == "<p>Email is already used</p>\n"){
              // document.getElementById('warning2').removeAttribute('hidden');
              // document.getElementById('warning1').hidden=true;
              // document.getElementById('warning3').hidden=true;
              toastIdRef.current = toast({ position: 'top', title: 'Display Name or Email is already in use.', status: 'error', duration: 3000, isClosable: true })
              return;
            }
            // if(error.response.data.message === "<p>The Display Name field cannot exceed 16 characters.</p>\n<p>The Email field must contain a valid email address.</p>\n"){
            //   toastIdRef.current = toast({ position: 'top', title: 'Display Name must not exceed 16 characters! Please enter a valid email address!', status: 'error', duration: 3000, isClosable: true })
            //   return;
            // }
            if(error.response.data.message.includes("<p>The Email field must contain a valid email address.</p>\n")){
              toastIdRef.current = toast({ position: 'top', title: 'Valid email is required.', status: 'error', duration: 3000, isClosable: true })
              return;
            }
            if(error.response.data.message.includes("<p>The Display Name field may only contain alpha-numeric characters.</p>\n")){
              toastIdRef.current = toast({ position: 'top', title: 'The Display Name field must contain alphanumeric characters (no special characters/spaces)', status: 'error', duration: 3000, isClosable: true })
              return;
            }
            if(error.response.data.message == "<p>The Display Name field may only contain alpha-numeric characters.</p>\n" || error.response.data.message == "<p>Email is already used</p>\n"){
              toastIdRef.current = toast({ position: 'top', title: 'The Display Name field must contain alphanumeric characters (no special characters/spaces)', status: 'error', duration: 3000, isClosable: true })
              toastIdRef.current = toast({ position: 'top', title: 'Email is already in use.', status: 'error', duration: 3000, isClosable: true })
              return;
            }
            // if(error.response.data.message === "<p>The First Name field may only contain alphabetical characters.</p>\n"){
            //   toastIdRef.current = toast({ position: 'top', title: 'First Name must contain alpphabetical characters.', status: 'error', duration: 3000, isClosable: true })
            //   return;
            // }
            // if(error.response.data.message === "<p>The Last Name field may only contain alphabetical characters.</p>\n"){
            //   toastIdRef.current = toast({ position: 'top', title: 'Last Name must contain alphabetical characters.', status: 'error', duration: 3000, isClosable: true })
            //   return;
            // }
            // if(error.response.data.message === "<p>The First Name field may only contain alphabetical characters.</p>\n<p>The Last Name field may only contain alphabetical characters.</p>\n"){
            //   toastIdRef.current = toast({ position: 'top', title: 'First Name and Last Name must contain alpphabetical characters.', status: 'error', duration: 3000, isClosable: true })
            //   return;
            // }
        });
      }
    }

    const submitLogin = () =>{

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
          setCookies('token', response.data.token)
          setCookies('display_name', response.data.display_name)
          setCookies('encrypted_id', response.data.encrypted_id)
          setCookies('email', email)
          setCookies('password', password)
          window.location = "/confirmation"
      })
      .catch(error => {
          console.log(error.response);
      });
    }

    return (
      <div className={useColorModeValue(styles.container, styles.container2)}>
        <Head>
          <title>Critique Hall | Register</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href={useColorModeValue('/logo256.png', '/logo256-dark.png')} onLoad=""/>
          <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap" rel="stylesheet" />
        </Head>
  
        <Box bg={useColorModeValue('white', '#212121')} w={{'2xl': '50vw' , xl: '50vw', lg: '50vw' , md: '100%' , sm: '100%', base: '100%'}} className={styles.main} 
          id="motion-main" 
        >
          <center><FormControl id="registerpart1">
          <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={2}
                        ml={{lg: '55%', base: 0}}
                        w='50%'
                        onClick={changeDarkAndLightIcon}
                        _hover={{cursor:'pointer'}}
                        _active={{bgColor: 'none'}}
                    >
                        <Image className={styles.darkicon} src={ImgUrl} alt="darkmode" w="2em" h="2em" ml={'15em'} mt={10} />
                    </Button>
          
            <Box className={styles.logo}>
            <Image src={useColorModeValue('critiquehall.png', 'critiquehall-dark.png')} 
             alt="Critique Hall Logo" mb={2}/>
            </Box>

            <Box h={{lg: "full", base: "50vh"}} overflowY="auto">
            <Box id='warning1' color='red' w='30%' h='5vh' mb={2} mt={2} hidden>
              <Center>
                <Text fontSize={{'2xl': "sm", xl: "xs", lg: "sm", base: "sm"}} mt='2vh'>Passwords do not match!</Text>
              </Center>
            </Box>
            <Box id='warning2' color='red' w='30%' h='5vh' mb={2} mt={2} hidden>
              <Center>
                <Text fontSize={{'2xl': "sm", xl: "xs", lg: "sm", base: "sm"}} mt='2vh'>Email or username is already taken!</Text>
              </Center>
            </Box>
            <Box id='warning3' color='red' w='30%' h='5vh' mb={2} mt={2} hidden>
              <Center>
                <Text fontSize={{'2xl': "sm", xl: "xs", lg: "sm", base: "sm"}} mt='2vh'>Please input all the fields!</Text>
              </Center>
            </Box>
            <SimpleGrid columns={{lg: 2, base: 1}} spacing={{lg: 2, base: 2}} mt={'5%'}>
                <Box>
                <FormLabel>First Name</FormLabel>
                <Input size={{lg: 'lg', base: 'sm'}} width={{lg:'35vh', base: '90%'}} borderColor={useColorModeValue('black', 'white')} className={styles.input_box} type="text" value={first_name} onChange={e => setFirstName(e.target.value)}/>
                </Box>
                <Box>
                <FormLabel>Last Name</FormLabel>
                <Input size={{lg: 'lg', base: 'sm'}} width={{lg:'35vh', base:'90%'}} borderColor={useColorModeValue('black', 'white')}  className={styles.input_box} type="text" value={last_name} onChange={e => setLastName(e.target.value)}/>
                </Box>
                <Box>
                <FormLabel>Display Name</FormLabel>
                <Input size={{lg: 'lg', base: 'sm'}} width={{lg:'35vh', base: '90%'}} borderColor={useColorModeValue('black', 'white')} placeholder="No spaces/underscores, pls!" className={styles.input_box} type="text" value={user_name} onChange={e => setUserName(e.target.value)}/>
                </Box>
                <Box>
                <FormLabel>Email</FormLabel>
                <Input size={{lg: 'lg', base: 'sm'}} width={{lg:'35vh', base: '90%'}} borderColor={useColorModeValue('black', 'white')} className={styles.input_box} type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                </Box>
                <Box>
                <FormLabel>Password</FormLabel>
                <Input size={{lg: 'lg', base: 'sm'}} width={{lg:'35vh', base: '90%'}} borderColor={useColorModeValue('black', 'white')} className={styles.input_box} type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </Box>
                <Box>
                <FormLabel>Confirm Password</FormLabel>
                <Input size={{lg: 'lg', base: 'sm'}} width={{lg:'35vh', base: '90%'}} borderColor={useColorModeValue('black', 'white')}  className={styles.input_box} type="password" value={confirm_password} onChange={e => setConfirmPassword(e.target.value)}/>
                </Box>
          </SimpleGrid>
                <Box mt={5}>
                <FormLabel>What program or strand do you specialize in?</FormLabel>
                <Input size={{lg: 'lg', base: 'sm'}} width={{lg:'71vh', base: '90%'}} placeholder="e.g. AB in Multimedia Arts and Design or HUMSS" borderColor={useColorModeValue('black', 'white')} onChange={e => setSpecialization(e.target.value)}  className={styles.input_box} type="text"/>
                </Box>
                <Box mt={5}>
                <Checkbox colorScheme='green' size={"md"} onChange={handleClick} checked={tnc}><Text display="flex" fontSize={{lg: "md", base: "sm"}} ml={1}>I have read and accept the <Box ml={{lg: 1, base: 1}}><TermsAndConditions />
                </Box></Text><Text display="flex" fontSize={{lg: "md", base: "sm"}} ml={{lg: 1, base: 1}}>and<Box ml={{lg: 1, base: 1}}><PrivacyPolicy /></Box>.</Text></Checkbox> 
                <Center><Button
                  // whileHover={{ scale: 1.2 }}
                  // whileTap={{ scale: 0.9 }}
                  className={styles.RegisterButton} 
                  bgColor={useColorModeValue('#0C1F83', '#1D447E')}
                  color={useColorModeValue('white', 'white')}
                  _hover={{bgColor: useColorModeValue('#173cff', '#428eff')}}
                  type="submit" 
                  size="md"
                  // rightIcon={<ArrowRightIcon />}
                  onClick={submitRegister}
                  >
                Submit
                </Button></Center>
                <Link href="/" passHref><Text _hover={{cursor:'pointer', textDecoration: 'underline'}} fontSize={{lg: "md", base: "sm"}} color={useColorModeValue('#1BA3C1', '#1BA3C1')} mt={5} mb={5}>Back to Login</Text></Link>
                </Box>
                </Box>


          
          </FormControl></center>

        </Box>
      </div>
    )
  }