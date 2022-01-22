import Head from 'next/head'
// import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import { Center, Grid, GridItem, Select, Image } from "@chakra-ui/react"
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
import React,{forwardRef} from "react";
import { useCookies } from 'react-cookie'
import Router from 'next/router'
import EditPost from '@component/post/options/edit'
import ReportPost from '@component/report-post'
import DeletePost from '@component/post/options/delete'


const breakpoints = createBreakpoints({
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  })

const theme = extendTheme({ breakpoints })


export async function getStaticProps(ctx){
    const { API_URL } = process.env
    const { API_KEY } = process.env
    
    // const res = await fetch(`${API_URL}/api/posts_pagination/1`, {
    //     method: 'GET',
    //     headers: {
    //         'content-type': 'multipart/form-data',
    //         'X-API-KEY': `${API_KEY}`,
    //         'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
    //         // 'Accept-Encoding': 'gzip, deflate, br',
    //         'Accept': 'application/json',
    //     }
    // })

    const res2 = await fetch(`${API_URL}/api/get_halls`, {
        method: 'GET',
        headers: {
            'content-type': 'multipart/form-data',
            'X-API-KEY': `${API_KEY}`,
            'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
            'Accept': 'application/json',
        }
    })

    // const data = await res.json()
    const data2 = await res2.json()
    console.log(data2.halls)
    // console.log(data)

    return{
        props:{
            // data: data.posts,
            data2: data2.halls
        }
    }
}

