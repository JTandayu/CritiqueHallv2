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
  const [cookies, setCookies, removeCookies] = useCookies(['token', 'id', 'encrypted_id'])

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

      axios.get(`${API_URL}/api/get_departments`, config)
      .then(response => {
          console.log(response.data);
          setDepList(response.data.Departments);
      })
      .catch(error => {
          console.log(error);
      });

      
    }, [])

    const getSpecList = e =>{

      // console.log(e)

      setDepartment(e)

      const config = {
        headers: { 
          'content-type': 'multipart/form-data',
          'X-API-KEY': `${API_KEY}`,
          'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
          'Accept': 'application/json',
        }
      }

      axios.get(`${API_URL}/api/get_dept_special/${e}`, config)
      .then(response => {
          console.log(response);
          setSpecList(response.data.specializations);
      })
      .catch(error => {
          console.log(error);
      });
    } 


    const submitRegister = async () =>{
      let formData = new FormData(); 
      formData.append('first_name', first_name);   //append the values with key, value pair
      formData.append('last_name', last_name);
      formData.append('display_name', user_name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('confirm_password', confirm_password);
      formData.append('department', department);
      formData.append('specialization', specialization);
      formData.append('gender', gender)


      const config = {
        headers: { 
          'content-type': 'multipart/form-data',
          'X-API-KEY': `${API_KEY}`,
          'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
          'Accept': 'application/json',
        }
      }

      axios.post(`${API_URL}/api/register`, formData, config)
      .then(response => {
        toastIdRef.current = toast({ title: 'Account Creation Successful!', description: 'Please check your Email for the 6-Digit Code Verification.', status: 'success', duration: 5000, isClosable: true })
          console.log(response.data);
          submitLogin()
      })
      .catch(error => {
        toastIdRef.current = toast({ title: 'Account Creation Unsuccessful!', description: 'Please try again.', status: 'error', duration: 2000, isClosable: true })
          console.log(error.response);
          // window.location = "/register"
      });

      

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
          // setCookies('id', response.data.id)
          setCookies('encrypted_id', response.data.encrypted_id)
          setCookies('profile_pic', response.data.profile_pic)

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
          <link rel="icon" href={useColorModeValue('logo256.png', 'logo256-dark.png')} onLoad=""/>
          <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap" rel="stylesheet" />
        </Head>
  
        <Box  bg={useColorModeValue('white', '#212121')} w={{lg: '100ch' , md: '100%' , sm: '100%', base: '100%'}} className={styles.main} 
          id="motion-main" 
        >
          <center><FormControl id="registerpart1">
          <Button
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
                    </Button>
          
            <Box className={styles.logo}>
            <Image src={useColorModeValue('critiquehall.png', 'critiquehall-dark.png')} 
             alt="Critique Hall Logo"/>
            </Box>
            <SimpleGrid columns={2} spacing={10}>
            {/* <Heading fontFamily={'Raleway'} mb={2} as="h2" size="lg"color={useColorModeValue('#C1272D','#FF5C61')}>REGISTER</Heading> */}
                <Box>
                <FormLabel>First Name</FormLabel>
                <Input  borderColor={useColorModeValue('black', 'white')} className={styles.input_box} type="text" value={first_name} onChange={e => setFirstName(e.target.value)}/>
                </Box>
                <Box>
                <FormLabel>Last Name</FormLabel>
                <Input  borderColor={useColorModeValue('black', 'white')}  className={styles.input_box} type="text" value={last_name} onChange={e => setLastName(e.target.value)}/>
                </Box>
                <Box>
                <FormLabel>Display Name</FormLabel>
                <Input  borderColor={useColorModeValue('black', 'white')}  className={styles.input_box} type="text" value={user_name} onChange={e => setUserName(e.target.value)}/>
                </Box>
                <Box>
                <FormLabel>iACADEMY Email</FormLabel>
                <Input  borderColor={useColorModeValue('black', 'white')}  placeholder="yes, type the iacademy.edu.ph" className={styles.input_box} type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                </Box>
                {/* <FormHelperText className={styles.helperText}>format: ***@iacademy.edu.ph</FormHelperText> */}
                {/* <br/> */}
                <Box>
                <FormLabel>Password</FormLabel>
                <Input  borderColor={useColorModeValue('black', 'white')} placeholder="not your original one, obviously!"  className={styles.input_box} type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </Box>
                <Box>
                <FormLabel>Confirm Password</FormLabel>
                <Input  borderColor={useColorModeValue('black', 'white')}  className={styles.input_box} type="password" value={confirm_password} onChange={e => setConfirmPassword(e.target.value)}/>
                </Box>
                <Box>
                <FormLabel>Department</FormLabel>
                <Select borderColor={useColorModeValue('black', 'white')} borderRadius="lg" className={styles.input_select} size="sm" onChange={e => getSpecList(e.target.value)}>
                  <option value="" disabled selected>Choose</option>
                  {depList.map((department, i) => (
                    <option disabled={department.name === "College" || department.name === "Senior High School" ? true : null} value={department.name} key={i}>{department.name}</option>
                  ))}
                </Select>
                </Box>
                <Box>
                <FormLabel display="flex">Strand / Specialization<Text fontSize="sm" color={useColorModeValue('gray', 'gray')} ml={2}>depends</Text></FormLabel>
                <Select borderColor={useColorModeValue('black', 'white')} borderRadius="lg"  className={styles.input_select} size="sm" onChange={e => setSpecialization(e.target.value)}>
                <option value="" disabled selected>Choose</option>
                {specList.map((specialization, i) => (
                  <option value={specialization.name} key={i}>{specialization.name}</option>
                ))}
                </Select>
                </Box>
                <Box>
                <Checkbox size="lg"><Text display="flex" ml={1}>I accept the <Box ml={1}><TermsAndConditions /></Box></Text></Checkbox> 
                </Box>
          </SimpleGrid>
          <Box>
                <Button
                  // whileHover={{ scale: 1.2 }}
                  // whileTap={{ scale: 0.9 }}
                  className={styles.RegisterButton} 
                  bgColor={useColorModeValue('#0C1F83', '#1D447E')}
                  color={useColorModeValue('white', 'white')}
                  _hover={{bgColor: useColorModeValue('#173cff', '#428eff')}}
                  type="submit" 
                  size="lg"
                  // rightIcon={<ArrowRightIcon />}
                  onClick={submitRegister}
                  >
                Submit
                </Button>
                <Link href="/" passHref><Text _hover={{cursor:'pointer', textDecoration: 'underline'}} fontSize='lg' color={useColorModeValue('#1BA3C1', '#1BA3C1')} mt={5}><a>Back to Login</a></Text></Link>
                </Box>
          <div id="part2" hidden>
            <div className={styles.logo2}>
            <Image src={useColorModeValue('critiquehall.png', 'critiquehall-dark.png')} 
             alt="Critique Hall Logo"/>
            </div>
          
            {/* <Heading fontFamily={'Raleway'} mb={2} as="h2" size="lg" color={useColorModeValue('#C1272D','#FF5C61')}>REGISTER</Heading> */}
                <FormLabel>Department</FormLabel>
                <Select borderColor={useColorModeValue('black', 'white')}  className={styles.input_select} placeholder="Select Department" size="sm" onChange={e => getSpecList(e.target.value)}>
                  {depList.map((department, i) => (
                    <option disabled={department.name === "Shs" ? true : null} value={department.name} key={i}>{department.name}</option>
                  ))}
                {/* <option value="shs">Senior High School (SHS)</option>
                <option value="col">College (COL)</option> */}
                </Select>
                <br />
                <FormLabel>Strand or Specialization</FormLabel>
                <Select borderColor={useColorModeValue('black', 'white')}  className={styles.input_select} placeholder="Select Strand / Specialization" size="sm" onChange={e => setSpecialization(e.target.value)}>
                {specList.map((specialization, i) => (
                  <option value={specialization.name} key={i}>{specialization.name}</option>
                ))}
                </Select>
                <br />
                <FormLabel>Gender</FormLabel>
                <Select  borderColor={useColorModeValue('black', 'white')}  className={styles.input_select} placeholder="Select Gender" size="sm" onChange={e => setGender(e.target.value)}>
                  <option value='m'>Male</option>
                  <option value='f'>Female</option>
                  <option value='o'>Other</option>
                </Select>
                <br />
                <HStack direction="row" spacing={8} align="center">
                <Button
                  // whileHover={{ scale: 1.2 }}
                  // whileTap={{ scale: 0.9 }} 
                  bgColor={useColorModeValue('#0C1F83', '#2346FF')}
                  color={useColorModeValue('white', 'white')}
                  _hover={{bgColor: 'blue'}}  
                  type="submit" 
                  size="lg"
                  leftIcon={<ArrowLeftIcon />}
                  onClick={toPart1} 
                  >
                {/* <button >Previous Page</button> */}
                Previous Page
                </Button>
                <Button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  bgColor={useColorModeValue('darkgreen', 'darkgreen')}
                  color={useColorModeValue('white', 'white')}
                  _hover={{bgColor: '#0C7A0A'}}  
                  type="submit" 
                  size="lg"
                  rightIcon={<CheckIcon />}
                  // variant='none' 
                  onClick={submitRegister}
                  >
                {/* <Link href="/home">Register</Link> */}
                Register
                </Button>
                </HStack>
            

            <p className={styles.register}>
            <Link href="/" passHref><Text _hover={{cursor:'pointer'}} fontSize='md' color={useColorModeValue('#E32A1E', '#FF5C61')}><a>Return to Login</a></Text></Link>
            </p>
          </div>
          </FormControl></center>

        </Box>
      </div>
    )
  }