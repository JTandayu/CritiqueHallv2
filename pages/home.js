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
import { extendTheme } from '@chakra-ui/react'
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
        <main className={useColorModeValue(styles.container, styles.container2)} w="100%">
          <Head>
            <title>Critique Hall | Home</title>
            <meta name="description" content="Critique Hall generated by Next App" />
            <link rel="icon" href={useColorModeValue('logo256.png', 'logo256-dark.png')} onLoad=""/>
            <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap" rel="stylesheet" />
          </Head>

          <Box position='static' bgColor={useColorModeValue('#E5E5E5', '#2E2E2E')} w="100%" h={{lg: '75vh', md: '100%', sm: '100%'}} display={{lg: 'flex', md: 'flex', sm: 'block'}} z-index='-1' boxShadow='lg'>
          <Flex mt={44} flexDir='column' align='center' w={{lg: '50vw', md: '100%', sm: '100%'}}>
              <Image src={HomeTitle} w='550px' h='50px'/>
              <br />
              <Image src={Desc1} w='800px' h='150px' ml={'30%'}/>
              <br />
              <Image src={Desc2} w='700px' h='100px' ml={'18%'}/>
              {/* <Image className={styles.drop_shadow} src={useColorModeValue('critiquehall.png', 'critiquehall-dark.png')}  alt="Critique Hall Logo" w={{lg: '500px', md: '500px', sm: '500px'}} h='37vh' mt={5}/> */}
              {/* <Link href="/login"><Button type='submit' mt={5} colorScheme='red' position='static'>Get Started</Button></Link> */}
            </Flex>
            <Image src='PeopleDiscuss.png' w={{lg: '70%', md: '600px', sm: '600px'}} h='60vh' mt='10vh' mb='5vh' mr={5} align='center' alt="Man Texting"/>
          </Box>

            {/* <form onSubmit={formHandler}>
              <input type='file' />
              <Button type='submit' />
            </form>
            <h3>Uploaded {progress} %</h3> */}

          {/* <Box position='static' bgColor={useColorModeValue('#EFEFEF', '#242424')} w="100%" h="100%" display={{lg: 'flex', md: 'flex', sm: 'block'}} boxShadow='lg'>
            <Flex flexDir={{lg: 'row', md: 'row', sm: 'column'}} >
              <Flex w={{lg: '45vw', md: '100%', sm: '100%'}}>
              <Image src='discussions.png' w={{lg: '700px', md: '700px', sm: '700px'}} h='60vh' mt='10vh' ml='7vw' align='center' alt="Group Discussions"/>
              </Flex>
              <Spacer />
              <Flex mt={16} flexDir='column' align='center' w={{lg: '45vw', md: '100%', sm: '100%'}}>
                <Heading fontFamily={'Raleway'} size='3xl'>WHAT IS</Heading>
                
                <Flex flexDir={{lg: 'row', md: 'row', sm: 'column'}}>
                <Image className={styles.drop_shadow} src={useColorModeValue('critiquehall.png', 'critiquehall-dark.png')}  alt="Critique Hall Logo" w={{lg: '500px', md: '500px', sm: '500px'}} h='37vh' mt={5}/>
                  <Heading fontFamily={'Raleway'}  size='3xl' my='auto' mx={{lg: '0', md: '0', sm: 'auto'}}>?</Heading>
                </Flex>
                <Heading fontFamily={'Raleway'} size='xl' w={{lg: '30vw', md: '100%', sm: '100%'}} align='center' mt={5} mb={10}>An Open Forum Web Application for Students and Teachers</Heading>
              </Flex>
            </Flex>
          </Box> */}

          {/* <Divider position='static' /> */}

          {/* <Box position='static' bgColor={useColorModeValue('#E5E5E5', '#2E2E2E')}  w="100%" h="100%" display={{lg: 'flex', md: 'flex', sm: 'block'}} boxShadow='lg'>

            <Flex flexDir={{lg: 'row', md: 'row', sm: 'column'}} >
              <Flex mt={16} flexDir='column' align='center' w={{lg: '45vw', md: '100%', sm: '100%'}}>
                <Heading fontFamily={'Raleway'} size='3xl' >GOAL OF</Heading>
                <Image className={styles.drop_shadow} src={useColorModeValue('critiquehall.png', 'critiquehall-dark.png')} alt="Critique Hall Logo" w={{lg: '500px', md: '500px', sm: '500px'}} h='37vh' mt={5}/>
              </Flex>
              <Spacer />
              <Flex flexDir="column" mt={{lg: 16, md: 5, sm: 5}} w={{lg: '45vw', md: '100%', sm: '100%'}}>
                <Heading fontFamily={'Raleway'} size='lg' w={{lg: '45vw', md: '100%', sm: '100%'}} align='center'>To meet the student and teacher’s needs with regards to academic lives and personal development.</Heading>
                <Image src='SOB.png' w={{lg: '900px', md: '900px', sm: '900px'}} h='60vh' mt='-2vh' mr='20vw' align='center' alt="SOB Image"/>
              </Flex>
            </Flex>
              
          </Box> */}

          {/* <Divider position='static' /> */}
          {/* <Box position='static' bgColor={useColorModeValue('#EFEFEF', '#242424')} boxShadow='lg' w="100%" h="100%" display={{lg: 'flex', md: 'flex', sm: 'block'}}>
          <Image src={useColorModeValue('halls-banner.png', 'halls-banner-dark.png')}  w={{lg: '100%', md: '100%', sm: '100%', base: '100%'}} alt="HallsBanner" />
          </Box> */}

          <Box position='static' bgColor={useColorModeValue('#29226E', '#000000')} boxShadow='lg' w="100%" h="55vh" display={{lg: 'flex', md: 'flex', sm: 'block'}} flexDir='column' className={styles.halls}>
            {/* <Heading fontFamily={'Raleway'} size='3xl' align='center' w='100%' mt={5}>HALLS</Heading> */}
            <Flex mt='10vh' w={{lg: '90%', md: '100vw', sm: '100vw'}} mx='auto' overflowX='auto'>
              <Box w={{lg: '20vw', md: '100%', sm: '100%'}} h='40vh' bgImage={'Arts.png'} bgPosition={'center'} bg borderRadius={10}>
                <Center mt='80%'>
                <Link href='/critique' passHref={true}><Button size="lg" fontFamily={'Raleway'} fontSize="2xl" ml={5} bgColor={useColorModeValue('#A88816', '#A88816')} _hover={{bgColor: useColorModeValue('#483C10', '#483C10')}} color='white'>View</Button></Link>
                </Center>
              </Box>
              <Spacer />
              <Box w={{lg: '20vw', md: '100%', sm: '100%'}} h='40vh' bgImage={'Business.png'} bgPosition={'center'} ml={{lg: '0', md: '0', sm: '20vw'}} borderRadius={10}>
                {/* <Heading fontFamily={'Raleway'} align='center' mt={5} color='white'>Business</Heading> */}
                <Center mt='80%'>
                <Link href='/critique' passHref={true}><Button size="lg" fontFamily={'Raleway'} fontSize="2xl" ml={5} bgColor={useColorModeValue('#850306', '#850306')} _hover={{bgColor: useColorModeValue('#4a0305', '#4a0305')}} color='white'>View</Button></Link>
                </Center>
              </Box>
              <Spacer />
              <Box w={{lg: '20vw', md: '100%', sm: '100%'}} h='40vh' bgImage={'Technology.png'} bgPosition={'center'} borderRadius={10}>
                {/* <Heading fontFamily={'Raleway'} align='center' mt={5} color='white' >Technology</Heading> */}
                <Center mt='80%'>
                <Link href='/critique' passHref={true}><Button size="lg" fontFamily={'Raleway'} fontSize="2xl" ml={5} bgColor={useColorModeValue('#31518f', '#31518f')} _hover={{bgColor: useColorModeValue('#09255c', '#09255c')}} color='white'>View</Button></Link>
                </Center>
              </Box>
              <Spacer />
              <Box w={{lg: '20vw', md: '100%', sm: '100%'}} h='40vh' bgImage={'Lounge.png'} bgPosition={'center'} borderRadius={10}>
                {/* <Heading fontFamily={'Raleway'} align='center' mt={5} color='white' >Lounge</Heading> */}
                <Center mt='80%'>
                <Link href='/critique' passHref={true}><Button size="lg" fontFamily={'Raleway'} fontSize="2xl" ml={5} bgColor={useColorModeValue('#00786f', '#00786f')} _hover={{bgColor: useColorModeValue('#003834', '#003834')}} color='white'>View</Button></Link>
                </Center>
              </Box>
            </Flex>

              {/* <Carousel autoFocus={true} infiniteLoop={true} centerMode={true} interval={3000} width={{lg: '100%', base: '100%'}} showThumbs={false} emulateTouch={true} swipeable={true}>
                <div>
                <Image src={useColorModeValue('technology-banner.png', 'technology-banner-dark.png')} h={{lg: '100%', md: '100%', sm: '100%', base: '100%'}} w={{lg: '100%', md: '100%', sm: '100%', base: '100%'}} alt="TechnologyBanner" />
                <Text fontFamily={'Raleway'} className="legend" _hover={{cursor: 'pointer', textDecoration: 'underline'}}><ShowHallDescription hall='Technology' color="#b303ff" fontColor='black' /></Text>
                </div>
                <div>
                <Image src={useColorModeValue('arts-banner.png', 'arts-banner-dark.png')} h={{lg: '100%', md: '100%', sm: '100%', base: '100%'}} w={{lg: '100%', md: '100%', sm: '100%', base: '100%'}} alt="ArtsBanner" />
                <Text fontFamily={'Raleway'} className="legend" _hover={{cursor: 'pointer', textDecoration: 'underline'}}><ShowHallDescription hall='Arts' color='#6ec5ff' fontColor='black' /></Text>
                </div>
                <div>
                <Image src={useColorModeValue('business-banner.png', 'business-banner-dark.png')} h={{lg: '100%', md: '100%', sm: '100%', base: '100%'}} w={{lg: '100%', md: '100%', sm: '100%', base: '100%'}} alt="BusinessBanner" />
                <Text fontFamily={'Raleway'} className="legend" _hover={{cursor: 'pointer', textDecoration: 'underline'}}><ShowHallDescription hall='Business' color='#fa3434' fontColor='black'/></Text>
                </div>
                <div>
                <Image src={useColorModeValue('lounge-banner.png', 'lounge-banner-dark.png')} h={{lg: '100%', md: '100%', sm: '100%', base: '100%'}} w={{lg: '100%', md: '100%', sm: '100%', base: '100%'}} alt="LoungeBanner" />
                <Text fontFamily={'Raleway'} className="legend" _hover={{cursor: 'pointer', textDecoration: 'underline'}}><ShowHallDescription hall='Lounge' color='#44fcd0' fontColor='black'/></Text>
                </div>
            </Carousel> */}
          </Box>  

        </main>
    )
}

export default Home

