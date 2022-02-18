import Head from 'next/head'
// import Image from 'next/image'
import { Center, Image, Text } from '@chakra-ui/react'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import Layout from './layout/layout'
import styles from "@styles/Home.module.css";
import { Box, Divider } from "@chakra-ui/react"
import { Spacer } from "@chakra-ui/react"
import { Heading } from '@chakra-ui/react'
import { extendTheme, SimpleGrid } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { Button, ButtonGroup } from "@chakra-ui/react"
import { ChevronDownIcon } from '@chakra-ui/icons'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuIcon,
    MenuCommand,
    MenuDivider,
    Flex
  } from '@chakra-ui/react'
import Logo from "@public/critiquehall.png";
import ArtBanner from "@public/Arts.png";
import BusinessBanner from "@public/Business.png";
import LoungeBanner from "@public/Lounge.png";
import TechnologyBanner from "@public/Technology.png"; 
import { useRouter } from "next/router";
import { useCookies } from 'react-cookie'
import { storage } from '../firebase.js'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import {useState} from 'react'
import ShowHallDescription from '@component/show-hall-description'
import { useColorModeValue } from "@chakra-ui/react";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link'
import ScrollToTop from "react-scroll-to-top";
import TermsAndConditions from '@component/terms-and-conditions';
import PrivacyPolicy from '@component/privacy-policy'


const breakpoints = createBreakpoints({
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  })

const theme = extendTheme({ breakpoints })