export default function HallPage({data2}){
    const { API_URL } = process.env
    const { API_KEY } = process.env

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(5)
    const [hall, setHalls] =  useState('0')
    const [hallNum, setHallNum] = useState([])

    const [cookie, setCookie] = useCookies('token', 'encrypted_id', 'id')

    const config = {
        headers: { 
          'content-type': 'multipart/form-data',
          'X-API-KEY': `${API_KEY}`,
          'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
          // 'Accept-Encoding': 'gzip, deflate, br',
          'Accept': 'application/json',
          'token': cookie.token,
          'user_id': cookie.encrypted_id
        }
      }

    // console.log(cookie.encrypted_id)
    useEffect(() => {
        axios.get(`${API_URL}/api/posts_pagination/${hall}`, config)
        .then(response => {
            console.log(response.data.posts);
            setPosts(response.data.posts);
            console.log(posts) 
        })
        .catch(error => {
            console.log(error.response);
            console.log(error.response.status)
            if(error.response.status ==  '401'){
                Router.replace('/login')
                return;
            }
        });

        axios.get(`${API_URL}/api/posts_per_hall`, config)
        .then(response => {
            console.log(response.data);
            setHallNum(response.data.halls)
        })
        .catch(error => {
            console.log(error.response);
            console.log(error.response.status)
        });

    }, [])

    // console.log(posts);

    const indexOfLastPost =  currentPage*postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);


    const pageNumbers = []

    for(let i = 1; i<=Math.ceil(posts.length / postsPerPage); i++){
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber)


    const getTechnology = async () =>{

        axios.get(`${API_URL}/api/posts_pagination/1`, config)
        .then(response => {
            console.log(response.data.posts);
            setPosts(response.data.posts);
            setHalls(1)
            console.log(posts)

            if(response.status ===  '401'){
                window.location = '/login'
            }
        })
        .catch(error => {
            console.log(error.response);
        });

    }

    const getPostDropDown = async (item) =>{
        
        setHalls(item)

        axios.get(`${API_URL}/api/posts_pagination/${item}`, config)
        .then(response => {
            console.log(response.data.posts);
            setPosts(response.data.posts);
            setCurrentPage(1);
            console.log(posts)
        })
        .catch(error => {
            console.log(error.response);
        });
    }

    const getAll = async () =>{
        axios.get(`${API_URL}/api/posts_pagination/0`, config)
        .then(response => {
            console.log(response.data.posts);
            setPosts(response.data.posts);
            setCurrentPage(1);
            setHalls(0)
            console.log(posts)
        })
        .catch(error => {
            console.log(error.response);
        });

    }


    const getArts = async () =>{
        axios.get(`${API_URL}/api/posts_pagination/2`, config)
        .then(response => {
            console.log(response.data.posts);
            setPosts(response.data.posts);
            setCurrentPage(1);
            setHalls(2)
            console.log(posts)
        })
        .catch(error => {
            console.log(error.response);
        });

    }

    const getBusiness = async () =>{

        axios.get(`${API_URL}/api/posts_pagination/3`, config)
        .then(response => {
            console.log(response.data.posts);
            setPosts(response.data.posts);
            setCurrentPage(1);
            setHalls(3)
            console.log(posts)
        })
        .catch(error => {
            console.log(error.response);
        });

    }

    const getLounge = async () =>{
        axios.get(`${API_URL}/api/posts_pagination/4`, config)
        .then(response => {
            console.log(response.data.posts);
            setPosts(response.data.posts);
            setCurrentPage(1);
            setHalls(4)
            console.log(posts)
        })
        .catch(error => {
            console.log(error.response);
        });
    }

    return(
        <>
        <main className={styles.container}>
            <Head>
            <title>Critique Hall | Critique</title>
            <meta name="description" content="Critique Hall generated by Next App" />
            <link rel="icon" href="/logo256.png" onLoad=""/>
            </Head>
            
            <Button w={{lg: "70%" , sm: '100%'}} mb="5" mx="auto" p="4" mt="14vh" spacing="10" h="100px" top={0} bg="blue.400" variant="none" href="" onClick={getAll}>
                {/* <Box w={{lg: "70%" , sm: '100%'}} mb="5" mx="auto" p="4" mt="14vh" spacing="10" h="100px" top={0} bg="blue.400"> */}
                    <Center><Heading size="2xl" align="center" mt="2" mb="4" color="white">Halls</Heading></Center>
                {/* </Box> */}
            </Button>
            
            {/* Halls */}
            <Box mt="3vh" w="70%" h='200px' display={{lg: 'flex', md: 'flex', sm: 'none'}} mx="auto" mb="" top="0">
                
                <Button variant='ghost' w="200px" h="100px" bg="purple" rounded="lg" position='static' _hover={{backgroundColor: 'purple'}} _active={{backgroundColor: 'purple'}} onClick={getTechnology}>
                <Box w="full" h="10vh" ml={{lg: 0, sm: 0}}  px='5'>
                    <Center>
                    <Text fontSize="3xl" color="white" my="auto" mt="5" textShadow="1px 1px #000">Technology</Text>
                    </Center>
                    <Center>
                        <Heading size="xs" color="white" mt="1" textShadow="1px 1px #000">Post:</Heading>
                    </Center>
                    
                </Box>
                </Button>

                <Spacer />

                <Button variant='ghost' w="200px" h="100px" bg="blue.300" rounded="lg" position='static' _hover={{backgroundColor: 'blue.300'}} _active={{backgroundColor: 'blue.300'}} onClick={getArts}>
                <Box w="full" h="10vh" ml={{lg: 0, sm: 0}} rounded="lg" px='9'>
                    <Center>
                    <Text fontSize="3xl" color="white" my="auto" mt="5" textShadow="1px 1px #000">Arts</Text>
                    </Center>
                    <Center>
                        <Heading size="xs" color="white" mt="1" textShadow="1px 1px #000">Post:</Heading>
                    </Center>
                    
                </Box>
                </Button>

                <Spacer />

                <Button variant='ghost' w="200px" h="100px" bg="red" rounded="lg" position='static' _hover={{backgroundColor: 'red'}} _active={{backgroundColor: 'red'}} onClick={getBusiness}>
                <Box w="full" h="10vh" ml={{lg: 0, sm: 0}} rounded="lg" px='9' >
                    <Center>
                    <Text fontSize="3xl" color="white" my="auto" mt="5" textShadow="1px 1px #000">Business</Text>
                    </Center>
                    <Center>
                        <Heading size="xs" color="white" mt="1" textShadow="1px 1px #000">Post: </Heading>
                    </Center>
                </Box>
                </Button>

                <Spacer />

                <Button variant='ghost' w="200px" h="100px" bg="green.300" rounded="lg" position='static' _hover={{backgroundColor: 'green.300'}} _active={{backgroundColor: 'green.300'}} onClick={getLounge}>
                <Box w="full" h="10vh" ml={{lg: 0, sm: 0}} rounded="lg" px='9'>
                    <Center>
                    <Text fontSize="3xl" color="white" my="auto" mt="5" textShadow="1px 1px #000">Lounge</Text>
                    </Center>
                    <Center>
                        <Heading size="xs" color="white" mt="1" textShadow="1px 1px #000">Post: </Heading>
                    </Center>
                </Box>
                </Button>
            </Box>

            <Box mt="3px" w="100%" borderColor="gray" position='static' bg="light" border="1px solid gray" borderRadius="md" display={{lg: 'none', md: 'none', sm: 'block'}}>
                <Select position='static' 
                        px={4}
                        py={2}
                        w="100%"
                        onChange={(e) => getPostDropDown(e.target.value)} value={hall}>
                    {data2.map((halls, i) => 
                        <option key={i} value={halls.hall_id}>{halls.hall_name}</option>
                    )}
                </Select>
            </Box>

            <Box w={{lg: "70%", sm: "100%"}} mt="5" display="flex" flexDir={{lg: 'row', sm: 'column-reverse'}}>

            {/* <ul className='pagination'>
                {pageNumbers.map(number=>(
                    <li key={number} className='page-item'>
                        <Link href='/critique'>
                        <a onClick={()=>paginate(number)} className='page-link'>
                            {number}
                        </a>
                        </Link>
                    </li> 
                ))}
            </ul> */}

            <Pagination
                    defaultCurrent={5}
                    current={currentPage}
                    // total={500}
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
                />
            {/* <Pagination></Pagination> */}
            {/* <Box w="50%"></Box> */}
            <Spacer />
            <Box mt={{lg: 0, sm: 5}} mb={{lg: 0, sm: 5}} >
                <Center>
                    <CreatePost />
                </Center>
            </Box>
            </Box>
            <Box w="100%" h="100%" spacing="10px" mt="2">
                <Box w={{lg: "70%" , sm: '100%'}} h="full" mx="auto" p="3" spacing="10">
                    {/* Critique Item */}
                    {currentPosts.map((post, i) => 
                            <Box w="100%" display={{lg: 'flex', sm: 'block'}} key={i} mt='2ch' borderColor='white' border='1px solid gray.500' boxShadow='md' rounded='lg'>
                                <Link href='/post/[id]'  as={`/post/${post.post_id}`}>
                                <a>
                                <Box display={{lg: 'flex', sm: 'block'}} w={{lg: "50vw", sm: '100%'}}>
                                    <Box p="3" w="100%" bg="light" my='auto'>
                                        <Center>
                                        <Text>{post.hall_id}</Text>
                                        </Center>
                                    </Box>
                                    <Box p="3" w="100%" bg="light" my='auto'>
                                        <Center>
                                        <Image src={post.attachment1} w={{lg: '10vw', sm:'100%'}} h={{lg: '10vh', sm: '20vh'}} />
                                        </Center>
                                    </Box>
                                    <Box p="3" w="100%" bg="light" my='auto'>
                                        <Center>
                                        <Text>{post.title}</Text>
                                        </Center>
                                    </Box>
                                    <Box p="3" w="100%" bg="light" my='auto'>
                                        <Center>
                                        Posted by: {post.display_name}
                                        </Center>
                                    </Box>
                                </Box>
                                </a>
                                </Link> 
                                <Box p="3" w="100%" bg="light" display='flex'>
                                    <Box w="100%" bg="light" my='auto'>
                                        <Center>
                                            {post.time_ago}
                                        </Center>
                                    </Box>
                                </Box> 
                                               
                            </Box>
                            
                    )}
                </Box>
            </Box>

        </main>

        
        
        </>
    )
}