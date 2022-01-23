import Head from 'next/head'
// import { Image } from "@chakra-ui/react"
import Image from 'next/image'
import styles from "@styles/Register2.module.css";
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import Home from './home'
import Link from 'next/link'
import Logo from "@public/critiquehall.png";
// import StudentIcon from "@public/studenticon.png";
import { Button, ButtonGroup } from "@chakra-ui/react"
import { Stack, HStack, VStack } from "@chakra-ui/react"
import { Heading } from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react"
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { Select } from "@chakra-ui/react"


const MotionButton = motion(Button)

export default function Register2() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Critique Hall | Register</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/logo256.png" onLoad=""/>
        </Head>
  

        <motion.main className={styles.main} 
          animate = {{opacity: 1}}
          initial = {{opacity: 0}}
          transition ={{duration: .7}}
          >

            <div className={styles.logo}>
            <Link href="/"><Image src={Logo} alt="Critique Hall Logo"></Image></Link>
            </div>
          
            <Heading mb={2} as="h2" size="lg" color={useColorModeValue('#1B1464')}>REGISTER</Heading>
            <center><FormControl id="registerform" isRequired>
                <FormLabel>Department</FormLabel>
                <Select placeholder="Select Department" size="sm">
                <option value="shs">Senior High School (SHS)</option>
                <option value="col">College (COL)</option>
                </Select>
                <br />
                <FormLabel>Strand / Specialization</FormLabel>
                <Select placeholder="Select Strand / Specialization" size="sm">
                <option value="humss">SHS - Humanities and Social Sciences (HUMSS)</option>
                <option value="abm">SHS - Accountancy and Business Management (ABM)</option>
                <option value="audprod">SHS - Audio Production</option>
                <option value="mma">SHS - Media and Visual Arts with specialization in Multimedia Arts</option>
                <option value="ani">SHS - Animation</option>
                <option value="ani">SHS - Software Development</option>
                <option value="graph">SHS - Graphic Illustration</option>
                <option value="fd">SHS - Fashion Design</option>
                <option value="rob">SHS - Robotics</option>
                <option value="bscs-se">COL - BSCS - Software Engineering</option>
                <option value="bscs-ds">COL - BSCS - Data Science</option>
                <option value="bscs-ds">COL - BSCS - Cloud Computing and Network Engineering</option>
                <option value="bsemc-gd">COL - BSEMC - Game Development</option>
                <option value="bsit-wd">COL - BSIT - Web Development</option>
                <option value="bsba-mm">COL - BSBA - Marketing Management</option>
                <option value="bs-rem">COL - BS - Real Estate Management</option>
                <option value="bs-acc">COL - BS - Accountancy</option>
                <option value="ba-psy">COL - BA - Psychology</option>
                <option value="bs-ani">COL - BS - Animation</option>
                <option value="bs-mma">COL - BS - Multimedia Arts and Design</option>
                <option value="ba-fd">COL - BA - Fashion Design and Technology</option>
                <option value="ba-fvx">COL - BA - Film and Visual Effects</option>
                <option value="ba-mpsd">COL - BA - Music Production and Sound Design</option>
                </Select>
                <br />
                <FormLabel>Profile Picture</FormLabel>
                <HStack direction="column" spacing={5} align="center">
                <MotionButton
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={styles.RegisterButton} 
                  colorScheme="blue" 
                  type="submit" 
                  size="sm"
                  >Upload Picture</MotionButton>
                  <FormHelperText>supported formats: JPEG (JPG), PNG, GIF, TIFF, and RAW.</FormHelperText>
                  </HStack>
                <br />
                <FormLabel>Cover Picture</FormLabel>
                <HStack direction="column" spacing={5} align="center">
                <MotionButton
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={styles.RegisterButton} 
                  colorScheme="blue" 
                  type="submit" 
                  size="sm"
                  >Upload Picture</MotionButton>
                  <FormHelperText>supported formats: JPEG (JPG), PNG, GIF, TIFF, and RAW.</FormHelperText>
                  </HStack>
                <br />
                <HStack direction="row" spacing={8} align="center">
                <MotionButton
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={styles.RegisterButton} 
                  colorScheme="yellow" 
                  type="submit" 
                  size="sm"
                  leftIcon={<ArrowLeftIcon />} 
                  >
                <Link href="/register">Previous Page</Link>
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
                <Link href="/home">Register</Link>
                </MotionButton>
                </HStack>
            </FormControl></center>

            <p className={styles.register}>
              <p><Link href="./login"><a>Back to Login</a></Link></p>
            </p>
         
      </motion.main>
      </div>
    )
  }