import Head from 'next/head'
// import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import { Center, Grid, GridItem, Select, Image, useToast } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import Link from 'next/link'
import styles from "@styles/Hall.module.css";
import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { Button, ButtonGroup } from "@chakra-ui/react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react"
import CreatePost from '@component/post/create-post'
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
  } from '@chakra-ui/react'
import { Spacer } from '@chakra-ui/react'
import CritiqueList from '@component/CritiqueList'
import { Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from '@choc-ui/paginator'
import React, {forwardRef} from "react";
import { useCookies } from 'react-cookie'
import EditPost from '@component/post/options/edit'
import ReportPost from '@component/report-post'
import DeletePost from '@component/post/options/delete'
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import ScrollToTop from 'react-scroll-to-top'


const breakpoints = createBreakpoints({
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  })

const theme = extendTheme({ breakpoints })


// export async function getStaticProps(ctx){
//     const { API_URL } = process.env
//     const { API_KEY } = process.env
    

//     const res2 = await fetch(`${API_URL}/api/get_halls`, {
//         method: 'GET',
//         headers: {
//             'content-type': 'multipart/form-data',
//             'X-API-KEY': `${API_KEY}`,
//             'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
//             'Accept': 'application/json',
//         }
//     })

//     const data2 = await res2.json()


//     return{
//         props:{
//             data2: data2.halls
//         }
//     }
// }

export default function HallPage(){
    const { API_URL } = process.env
    const { API_KEY } = process.env
    const toast = useToast()
    const router = useRouter()
    // const post_id = ;

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(6)
    const [hall, setHalls] =  useState('0')
    const [hallNum, setHallNum] = useState([])
    const [hallList, setHallList] = useState([])

    const changeColor = useColorModeValue('#BAB9B9', '#1F1F1F')
    const thereNoPost = useColorModeValue('/there-no-post.png', '/there-no-post-dark.png')


    // const [cookie] = useCookies()
    const token = getCookie('token')
    const user_id = getCookie('encrypted_id')

    const config = {
        headers: { 
          'content-type': 'multipart/form-data',
          'X-API-KEY': `${API_KEY}`,
          'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
          // 'Accept-Encoding': 'gzip, deflate, br',
          'Accept': 'application/json',
          'Token': token,
          'User-Id': user_id
        }
      }

    // console.log(cookie.encrypted_id)
    useEffect(() => {
        const { API_URL } = process.env
        const { API_KEY } = process.env

        const config = {
            headers: { 
              'content-type': 'multipart/form-data',
              'X-API-KEY': `${API_KEY}`,
              'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
              // 'Accept-Encoding': 'gzip, deflate, br',
              'Accept': 'application/json',
              'Token': token,
              'User-Id': user_id
            }
          }

        axios.get(`${API_URL}/api/posts_pagination/${hall}`, config)
        .then(response => {
            console.log(response);
            setPosts(response.data.posts);
            // console.log(posts) 
            setLoading(false)
        })
        .catch(error => {
            console.log(error);
            // if(error.response.status ==  '401'){
            //     Router.replace('/login')
            //     return;
            // }
        });

        axios.get(`${API_URL}/api/get_halls`, config)
        .then(response => {
            console.log(response);
            setHallList(response.data.halls)
        })
        .catch(error => {
            console.log(error);
            console.log(error.response.status)
        });

        axios.get(`${API_URL}/api/posts_per_hall`, config)
        .then(response => {
            console.log(response);
            setHallNum(response.data.halls)
        })
        .catch(error => {
            console.log(error);
            console.log(error.response.status)
        });

    }, [router.isReady])

    // console.log(posts);

    const indexOfLastPost =  currentPage*postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const getTechnology = async () =>{

        axios.get(`${API_URL}/api/posts_pagination/1`, config)
        .then(response => {
            console.log(response);
            setPosts(response.data.posts);
            setHalls(1)
            console.log(posts)

            if(response.status ===  '401'){
                window.location = '/login'
            }
        })
        .catch(error => {
            console.log(error);
        });

    }

    const getPostDropDown = async (item) =>{
        
        setHalls(item)

        axios.get(`${API_URL}/api/posts_pagination/${item}`, config)
        .then(response => {
            console.log(response);
            setPosts(response.data.posts);
            setCurrentPage(1);
            console.log(posts)
        })
        .catch(error => {
            console.log(error);
        });
    }

    const getAll = async () =>{
        axios.get(`${API_URL}/api/posts_pagination/0`, config)
        .then(response => {
            console.log(response);
            setPosts(response.data.posts);
            setCurrentPage(1);
            setHalls(0)
            console.log(posts)
        })
        .catch(error => {
            console.log(error);
        });

    }


    const getArts = async () =>{
        axios.get(`${API_URL}/api/posts_pagination/2`, config)
        .then(response => {
            console.log(response);
            setPosts(response.data.posts);
            setCurrentPage(1);
            setHalls(2)
            console.log(posts)
        })
        .catch(error => {
            console.log(error);
        });

    }

    const getBusiness = async () =>{

        axios.get(`${API_URL}/api/posts_pagination/3`, config)
        .then(response => {
            console.log(response);
            setPosts(response.data.posts);
            setCurrentPage(1);
            setHalls(3)
            console.log(posts)
        })
        .catch(error => {
            console.log(error);
        });

    }

    const getLounge = async () =>{
        axios.get(`${API_URL}/api/posts_pagination/4`, config)
        .then(response => {
            console.log(response);
            setPosts(response.data.posts);
            setCurrentPage(1);
            setHalls(4)
            console.log(posts)
        })
        .catch(error => {
            console.log(error);
        });
    }

    const addDefaultSrc = (e) => {
        e.target.style.display = "none";
        // e.target.src = "/no-image-attachment.png";
        e.target.onerror = null;
    }

    return(
        <>
        
        <main className={useColorModeValue(styles.container, styles.container2)}>
            <Head>
            <title>Critique Hall | Critique</title>
            <meta name="description" content="Critique Hall generated by Next App" />
            <link rel="icon" href={useColorModeValue('logo256.png', 'logo256-dark.png')} onLoad=""/>
            <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap" rel="stylesheet" />
            </Head>
            
            <ScrollToTop color={'black'} width={40} boxShadow={'dark-lg'} smooth />
            {/* Halls */}
            <Box bgImage={'/HallsCard-Critique.png'} bgRepeat={'no-repeat'} bgSize={'cover'} rounded="lg" w={{lg: "70%", md: '100%'}} h='140px' display={{lg: 'flex', md: 'flex', sm: 'none', base: "none"}} mx="auto" mt="15vh" top="0">
                
                <Button variant='ghost' w="200px" h="100px" mt={5} className={styles.arts} rounded="lg" position='static' _hover={{cursor: 'pointer'}} onClick={getArts} boxShadow={'lg'}>
                <Box w="full" h="10vh" ml={{lg: 0, sm: 0}}  px='5'>
                    <Center>
                    </Center>
                    
                </Box>
                </Button>

                <Spacer />

                <Button variant='ghost' w="200px" h="100px" mt={5} className={styles.business} rounded="lg" position='static' _hover={{cursor: 'pointer'}} onClick={getBusiness} boxShadow={'lg'}>
                <Box w="full" h="10vh" ml={{lg: 0, sm: 0}} rounded="lg" px='9'>
                    <Center>
                    </Center>
                    
                </Box>
                </Button>

                <Spacer />

                <Button variant='ghost' w="200px" h="100px" mt={5} className={styles.technology} rounded="lg" position='static' _hover={{cursor: 'pointer'}} onClick={getTechnology} boxShadow={'lg'}>
                <Box w="full" h="10vh" ml={{lg: 0, sm: 0}} rounded="lg" px='9' >
                    <Center>
                    </Center>
                </Box>
                </Button>

                <Spacer />

                <Button variant='ghost' w="200px" h="100px" mt={5} className={styles.lounge} rounded="lg" position='static' _hover={{cursor: 'pointer'}} onClick={getLounge} boxShadow={'lg'}>
                <Box w="full" h="10vh" ml={{lg: 0, sm: 0}} rounded="lg" px='9'>
                    <Center>
                    </Center>
                </Box>
                </Button>
            </Box>

            <Box mt="20vh" w="100%" borderColor="gray" position='static' bg="light" border="1px solid gray" borderRadius="md" display={{lg: 'none', md: 'none', sm: 'block'}}>
                <Select position='static' 
                        px={4}
                        py={2}
                        w="100%"
                        fontFamily={"Raleway"}
                        onChange={(e) => getPostDropDown(e.target.value)} value={hall} defaultValue="0">
                    <option value="0">All</option>
                    {hallList.map((halls) => 
                        <option key={halls.hall_id} value={halls.hall_id}>{halls.hall_name}</option>
                    )}
                </Select>
            </Box>

            <Box w={{lg: "70%", sm: "100%"}} mt="5" display="flex" alignItems="center" flexDir={{lg: 'row', sm: 'column-reverse', base: "column-reverse"}}>
            <Pagination
                    defaultCurrent={5}
                    current={currentPage}
                    paginationProps={{ display: "flex", }}
                    baseStyles={{ bg: "light", color: 'dark' }}
                    activeStyles={{ bg: "gray.300", color: 'black' }}
                    hoverStyles={{ bg: "gray.300" }}
                    pageNeighbours={1}
                    total={posts.length}
                    pageSize={postsPerPage}
                    onChange={(page) => {
                        setCurrentPage(page);
                      }}
                    bg='dark'
                    responsive
                    fontFamily={'Raleway'}
                />
            <Spacer />
            <Box mt={{lg: 0, sm: 5, base: 5}} mb={{lg: 0, sm: 5, base: 5}} >
                <Center>
                    <CreatePost />
                </Center>
            </Box>
            </Box>
            <Box w="100%" h="100%" spacing="10px" mt="2">
                <Box w={{lg: "70%" , sm: '100%'}} h="full" mx="auto" p="3" spacing="10">
                    
                    {/* Critique Item */}
                    { posts.length != 0 ? 
                    [loading ? <Box fontFamily={"Raleway"}>Loading...</Box> : 
                    currentPosts.map((post, i) => 
                            <Box bgColor={changeColor} w="100%" display={{lg: 'flex', sm: 'block'}} key={post.post_id} mt='2ch' border='1px solid gray.500' boxShadow='lg' rounded='lg'>
                                <Link href={`/post/${post.post_id}`} passHref>
                                <a>
                                <Box display={{lg: 'flex', sm: 'block'}} w={{lg: "50vw", sm: '100%'}}>
                                    <Box fontFamily={'Raleway'} p="3" w="100%" bg="light" my='auto'>
                                        <Center display={{lg: 'none', base: 'block'}} w="100%">
                                            <Box bgColor={post.hall_color} w="150px" p={5} color="white" rounded="md" boxShadow="lg">
                                                <Center>
                                                    {post.hall}
                                                </Center>
                                            </Box>
                                        </Center>
                                        <Box display={{lg: 'block', base: 'none'}} bgColor={post.hall_color} w="150px" p={5} color="white" rounded="md" boxShadow="lg">
                                                <Center>
                                                    {post.hall}
                                                </Center>
                                            </Box>
                                    </Box>
                         
                                    {post.attachment1 != 'undefined' ?
                                    <Box p="3" w="100%" bg="light" my='auto' ml={{lg: '20%', base: '0'}} mr={{lg: '15%', base: '0'}} overflowX={{lg: 'visible', sm: "auto", base: "auto"}}>
                                        <Center>
                                        {post.attachment1 != 'undefined' ? 
                                        <Image src={post.attachment1} w={{lg: '10vw', sm:'100%'}} h={{lg: '10vh', sm: '20vh'}} onError={addDefaultSrc} borderRadius={10} objectFit='cover'/>
                                        : null}
                                        {post.attachment2 != 'undefined' ? 
                                        <Image src={post.attachment2} w={{lg: '10vw', sm:'100%'}} h={{lg: '10vh', sm: '20vh'}} display={{lg: "block", base: "none"}} onError={addDefaultSrc} borderRadius={10} objectFit='cover'/>
                                        : null}
                                        {post.attachment3 != 'undefined' ? 
                                        <Image src={post.attachment3} w={{lg: '10vw', sm:'100%'}} h={{lg: '10vh', sm: '20vh'}} display={{lg: "block", base: "none"}} onError={addDefaultSrc} borderRadius={10} objectFit='cover'/>
                                        : null}
                                        </Center>
                                    </Box>: null}
                                    <Box fontFamily={'Raleway'} p="3" w="20%" bg="light" my='auto'>
                                        <Center>
                                        <Text isTruncated>{post.title}</Text>
                                        </Center>
                                    </Box>
                                    <Box fontFamily={'Raleway'} p="3" w="100%" bg="light" my='auto'>
                                        <Center>
                                        <Image src={post.profile_photo} w="50px" h="50px" mr={3} borderRadius={10}/> {post.display_name}
                                        </Center>
                                    </Box>
                                </Box>
                                </a>
                                </Link> 
                                <Box fontFamily={'Raleway'} fontSize="sm" p="3" w="100%" bg="light" display='flex'>
                                    <Box w="100%" bg="light" my='auto'>
                                        <Center>
                                            {post.time_ago}
                                        </Center>
                                    </Box>
                                </Box> 
                                               
                            </Box>
                            
                    )
                    ]
                    : <Center><Image src={thereNoPost} w='700px' h='50px' disabled /></Center>}
                </Box>
            </Box>

        </main>

        
        
        </>
    )
}