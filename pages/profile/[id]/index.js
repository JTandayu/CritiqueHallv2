import Head from 'next/head'
// import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import { Box, Button, Flex, Heading, Spacer, Text, Image, Center, Select, useColorModeValue } from '@chakra-ui/react'
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
import ReportUser from '@component/report-user'

export async function getServerSideProps(context){
    const { API_URL } = process.env
    const { API_KEY } = process.env

    // const cookies = context.req.headers.cookie;
    // const cookie = await cookies.json()
    // const data = []
    // console.log(cookie);

    // const config = {
    //     method: 'Get',
    //     headers: { 
    //         'content-type': 'multipart/form-data',
    //         'X-API-KEY': `${API_KEY}`,
    //         'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
    //         // 'Accept-Encoding': 'gzip, deflate, br',
    //         'Accept': 'application/json',
    //         'token': cookies.token,
    //         'user_id': cookies.encrypted_id
    //     }
    // }

    // const res = await fetch(`${API_URL}/api/display_profile/${cookies.display_name}`, config)

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
    const [userData, setUserData] = useState('')
    const [userPosts, setUserPosts] = useState([])
    const [userCritique, setUserCritique] = useState([])
    const [filter, setFilter] = useState('newest')
    const [encID, setEncId] = useState("")
    const [loading, setLoading] = useState(true)

    const config = {
        headers: { 
            'content-type': 'multipart/form-data',
            'X-API-KEY': `${API_KEY}`,
            'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
            // 'Accept-Encoding': 'gzip, deflate, br',
            'Accept': 'application/json',
            'Token': cookies.token,
            'User-Id': cookies.encrypted_id
        }
    }

    // const user_id = cookies.id
    useEffect(() => {

        document.getElementById('posts').removeAttribute('hidden');
        document.getElementById('critiques').hidden=true;
        document.getElementById('postFilter').removeAttribute('hidden');
        document.getElementById('critiqueFilter').hidden=true;

        

        axios.get(`${API_URL}/api/display_profile/${data}`, config)
        .then(response => {
            console.log(response.data);      
            setUserData(response.data.data.user)
            displayPostCritique(response.data.data.user.encrypted_id)
            setEncId(response.data.data.user.encrypted_id)
        })
        .catch(error => {
            console.log(error.response);
        });

        

    }, [data])

    const displayPostCritique = (enc_id) => {
        let formData = new FormData;
        formData.append('user_id', enc_id)
        // console.log(cookies.id)

        axios.post(`${API_URL}/api/display_posts`, formData, config)
        .then(response => {
            console.log(response.data);      
            setUserPosts(response.data.posts)
        })
        .catch(error => {
            console.log(error.response);
        });
        

        axios.post(`${API_URL}/api/display_critiques`, formData, config)
        .then(response => {
            console.log(response.data);      
            setUserCritique(response.data.critiques)
        })
        .catch(error => {
            console.log(error.response);
        });
    }

    const sortPost = (e) =>{
        let formData = new FormData;
        formData.append('user_id', encID)
        formData.append('sort', e)
        // console.log(cookies.id)

        axios.post(`${API_URL}/api/display_posts`, formData, config)
        .then(response => {
            console.log(response.data);      
            setUserPosts(response.data.posts)
        })
        .catch(error => {
            console.log(error.response);
        });
    }

    const sortCritique = (e) =>{
        let formData = new FormData;
        formData.append('user_id', encID)
        formData.append('sort', e)
        
        axios.post(`${API_URL}/api/display_critiques`, formData, config)
        .then(response => {
            console.log(response.data);      
            setUserCritique(response.data.critiques)
        })
        .catch(error => {
            console.log(error.response);
        });
    }


    const OpenPost = async () =>{
        document.getElementById('posts').removeAttribute('hidden');
        document.getElementById('critiques').hidden=true
        document.getElementById('postFilter').removeAttribute('hidden');
        document.getElementById('critiqueFilter').hidden=true
    }

    const OpenCritique = async () =>{
        document.getElementById('posts').hidden=true
        document.getElementById('critiques').removeAttribute('hidden');
        document.getElementById('postFilter').hidden=true
        document.getElementById('critiqueFilter').removeAttribute('hidden');
    }

    return(
        <main className={styles.container}>

            <Head>
                <title>Critique Hall - Profile | {userData.display_name} </title>
                <meta name="description" content="Critique Hall generated by Next App" />
                <link rel="icon" href="/logo256.png" onLoad=""/>
            </Head>

            <Box bgImage={'Background1.png'} mx={{lg: 'auto', md: '0', sm: '0'}} my='auto' bg='#E0EEFF' w={{lg: '90%', md: '100%', sm: '100%'}} h={{lg: '80vh', md: '100vh', sm: '150vh'}} rounded='lg' mt={32} mb={{lg: 0, md: 0, sm: 10}} position='static' boxShadow={'dark-lg'}>
             
                <Box display='flex' flexDir={{lg: 'row', md: 'column', sm: 'column'}} w='100%'>
                    <Box w={{lg: '100vw', md: '40vw', sm: '90%'}} h={{lg: '35vh', md: '35vh', sm: '45vh'}} bg='white' bgImage={`url('${userData.cover_photo}')`} p={3} display={{lg: 'flex', sm: 'block'}} mt={5} ml={{lg: 8, md: 0, sm: 5}} rounded='lg'>
                        {userData && userData.display_name !== cookies.display_name ? <ReportUser data={userData} /> : null}
                        <Box w='20vh' h='20vh' bg='gray' mt={24} ml={{lg: 5, md: 0, sm: 0}} mx={{lg: 0, md: 0, sm: 'auto'}} rounded='full'>
                            <Center>
                                <Image w='18vh' h='18vh' rounded='full' src={userData.profile_photo} mt={3}/>
                            </Center>
                        </Box>

                        <Box w={{lg:'50vh'}} mx='auto' ml={{lg: '10vw', md: 0, sm: 0}} alignItems={{sm: "center"}}>
                            <Heading fontFamily={'Raleway'} fontWeight={'black'} size='2xl' color='white' ml={{lg: '12vw', md: 0, sm: 0}} mt={{lg: 48}}>{userData.display_name}</Heading>
                            <Flex ml={{lg: '12vw', md: 0, sm: 0}} mt={1} mx='auto'>
                                <Heading size='lg' mr={3} color='white'>{userData.first_name}</Heading>
                                <Heading size='lg' color='white'>{userData.last_name}</Heading>
                            </Flex>
                        </Box>
                        
                    </Box>
                    <Box w={{lg: '70vw', md: '100%', sm: '90%'}} h={{lg: '35vh', md: '30%', sm: '45vh'}} bg='#81A4CF' p={3} mt={5} ml={{lg: 8, md: 0, sm: 5}} mr={{lg: 5, md: 0, sm: 0}} rounded='lg'>
                        <Flex>
                        <Heading size='2xl' as='h3' color='white' mt={10}>About Me: </Heading>
                        <Spacer />
                            {userData && userData.display_name === cookies.display_name ? <EditProfile data={userData}/> : null}
                        </Flex>
                        <Text w={{lg: '65vh', md: '100%', sm: '100%'}} fontSize='md' color="white">{userData.about_me}</Text>
                        <Heading size='md' color='white' mt={5} display="flex">Reputation Stars: {userData.reputation_points}<Image src='/reputation-stars.png' alt="Reputation Stars" w="25px" h="25px" ml={2}/></Heading>
                        <Heading size='md' color='white' mt={5}>Specialization: {userData.specialization}</Heading>
                    </Box>
                </Box>
                <Box display='flex' w={{lg: '100%', md: '100%', sm: '100%'}} mt={5} ml={3} mr={5}>
                    {/* <Button ml={5} h='2em' position='static'>All</Button> */}
                    <Button fontFamily={'Raleway'} fontWeight={'bold'} ml={5} h='2em' position='static' onClick={OpenPost} boxShadow={'lg'}>My Posts</Button>
                    <Button fontFamily={'Raleway'} fontWeight={'bold'} ml={5} h='2em' position='static' onClick={OpenCritique} boxShadow={'lg'}>My Critiques</Button>
                    <Spacer />
                    <Flex w={{lg: '15vw', sm: '50%'}} mt={1} mr={8} id='postFilter'>
                        {/* <Text fontFamily={'Raleway'} mr={{lg: 5, sm: 1}} w={20} mt={2}>Sort by: </Text> */}
                        <Select fontFamily={'Raleway'} fontWeight={'bold'} onChange={(e)=>sortPost(e.target.value)}  bgColor='white' boxShadow={'lg'}>
                            <option>Filter Item</option>
                            <option value='desc'>Newest</option>
                            <option value='asc'>Oldest</option>
                            <option value='most_stars'>Most Post Stars</option>
                            <option value='most_interacted'>Most Interacted</option>
                        </Select>
                    </Flex>
                    <Flex w={{lg: '15vw', sm: '50%'}} mt={1} mr={8} id='critiqueFilter'>
                        {/* <Text fontFamily={'Raleway'} mr={{lg: 5, sm: 1}} w={20} mt={2}>Sort by: </Text> */}
                        <Select fontFamily={'Raleway'} fontWeight={'bold'} onChange={(e)=>sortCritique(e.target.value)}  bgColor='white' boxShadow={'lg'}>
                            <option value='desc'>Newest</option>
                            <option value='asc'>Oldest</option>
                            <option value='most_stars'>Most Critique Stars</option>
                            <option value='most_interacted'>Most Interacted</option>
                        </Select>
                    </Flex>
                </Box>
                {loading ? 
                <Box display='flex' h={{lg: '30vh', sm: '40vh'}} p={3} mt={5} ml={3} mr={3}  rounded='lg' overflowX='auto'>
                    <Box id='posts' display='flex'>
                        {userPosts !== null ?
                        userPosts.map((posts, i) => (
                            <Link href={`/post/${posts.post_id}`} key={i} passHref>
                                <Box bg='white' w={{lg: '15vw', sm: '300px'}} h='28vh' ml={5}>
                                    {/* <Center mt={3}>
                                        <Heading size='md' mx="auto">{posts.title}</Heading>
                                    </Center> */}
                                    <Center mt={0}>
                                        <Image w={{lg: '300px', sm: '300px'}} h='20vh' src={posts.attachment1}></Image>
                                    </Center>
                                    <Flex w='100%' p={3}>
                                    <Image src='/stars-clicked.png' alt="Stars" w="25px" h="25px" ml={2}/> {posts.likes}
                                        <Spacer />
                                        <Image src='/comments.png' alt="Critiques" w="25px" h="25px" ml={2}/>  {posts.critiques}
                                    </Flex>
                                </Box>
                            </Link>
                        )) : null}
                    </Box>
                    <Box id='critiques' display='flex'>
                        {userCritique !== null ?
                        userCritique.map((critique, i) => (
                            <Link href={`/post/${critique.post_id}`} key={i} passHref>
                                <Box bg='white' w={{lg: '15vw', sm: '300px'}} h='28vh' ml={5}>
                                    {/* <Center mt={3}>
                                        <Heading size='md' mx="auto">{critique.title}</Heading>
                                    </Center> */}
                                    <Center mt={0}>
                                        <Image w={{lg: '300px', sm: '300px'}} h='20vh' src={critique.attachment1}></Image>
                                    </Center>
                                    <Flex w='100%' p={3}>
                                    <Image src='/stars-clicked.png' alt="Stars" w="25px" h="25px" ml={2}/> {critique.stars}
                                        <Spacer />
                                        <Text>{critique.body}</Text>
                                    </Flex>
                                </Box>
                            </Link>)    
                        ) : null }
                    </Box>
                </Box>
                : null }
            </Box>
        </main>
    )

};
