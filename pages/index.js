import Head from 'next/head'
import styles from "@styles/Welcome.module.css";
import { motion } from "framer-motion"
import Link from 'next/link'
import { Stack, HStack, VStack, useColorMode, FormLabel, Input, Textarea } from "@chakra-ui/react"
import { Button, ButtonGroup } from "@chakra-ui/react"
import { ArrowForwardIcon, CheckIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { Box, Divider, Flex, Heading, Spacer, Image, Center } from "@chakra-ui/react"
import axios from 'axios';
import {useState} from 'react';
import ManTexting from "@public/man-texting.png";
import { useColorModeValue } from "@chakra-ui/react";


const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const imageLoader = ({ src, width, quality }) => {
  return `/${src}?=${width}&q=${quality || 100}`
}

const MotionButton = motion(Button)

export default function Welcome() {
  const { API_URL } = process.env
  const { API_KEY } = process.env

  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const sendMessage = () =>{

      let formData = new FormData(); 
      formData.append('email', email);   //append the values with key, value pair
      formData.append('full_name', fullName);
      formData.append('subject', subject);
      formData.append('message', message);

      const config = {
        headers: { 
          'content-type': 'multipart/form-data',
          'X-API-KEY': `${API_KEY}`,
          'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
          'Accept': 'application/json',
        }
      }

      axios.post(`${API_URL}/api/email_suggestion`, formData, config)
      .then(response => {
          console.log(response.data);
          window.location.href = "/"
      })
      .catch(error => {
          console.log(error);
      });

  }
  
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Critique Hall | Welcome</title>
        <meta name="description" content="Critique Hall generated by Next App" />
        <link rel="icon" href="/logo256.png" onLoad=""/>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap" rel="stylesheet" />
      </Head>



      <Box position='static' bgColor={useColorModeValue('#E5E5E5', '#2E2E2E')} w="100%" h={{lg: '75vh', md: '100%', sm: '100%'}} display={{lg: 'flex', md: 'flex', sm: 'block'}} z-index='-1' boxShadow='lg' borderBottom="1px solid black">
            <Flex mt={44} flexDir='column' align='center' w={{lg: '50vw', md: '100%', sm: '100%'}}>
              <Heading size='3xl' >WELCOME TO</Heading>
              <Image src='critiquehall.png' w={{lg: '500px', md: '500px', sm: '500px'}} h='37vh' mt={5}/>
              <Link href="/login"><Button size='lg' type='submit' mt={5} colorScheme='red' position='static' passHref>Get Started</Button></Link>
            </Flex>
            <Image src='man-texting.png' w={{lg: '600px', md: '600px', sm: '600px'}} h='60vh' mt='10vh' mb='5vh' mr='10vw' align='center' />
          </Box>

          <Box position='static' bgColor={useColorModeValue('#EFEFEF', '#242424')} w="100%" h="100%" display={{lg: 'flex', md: 'flex', sm: 'block'}} boxShadow='lg' borderBottom="1px solid black">
            <Flex flexDir={{lg: 'row', md: 'row', sm: 'column'}} >
              <Flex w={{lg: '45vw', md: '100%', sm: '100%'}}>
              <Image src='discussions.png' w={{lg: '700px', md: '700px', sm: '700px'}} h='60vh' mt='10vh' ml='7vw' align='center'/>
              </Flex>
              <Spacer />
              <Flex mt={16} flexDir='column' align='center' w={{lg: '45vw', md: '100%', sm: '100%'}}>
                <Heading size='3xl'>WHAT IS</Heading>
                
                <Flex flexDir={{lg: 'row', md: 'row', sm: 'column'}}>
                  <Image src='critiquehall.png' w={{lg: '500px', md: '500px', sm: '500px'}} h='37vh' mt={5}/>
                  <Heading size='3xl' my='auto' mx={{lg: '0', md: '0', sm: 'auto'}}>?</Heading>
                </Flex>
                <Heading size='xl' w={{lg: '30vw', md: '100%', sm: '100%'}} align='center' mt={5} mb={10}>An Open Forum Web Application for Students and Teachers</Heading>
              </Flex>
            </Flex>
          </Box>

          {/* <Divider position='static' /> */}

          <Box position='static' bgColor={useColorModeValue('#E5E5E5', '#2E2E2E')}  w="100%" h="100%" display={{lg: 'flex', md: 'flex', sm: 'block'}} boxShadow='lg' borderBottom="1px solid black">

            <Flex flexDir={{lg: 'row', md: 'row', sm: 'column'}} >
              <Flex mt={16} flexDir='column' align='center' w={{lg: '45vw', md: '100%', sm: '100%'}}>
                <Heading size='3xl' >GOAL OF</Heading>
                <Image src='critiquehall.png' w={{lg: '500px', md: '500px', sm: '500px'}} h='37vh' mt={5}/>
              </Flex>
              <Spacer />
              <Flex flexDir="column" mt={{lg: 16, md: 5, sm: 5}} w={{lg: '45vw', md: '100%', sm: '100%'}}>
                <Heading size='lg' w={{lg: '45vw', md: '100%', sm: '100%'}} align='center'>To meet the student and teacher&apos;s needs with regards to academic lives and personal development.</Heading>
                <Image src='SOB.png' w={{lg: '900px', md: '900px', sm: '900px'}} h='60vh' mt='-2vh' mr='20vw' align='center'/>
              </Flex>
            </Flex>
              
          </Box>


          {/* <Divider position='static' /> */}

          <Box position='static' bgColor={useColorModeValue('#EFEFEF', '#242424')} boxShadow='lg' w="100%" h="100%" display={{lg: 'flex', md: 'flex', sm: 'block'}}>
            <Flex flexDir='column' w='100%'>
            <Flex flexDir='column' w='100%'>
              <Heading size='4xl' align='center' w='100%' mt={5}>WE'D LOVE TO HEAR FROM YOU</Heading>
              <Heading size='lg' align='center' w='100%' mt={5}>Send your feedbacks and suggestions and we&apos;ll answer it for you.</Heading>
            </Flex>
            <form action='' method='POST'>
              <Flex w='100%' flexDir={{lg: 'row', md: 'column', sm: 'column'}} align='center'  mt={20}>
                <Box w='30vw'>
                <Image src='announcer.png' w={{lg: '300px', md: '300px', sm: '300px'}} h='300px' mt='-5vh' ml='5vw' align='center'/>
                </Box>
              
                <Flex flexDir='column' w='100%' align='center'>

                  <Flex align='center' flexDir={{lg: 'row', md: 'row', sm: 'column'}} w={{lg: '40vw', md: '40vw', sm: '100%'}} color='black'>
                      <Input type='text' w={{lg: '13vw', md: '13vw', sm: '100%'}} placeholder='Email Address' onChange={(e)=>setEmail(e.target.value)}></Input>
                      <Spacer />
                      <Input type='text' w={{lg: '13vw', md: '13vw', sm: '100%'}} mt={{lg: 0, md: 0, sm: 5}} placeholder='Full Name' onChange={(e)=>setFullName(e.target.value)}></Input>
                      <Spacer />
                      <Input type='text' w={{lg: '13vw', md: '13vw', sm: '100%'}} mt={{lg: 0, md: 0, sm: 5}} placeholder='Subject' onChange={(e)=>setSubject(e.target.value)}></Input>
                  </Flex>
                  <Textarea w={{lg: '40vw', md: '40vw', sm: '100%'}} h='20vh' mt={5} placeholder='Message...' mr={{lg: 0, md: 0, sm: 5}} onChange={(e)=>setMessage(e.target.value)} />
                
                </Flex>
                <Flex w={{lg: '20vw', md: '100%', sm: '100%'}} mt={{lg: 0, md: 0, sm: 5}} >
                  <Button size='lg' colorScheme='blue' w={{lg: '10vw', md: '20vw', sm: '20vw'}} mr={{lg: 48, md: 0, sm: 0}} mx={{lg: 0, md: 0, sm: 'auto'}} onClick={sendMessage} >Submit</Button>
                </Flex>
              </Flex>
              </form>
            </Flex>
            
              
          </Box> 


      {/* <div className={styles.main}>

      </div>
      <div className={styles.main}>
        
      </div>
      <div className={styles.main}>
        
      </div> */}
    </div>
  )
}