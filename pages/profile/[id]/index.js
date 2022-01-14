import Head from 'next/head'
// import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import { Box, Button, Flex, Heading, Spacer, Text, Image, Center } from '@chakra-ui/react'
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
import { useState, useEffect } from 'react'
import { useCookies, cookies } from 'react-cookie'

export async function getServerSideProps(context){
    const { API_URL } = process.env
    const { API_KEY } = process.env

    // const res = await fetch(`${API_URL}/api/display_profile?user_id=${context.params.id}`, {
    //     method: 'GET',
    //     headers: {
    //         'content-type': 'multipart/form-data',
    //         'X-API-KEY': `${API_KEY}`,
    //         'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
    //         // 'Accept-Encoding': 'gzip, deflate, br',
    //         'Accept': 'application/json',
    //     },
    // })

    // const data = await res.json()
    const data = context.params.id

    // console.log(data.id)

    return{
        props:{
            data
        }
    }

}

export default function ProfilePage({data}){
    const { API_URL } = process.env
    const { API_KEY } = process.env

    const [cookies, setCookies, removeCookies] = useCookies(['token', 'id', 'encrypted_id'])
    const [userData, setUserData] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [userCritique, setUserCritique] = useState([])

    // const user_id = cookies.id
    useEffect(() => {

        document.getElementById('posts').removeAttribute('hidden');
        document.getElementById('critiques').hidden=true;

        const config = {
            headers: { 
                'content-type': 'multipart/form-data',
                'X-API-KEY': `${API_KEY}`,
                'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
                // 'Accept-Encoding': 'gzip, deflate, br',
                'Accept': 'application/json',
                'token': cookies.token,
                'user_id': cookies.encrypted_id
            }
        }

        

        axios.get(`${API_URL}/api/display_profile/${cookies.display_name}`, config)
        .then(response => {
            console.log(response.data);      
            setUserData(response.data.data.user)
        })
        .catch(error => {
            console.log(error.response);
        });

        let formData = new FormData;
        formData.append('id', userData.encrypted_id)

        axios.post(`${API_URL}/api/display_posts`, formData, config)
        .then(response => {
            console.log(response.data);      
            setUserPosts(response.data.data.user)
        })
        .catch(error => {
            console.log(error.response);
        });
        

        axios.post(`${API_URL}/api/display_critiques`, formData, config)
        .then(response => {
            console.log(response.data);      
            setUserCritique(response.data.data.user)
        })
        .catch(error => {
            console.log(error.response);
        });

    }, [])


    const OpenPost = async () =>{
        document.getElementById('posts').removeAttribute('hidden');
        document.getElementById('critiques').hidden=true
    }

    const OpenCritique = async () =>{
        document.getElementById('posts').hidden=true
        document.getElementById('critiques').removeAttribute('hidden');
    }

    return(
        <main className={styles.container}>

            <Head>
                <title>User</title>
                <meta name="description" content="Critique Hall generated by Next App" />
                <link rel="icon" href="/logo256.png" onLoad=""/>
            </Head>

            <Box mx={{lg: 'auto', md: '0', sm: '0'}} my='auto' bg='blue.200' w={{lg: '90%', md: '100%', sm: '100%'}} h={{lg: '80vh', md: '100vh', sm: '150vh'}} rounded='lg' mt={32} mb={{lg: 0, md: 0, sm: 10}} position='static'>
                <Box display='flex' flexDir={{lg: 'row', md: 'column', sm: 'column'}} w='100%'>
                    <Box w={{lg: '100vw', md: '100%', sm: '90%'}} h={{lg: '35vh', md: '35vh', sm: '45vh'}} bg='white' bgImage="url('https://i.stack.imgur.com/SvWWN.png')" p={3} display={{lg: 'flex', sm: 'block'}} mt={5} ml={{lg: 8, md: 0, sm: 5}} rounded='lg'>
                        <Box w='20vh' h='20vh' bg='gray' mt={24} ml={{lg: 5, md: 0, sm: 0}} mx={{lg: 0, md: 0, sm: 'auto'}} rounded='full'>
                            <Center>
                                <Image w='18vh' h='18vh' rounded='full' src="https://www.clipartmax.com/png/middle/119-1198197_anonymous-person-svg-png-icon-free-download-anonymous-icon-png.png" mt={3}/>
                            </Center>
                        </Box>

                        <Box w={{lg:'50vh'}} mx='auto' ml={{lg: '10vw', md: 0, sm: 0}} alignItems={{sm: "center"}}>
                            <Heading size='2xl' color='white' ml={{lg: '12vw', md: 0, sm: 0}} mt={{lg: 48}}>{userData.display_name}</Heading>
                            <Flex ml={{lg: '12vw', md: 0, sm: 0}} mt={1} mx='auto'>
                                <Heading size='lg' mr={3} color='white'>{userData.first_name}</Heading>
                                <Heading size='lg' color='white'>{userData.last_name}</Heading>
                            </Flex>
                        </Box>
                        
                    </Box>
                    <Box w={{lg: '70vw', md: '100%', sm: '90%'}} h={{lg: '35vh', md: '40vh', sm: '45vh'}} bg='blue.500' p={3} mt={5} ml={{lg: 8, md: 0, sm: 5}} mr={{lg: 5, md: 0, sm: 0}} rounded='lg'>
                        <Flex>
                        <Heading size='2xl' as='h3' color='white' mt={10}>About Me: </Heading>
                        <Spacer />
                            <EditProfile data={userData}/>
                        </Flex>
                        <Text w={{lg: '65vh', md: '100%', sm: '100%'}} fontSize='md' color="white">{userData.about_me}</Text>
                        <Heading size='md' color='white' mt={5}>Reputation Points: {userData.reputation_points}</Heading>
                        <Heading size='md' color='white' mt={5}>Strand/Specialization: {userData.specialization}</Heading>
                    </Box>
                </Box>
                <Box display='flex' w={{lg: '30%', md: '100%', sm: '100%'}} mt={5}>
                    {/* <Button ml={5} h='2em' position='static'>All</Button> */}
                    <Button ml={5} h='2em' position='static' onClick={OpenPost}>My Posts</Button>
                    <Button ml={5} h='2em' position='static' onClick={OpenCritique}>My Critiques</Button>
                </Box>
                <Box display='flex' h='35vh' p={3} mt={5} ml={3}  rounded='lg' overflowX='auto'>
                    <Box id='posts' display='flex'>
                        {userPosts.map((posts) => (
                            <Link href={`/post/${posts.post_id}`}>
                                <Box bg='white' w='15vw' h='33vh' ml={5}>
                                    <Center mt={3}>
                                        <Heading size='md' mx="auto">{posts.title}</Heading>
                                    </Center>
                                    <Center mt={3}>
                                        <Image w='10vw' h='20vh' src='https://www.clipartmax.com/png/middle/119-1198197_anonymous-person-svg-png-icon-free-download-anonymous-icon-png.png'></Image>
                                    </Center>
                                    <Flex w='100%' p={3}>
                                        <Text>Likes {posts.likes}</Text>
                                        <Spacer />
                                        <Text>Critiques {posts.critiques}</Text>
                                    </Flex>
                                </Box>
                            </Link>
                        ))}
                    </Box>
                    <Box id='critiques' display='flex'>
                        {userCritique.map((critique) => (
                            <Link href={`/post/${critique.post_id}`}>
                                <Box bg='white' w='15vw' h='33vh' ml={5}>
                                    <Center mt={3}>
                                        <Heading size='md' mx="auto">{critique.title}</Heading>
                                    </Center>
                                    <Center mt={3}>
                                        <Image w='10vw' h='20vh'></Image>
                                    </Center>
                                    <Flex w='100%' p={3}>
                                        <Text>Star {critique.star}</Text>
                                        <Spacer />
                                        <Text>{critique.body}</Text>
                                    </Flex>
                                </Box>
                            </Link>
                        ))}
                    </Box>
                </Box>
            </Box>
        </main>
    )

};
