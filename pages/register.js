import Head from 'next/head'
import Image from 'next/image'
import styles from "@styles/Register.module.css";
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import Home from './home'
import Link from 'next/link'
import Logo from "@public/critiquehall.png";
import { Button, ButtonGroup, useColorModeValue } from "@chakra-ui/react"
import { Stack, HStack, VStack } from "@chakra-ui/react"
import { Heading } from '@chakra-ui/react'
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

export async function getStaticProps(){
  const { API_URL } = process.env
  const { API_KEY } = process.env

  const res2 = await fetch(`${API_URL}/api/get_departments` , {
    method: 'GET',
    headers: {
        'content-type': 'multipart/form-data',
        'X-API-KEY': `${API_KEY}`,
        'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
        // 'Accept-Encoding': 'gzip, deflate, br',
        'Accept': 'application/json',
    }
  })

  const data2 = await res2.json()

  // console.log(data)
  // console.log(data2)

  return{
    props: {
      //  data: data.specialization, 
       data2
    }
  }
}

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
      formData.append('first-name', first_name);   //append the values with key, value pair
      formData.append('last_name', last_name);
      formData.append('display_name', user_name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('confirm_password', confirm_password);
      formData.append('department', department);
      formData.append('specialization', specialization);


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
          console.log(response);
            window.location = "/home"
      })
      .catch(error => {
          console.log(error);
          window.location = "/register"
      });

    }
  // const getSpecializations

    return (
      <div className={styles.container}>
        <Head>
          <title>Critique Hall | Register</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/logo256.png" onLoad=""/>
        </Head>
  
        <Box  bg={useColorModeValue('white', '#212121')} w={{lg: '100ch' , md: '100%' , sm: '100%' }} className={styles.main} 
          id="motion-main" 
        >
          <center><FormControl id="registerpart1" isRequired>
          <div id="part1">
            <div className={styles.logo}>
            <Link href="/" passHref><Image src={Logo}  alt="Critique Hall Logo"></Image></Link>
            </div>
          
            <Heading mb={2} as="h2" size="lg" color={useColorModeValue('#C1272D')}>REGISTER</Heading>
            
                <FormLabel>First Name</FormLabel>
                <input className={styles.input_box} type="text" value={first_name} onChange={e => setFirstName(e.target.value)}/>
                <br/>
                <FormLabel>Last Name</FormLabel>
                <input className={styles.input_box} type="text" value={last_name} onChange={e => setLastName(e.target.value)}/>
                <br/>
                <FormLabel>Username</FormLabel>
                <input className={styles.input_box} type="text" value={user_name} onChange={e => setUserName(e.target.value)}/>
                <br/>
                <FormLabel>iACADEMY Email</FormLabel>
                <input placeholder="***@iacademy.edu.ph" className={styles.input_box} type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                {/* <FormHelperText className={styles.helperText}>format: ***@iacademy.edu.ph</FormHelperText> */}
                {/* <br/> */}
              <FormLabel>Password</FormLabel>
                <input className={styles.input_box} type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <br/>
                <FormLabel>Confirm Password</FormLabel>
                <input className={styles.input_box} type="password" value={confirm_password} onChange={e => setConfirmPassword(e.target.value)}/>
                <br/>
                <VStack direction="column" spacing={8} align="center">
                <MotionButton
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={styles.RegisterButton} 
                  colorScheme="blue" 
                  type="submit" 
                  size="lg"
                  rightIcon={<ArrowRightIcon />}
                  onClick={toPart2}
                  >
                Next Page
                </MotionButton>
                </VStack>
          </div>

          <div id="part2" hidden>
            <div className={styles.logo2}>
            <Link href="/"><Image src={Logo}  alt="Critique Hall Logo"></Image></Link>
            </div>
          
            <Heading mb={2} as="h2" size="lg" color={useColorModeValue('#C1272D')}>REGISTER</Heading>
                <FormLabel>Department</FormLabel>
                <Select className={styles.input_select} placeholder="Select Department" size="sm" onChange={e => getSpecList(e.target.value)}>
                  {depList.map((department, i) => (
                    <option value={department.name} key={i}>{department.name}</option>
                  ))}
                {/* <option value="shs">Senior High School (SHS)</option>
                <option value="col">College (COL)</option> */}
                </Select>
                <br />
                <FormLabel>Strand or Specialization</FormLabel>
                <Select className={styles.input_select} placeholder="Select Strand / Specialization" size="sm" onChange={e => setSpecialization(e.target.value)}>
                {specList.map((specialization, i) => (
                  <option value={specialization.name} key={i}>{specialization.name}</option>
                ))}
                </Select>
                <br />
                <FormLabel>Gender</FormLabel>
                <Select className={styles.input_select} placeholder="Select Gender" size="sm" onChange={e => setGender(e.target.value)}>
                  <option value='m'>Male</option>
                  <option value='f'>Female</option>
                </Select>
                <br />
                <HStack direction="row" spacing={8} align="center">
                <MotionButton
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={styles.RegisterButton} 
                  colorScheme="blue" 
                  type="submit" 
                  size="sm"
                  leftIcon={<ArrowLeftIcon />}
                  onClick={toPart1} 
                  >
                {/* <button >Previous Page</button> */}
                Previous Page
                </MotionButton>
                <MotionButton
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={styles.RegisterButton} 
                  colorScheme="green" 
                  type="submit" 
                  size="lg"
                  rightIcon={<CheckIcon />}
                  >
                {/* <Link href="/home">Register</Link> */}
                <Button variant='none' onClick={submitRegister}>Register</Button>
                </MotionButton>
                </HStack>
            

            <p className={styles.register}>
              <p><Link href="./login" passHref><a>Back to Login</a></Link></p>
            </p>
          </div>
          </FormControl></center>

        </Box>
      </div>
    )
  }