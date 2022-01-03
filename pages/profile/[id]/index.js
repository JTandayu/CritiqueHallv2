import Head from 'next/head'
import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import { Box, Button, Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import Link from 'next/link'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react"
import EditProfile from '@component/edit-profile'
import styles from '@styles/Profile.module.css'
import axios from 'axios'
import { useCookies, cookies } from 'react-cookie'

export async function getServerSideProps(context){
    const { API_URL } = process.env
    const { API_KEY } = process.env

    const res = await fetch(`${API_URL}/api/display_profile?user_id=${context.params.id}`, {
        method: 'GET',
        headers: {
            'content-type': 'multipart/form-data',
            'X-API-KEY': `${API_KEY}`,
            'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
            // 'Accept-Encoding': 'gzip, deflate, br',
            'Accept': 'application/json',
        },
    })

    const data = await res.json()

    console.log(data.id)

    return{
        props:{
            data: data.data.user
        }
    }

}

export default function ProfilePage({data}){
    const { API_URL } = process.env
    const { API_KEY } = process.env

    const [cookies, setCookies, removeCookies] = useCookies(['token', 'id', 'encrypted_id'])

    const user_id = cookies.id

    


        // const config = {
        //     headers: { 
        //         'content-type': 'multipart/form-data',
        //         'X-API-KEY': `${API_KEY}`,
        //         'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
        //         // 'Accept-Encoding': 'gzip, deflate, br',
        //         'Accept': 'application/json',
        //     },
        //     user_id: user_id
        // }

        // axios.get(`${API_URL}/api/login`, config)
        // .then(response => {
        //     console.log(response.data);      
        //     // user_id = response.data.id;
        // })
        // .catch(error => {
        //     console.log(error.response);
        // });

        // const res = await fetch(`${API_URL}/api/display_profile`, {
        //     method: 'GET',
        //     headers: {
        //         'content-type': 'multipart/form-data',
        //         'X-API-KEY': `${API_KEY}`,
        //         'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
        //         // 'Accept-Encoding': 'gzip, deflate, br',
        //         'Accept': 'application/json',
        //     },
        //     user_id : user_id
        // })

        // const data = await res.json()
        // console.log(data)
        // console.log(user_id)


 
    return(
        <main className={styles.container}>

            <Head>
                <title>User</title>
                <meta name="description" content="Critique Hall generated by Next App" />
                <link rel="icon" href="/logo256.png" onLoad=""/>
            </Head>

            <Box mx={{lg: 'auto', md: '0', sm: '0'}} my='auto' bg='blue.200' w={{lg: '90%', md: '100%', sm: '100%'}} h={{lg: '80vh', md: '100vh', sm: '150vh'}} rounded='lg' mt={32} mb={{lg: 0, md: 0, sm: 10}} position='static'>
                <Box display='flex' flexDir={{lg: 'row', md: 'column', sm: 'column'}} w='100%'>
                    <Box w={{lg: '100vw', md: '100%', sm: '90%'}} h='35vh' bg='white' p={3} mt={5} ml={{lg: 8, md: 0, sm: 5}} rounded='lg'>
                        <Box w='20vh' h='20vh' bg='gray' mt={24} ml={{lg: 5, md: 0, sm: 0}} mx={{lg: 0, md: 0, sm: 'auto'}} rounded='full'></Box>
                        
                    </Box>
                    <Box w={{lg: '70vw', md: '100%', sm: '90%'}} h={{lg: '35vh', md: '40vh', sm: '45vh'}} bg='blue.500' p={3} mt={5} ml={{lg: 8, md: 0, sm: 5}} mr={{lg: 5, md: 0, sm: 0}} rounded='lg'>
                        <Flex>
                        <Heading size='2xl' as='h3' color='white' mt={10}>About Me: </Heading>
                        <Spacer />
                            <EditProfile/>
                        </Flex>
                        <Text w={{lg: '65vh', md: '100%', sm: '100%'}} fontSize='md' color="white">LoremMinim eu pariatur enim laborum. Excepteur veniam voluptate dolor voluptate dolor officia et ea commodo cupidatat consequat officia in. Dolor laboris mollit exercitation proident commodo quis aute enim laboris. </Text>
                        <Heading size='md' color='white' mt={5}>Reputation Points: {data.reputation_points}</Heading>
                        <Heading size='md' color='white' mt={5}>Strand/Specialization: {data.specialization}</Heading>
                    </Box>
                </Box>
                <Box display='flex' w={{lg: '30%', md: '100%', sm: '100%'}} mt={5}>
                    {/* <Button ml={5} h='2em' position='static'>All</Button> */}
                    <Button ml={5} h='2em' position='static'>My Posts</Button>
                    <Button ml={5} h='2em' position='static'>My Critiques</Button>
                </Box>
                <Box display='flex' h='35vh' p={3} mt={5} ml={3} w='98%' rounded='lg'>

                </Box>
            </Box>
        </main>
    )

};
