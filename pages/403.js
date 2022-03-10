import Head from 'next/head'
import { Center, Heading } from "@chakra-ui/react"
import styles from "@styles/404.module.css"
import { Box } from "@chakra-ui/react"
import { extendTheme, useColorModeValue, Image, Text } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { useCookies } from 'react-cookie'

const breakpoints = createBreakpoints({
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  })

const theme = extendTheme({ breakpoints })



export default function Custom403() {

    const { API_URL } = process.env
    const { API_KEY } = process.env

    // const [cookie, setCookies] = useCookies('token', 'encrypte_id')

    // const config = {
    //     headers: { 
    //       'content-type': 'multipart/form-data',
    //       'X-API-KEY': `${API_KEY}`,
    //       'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
    //       // 'Accept-Encoding': 'gzip, deflate, br',
    //       'Accept': 'application/json',
    //       'Token': cookie.token,
    //       'User-Id': cookie.encrypted_id
    //     }
    // }
    
    return (
        <main className={useColorModeValue(styles.container, styles.container2)}>
            <Head>
            <title>403 | Server Error</title>
            <meta name="description" content="Critique Hall generated by Next App" />
            <link rel="icon" href={useColorModeValue('logo256.png', 'logo256-dark.png')} onLoad=""/>
            </Head>
            
            <Box w={{lg: '100%', md: '100%', sm: '100%'}} h={{lg: '100%', md: '100%', sm: '100%'}} p={4}>
                <Box w={{lg: '100%', md: '100%', sm: '100%'}} h={{lg: '100%', md: '100%', sm: '100%'}} p={4} mt='24em'>
                <Center><Image src={useColorModeValue('/404.png', '/404-dark.png')} alt="404" /></Center>
                </Box>
            
            </Box>
            
        </main>
    )
}