function Home(){

  const HomeTitle = useColorModeValue('/WelcomeToCritiqueHall.png', '/WelcomeToCritiqueHall-Dark.png')
  const Desc1 = useColorModeValue('/Desc1.png', '/Desc1-Dark.png')
  const Desc2 = useColorModeValue('/Desc2.png', '/Desc2-Dark.png')

    return(
      <> 
        <main className={useColorModeValue(styles.container, styles.container2)}>
          <Head>
            <title>Critique Hall | Home</title>
            <meta name="description" content="Critique Hall generated by Next App" />
            <link rel="icon" href={useColorModeValue('/logo256.png', '/logo256-dark.png')} onLoad=""/>
            <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap" rel="stylesheet" />
          </Head>

          <ScrollToTop color={'black'} width={40} boxShadow={'dark-lg'} smooth />
          {/* Clear */}
          <Box bgColor={useColorModeValue('#E5E5E5', '#2E2E2E')} w="100%" h={{lg: '75vh', md: '100%', sm: '100%'}} display={{lg: 'flex', md: 'block', sm: 'block', base: 'block'}} boxShadow='lg'>
            <Flex mt={{lg: 44, base: '40%'}} flexDir={{lg: 'column', base: 'column'}} align='center' w={{lg: '50vw', md: '100%', sm: '100%', base: "100%"}}>
              <Image src={HomeTitle} w={{lg: '550px', base: '20em'}} h={{lg: '50px',  base: '2em'}}/>
              <br />
              <Image src={Desc1} w={{lg: '800px', base: "100%"}} h={{lg: '150px', base: "100%"}} ml={{lg: '30%', md: 0, base: 0}}/>
              <br />
              <Image src={Desc2} w={{lg: '800px', base: "100%"}} h={{lg: '120px', base: "100%"}} ml={{lg: '30%', md: 0, base: 0}}/>

            </Flex>
            <Image src='PeopleDiscuss.png' w={{lg: '70%', md: '600px', sm: '600px', base: '100%'}} h={{lg: '60vh', base: '30%'}} mt={{lg: '10vh', base: '2vh'}} mb='5vh' mr={{lg: 5, base: 0}} align='center' alt="Man Texting"/>
          
          </Box>


          {/* Clear */}
          <Box position='static' bgColor={useColorModeValue('#29226E', '#000000')} boxShadow='lg' w="100%" h="55vh" display={{lg: 'flex', md: 'flex', sm: 'block', base: "block"}} flexDir='column' className={styles.halls} overflowX='auto'>
            <Flex mt='10vh' w={{lg: '90%', md: '100vw', sm: '400vw' , base: '300vw'}} mx='auto' overflowX='auto'>
              <Box w={{lg: '20vw', md: '100%', sm: '100%', base: "100%"}} h='40vh' bgImage={'Arts.png'} bgPosition={'center'} bgSize="cover" borderRadius={10}>
                <Center mt='80%'>
                <Link href='/critique' passHref={true}><Button size="lg" fontFamily={'Raleway'} fontSize="2xl" ml={5} bgColor={useColorModeValue('#A88816', '#A88816')} _hover={{bgColor: useColorModeValue('#483C10', '#483C10')}} color='white'>View</Button></Link>
                </Center>
              </Box>
              <Spacer />
              <Box w={{lg: '20vw', md: '100%', sm: '100%' , base: "100%"}} h='40vh' bgImage={'Business.png'} bgPosition={'center'} bgSize="cover" ml={{lg: '0', md: '0', sm: '20vw'}} borderRadius={10} objectFit="cover">
                <Center mt='80%'>
                <Link href='/critique' passHref={true}><Button size="lg" fontFamily={'Raleway'} fontSize="2xl" ml={5} bgColor={useColorModeValue('#850306', '#850306')} _hover={{bgColor: useColorModeValue('#4a0305', '#4a0305')}} color='white'>View</Button></Link>
                </Center>
              </Box>
              <Spacer />
              <Box w={{lg: '20vw', md: '100%', sm: '100%' , base: "100%"}} h='40vh' bgImage={'Technology.png'} bgPosition={'center'} bgSize="cover" borderRadius={10}>
                <Center mt='80%'>
                <Link href='/critique' passHref={true}><Button size="lg" fontFamily={'Raleway'} fontSize="2xl" ml={5} bgColor={useColorModeValue('#31518f', '#31518f')} _hover={{bgColor: useColorModeValue('#09255c', '#09255c')}} color='white'>View</Button></Link>
                </Center>
              </Box>
              <Spacer />
              <Box w={{lg: '20vw', md: '100%', sm: '100%' , base: "100%"}} h='40vh' bgImage={'Lounge.png'} bgPosition={'center'} bgSize="cover" borderRadius={10}>
                <Center mt='80%'>
                <Link href='/critique' passHref={true}><Button size="lg" fontFamily={'Raleway'} fontSize="2xl" ml={5} bgColor={useColorModeValue('#00786f', '#00786f')} _hover={{bgColor: useColorModeValue('#003834', '#003834')}} color='white'>View</Button></Link>
                </Center>
              </Box>
            </Flex>
          </Box> 
           
           {/* Problem */}
          <Box w="100%" h={{'2xl': "25vh", lg: "30vh", base: "100%"}} bgColor={useColorModeValue("#E7E7E7", "#2E2E2E")} p={7} display="flex" flexDir={{base: "column", lg: "row"}}>
            <Box w={{lg: "45%", base: "100%"}}>
                <Heading fontSize={{lg: '3xl', base: '3xl'}} fontFamily={'Raleway'} color={useColorModeValue("#C1272D", "#FF5C61")}>Our Story</Heading>
                <Text fontFamily={'Raleway'} fontSize={{lg: 'lg', base: 'xs'}} ml={{lg: 2, base: '1%'}} pr={{lg: 16, base: 1}} mt={5} textAlign='justify'>This project began last October and was made possible by four 4th year friends from Web Development. We understood the hardships brought about by the new normal, that is why Critique Hall was developed to serve as a place for students to not only connect but also learn from each other.</Text>
                <Text fontFamily={'Raleway'} fontSize={{lg: 'lg', base: 'xs'}} display="flex"  ml={{lg: 2, base: '1%'}} mt={{lg: 1, base: 5}}>For Inquiries, send an email to <Text fontFamily={'Raleway'} color="#1BA3C1" ml={1}>critiquehall@gmail.com</Text></Text>
            </Box>
            <Spacer />
            
            <Box w={{lg: "60%", base: "100%"}}>
                <Heading size="xl" w="full" fontFamily={'Raleway'} fontSize={{lg: '3xl', base: '3xl'}} color={useColorModeValue("#C1272D", "#FF5C61")} mt={{lg: 1, base: 5}}>The Researchers</Heading>
                <Box w="full" mt={5}>
                  {/* Problem for laptops */}
                    <SimpleGrid columns={{lg: 2, md: 2, sm: 1, base: 1}} spacing={{'2xl': 3, lg: 5}} >
                        <Box w={{'2xl': '30em', lg: "23em", base: "100%"}} px={{lg: 3, base: 3}}>
                            <Flex>
                                <Text fontFamily={'Raleway'} fontSize={{'2xl': 'lg', lg: 'sm', base: 'xs'}} color={useColorModeValue("#29226E", "#B2A3FF")}>Azariah Danizar G. Concepcion</Text>
                                <Text fontFamily={'Raleway'} fontSize={{'2xl': 'lg', lg: 'sm', base: 'xs'}} ml={{lg: 5, base: '4vh'}}>Back-end Dev</Text>
                            </Flex>
                            <Text fontFamily={'Raleway'} fontSize={{lg: 'lg', base: 'xs'}} ml={{base: '10vh'}} mt={{base: 2}}>(+63) 949 846 0846</Text>
                        </Box>
                        <Box w={{'2xl': '30em',lg: "23em", base: "100%"}} px={{lg: 3, base: 3}}>
                            <Flex> 
                                <Text fontFamily={'Raleway'} fontSize={{'2xl': 'lg', lg: 'sm', base: 'xs'}} color={useColorModeValue("#29226E", "#B2A3FF")}>Richie Gene R. Tan</Text>
                                <Text fontFamily={'Raleway'} fontSize={{'2xl': 'lg', lg: 'sm', base: 'xs'}} ml={{lg: 8, base: '10vh'}}>UI/UX Designer</Text>
                            </Flex>
                            <Text fontFamily={'Raleway'} fontSize={{lg: 'lg', base: 'xs'}} ml={{base: '10vh'}} mt={{base: 2}}>(+63) 916 424 9531</Text>
                        </Box>
                        <Box w={{'2xl': '30em',lg: "23em", base: "100%"}} px={{lg: 3, base: 3}}>
                            <Flex>
                                <Text fontFamily={'Raleway'} fontSize={{'2xl': 'lg', lg: 'sm', base: 'xs'}} color={useColorModeValue("#29226E", "#B2A3FF")}>Jomari L. Matias</Text>
                                <Text fontFamily={'Raleway'} fontSize={{'2xl': 'lg', lg: 'sm', base: 'xs'}} ml={{lg: 5, base: '8vh'}}>Project Documentarian</Text>
                            </Flex>
                            <Text fontFamily={'Raleway'} fontSize={{lg: 'lg', base: 'xs'}} ml={{base: '10vh'}} mt={{base: 2}}>(+63) 998 084 4162</Text>
                        </Box>
                        <Box w={{'2xl': '30em',lg: "23em", base: "100%"}} px={{lg: 3, base: 3}}>
                            <Flex>
                                <Text fontFamily={'Raleway'} fontSize={{'2xl': 'lg', lg: 'sm', base: 'xs'}} color={useColorModeValue("#29226E", "#B2A3FF")}>Jose Luis P. Tandayu</Text>
                                <Text fontFamily={'Raleway'} fontSize={{'2xl': 'lg', lg: 'sm', base: 'xs'}} ml={{lg: 5, base: '8vh'}}>Front-end Dev</Text>
                            </Flex>
                            <Text fontFamily={'Raleway'} fontSize={{lg: 'lg', base: 'xs'}} ml={{base: '10vh'}} mt={{base: 2}}>(+63) 916 418 7235</Text>
                        </Box>
                    </SimpleGrid>
                </Box>
            </Box>
        </Box>

        {/* Clear */}
        <Box w="100%" bgColor={useColorModeValue("#E7E7E7", "#2E2E2E")}>
                <Center>
                <Text fontFamily={'Raleway'} fontSize={{lg: 'md', base: 'xs'}} fontWeight={'bold'} mt={{lg: 10, base: 3}} mb={1}><PrivacyPolicy /></Text>
                <Text fontFamily={'Raleway'} fontSize={{lg: 'md', base: 'xs'}} fontWeight={'bold'} mt={{lg: 10, base: 3}} ml={{lg: '2%', base: 5}} mb={1}><TermsAndConditions /></Text>
                </Center>
                </Box>
        <Box w="100%" bgColor={useColorModeValue("#E7E7E7", "#2E2E2E")}>
                <Center>
                <Text fontFamily={'Raleway'} fontSize={{lg: 'md', base: 'xs'}} fontWeight={'bold'} mt={3}>© 2022</Text>
                <Image src={useColorModeValue("/critiquehall2.png", "/critiquehall2-dark.png")} alt='Critique Hall Logo' w={{lg: '100px', md: '150px', sm: '150px', base: '70px'}} h={{lg: '30px', md: '30px', sm: '30px', base: '20px'}} ml={2}/>
                <Text fontFamily={'Raleway'} fontSize={{lg: 'md', base: 'xs'}} fontWeight={'bold'} mt={3} ml={2}>All Rights Reserved </Text>
                </Center>
                </Box>
        </main>
        </>
    )
}

export default Home

