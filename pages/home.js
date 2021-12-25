import Head from 'next/head'
// import Image from 'next/image'
import { Center, Image } from '@chakra-ui/react'
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

const breakpoints = createBreakpoints({
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  })

const theme = extendTheme({ breakpoints })

// export const getStaticProps = async () => {
//     const res = await fetch (`https://jsonplaceholder.typicode.com/posts`)
//     const articles = await res.json()

//     return{
//         props:{
//             articles
//         }
//     }
// }


export default function Home(){
    return(
        <main className={styles.container} w="100%">
          <Head>
            <title>Home</title>
            <meta name="description" content="Critique Hall generated by Next App" />
            <link rel="icon" href="/logo256.png" onLoad=""/>
          </Head>

          <Box position='static' w="100%" h="70vh" display={{lg: 'flex', md: 'flex', sm: 'block'}} z-index='-1' borderBottom="1px solid black">
            <Flex mt={44} flexDir='column' align='center' w='50vw'>
              <Heading size='3xl' >WELCOME TO</Heading>
              <Image src='critiquehall.png' w='30vw' h='37vh' mt={5}/>
            </Flex>
              
          </Box>

          <Box position='static' w="100%" h="70vh" display={{lg: 'flex', md: 'flex', sm: 'block'}} borderBottom="1px solid black">
            <Flex >
              <Flex w='45vw'>

              </Flex>
              <Spacer />
              <Flex mt={16} flexDir='column' align='center' w='45vw'>
                <Heading size='3xl'>WHAT IS</Heading>
                <Flex>
                  <Image src='critiquehall.png' w='30vw' h='37vh' mt={5}/>
                  <Heading size='3xl' my='auto'>?</Heading>
                  
                </Flex>
                <Heading size='xl' w='30vw' align='center' mt={5}>An Open Forum Web Application for Students and Teachers</Heading>
              </Flex>
            </Flex>
              
          </Box>

          {/* <Divider position='static' /> */}

          <Box position='static' w="100%" h="70vh" display={{lg: 'flex', md: 'flex', sm: 'block'}} borderBottom="1px solid black">

            <Flex>
              <Flex mt={16} flexDir='column' align='center' w='45vw'>
                <Heading size='3xl' >GOAL OF</Heading>
                <Image src='critiquehall.png' w='30vw' h='37vh' mt={5}/>
              </Flex>
              <Spacer />
              <Flex mt={16} w='45vw'>
                <Heading size='lg' w='45vw' align='center'>To meet the student and teacher’s needs with regards to academic lives and personal development.</Heading>
              </Flex>
            </Flex>
              
          </Box>

          {/* <Divider position='static' /> */}

          <Box position='static' w="100%" h="80vh" display={{lg: 'flex', md: 'flex', sm: 'block'}}>
            <Heading size='3xl' align='center' w='100%' mt={5}>Halls</Heading>
              
          </Box>  

        </main>
    )
}

