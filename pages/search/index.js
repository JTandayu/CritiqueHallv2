import Head from 'next/head'
// import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import { Button, Center, Heading, Spacer } from '@chakra-ui/react'
import Link from 'next/link'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Flex,
    Select,
    Text,
    Image
  } from "@chakra-ui/react"
import { Box } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import styles from '@styles/Search.module.css'
import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import Pagination from '@choc-ui/paginator'

export async function getServerSideProps(context){
    const { API_URL } = process.env
    const { API_KEY } = process.env

    

    // const [search, setSearch] = useState('')
    

    const res = await fetch(`${API_URL}/api/display_posts`, {header:{'x-api-key': '1234'}})
    const res2 = await fetch(`${API_URL}/api/display_profile` , {header:{'x-api-key': '1234'}})

    const data = await res.json()
    
    return{
        props:{
            data
        }
    }
}

export default function SearchResult(){
    const { API_URL } = process.env
    const { API_KEY } = process.env

    const [cookies, setCookies, removeCookies] = useCookies(['token', 'id', 'encrypted_id'])

    // const [searchItem, setSearchItem] = useState('')
    const [searchUserData, setSearchUserData] = useState([])
    const [searchPostData, setSearchPostData] = useState([])
    const [currentSearchPage, setCurrentSearchPage] = useState(1)
    const [searchPostsPerPage, setSearchPostsPerPage] = useState(5)


    const searchItem = ''
    const [search, setSearch] = useState('')
    

    
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
    console.log(searchPostData.length)
    
    useEffect(() => {
        // setSearchItem(localStorage.getItem('search-item'))
        searchItem = localStorage.getItem('search-item')
        setSearch(searchItem)
        

        let formData = new FormData;
        formData.append('search_data', searchItem)



        axios.post(`${API_URL}/api/search`, formData, config)
        .then((response) => {
            console.log(response.data);
            setSearchUserData(response.data.data.users);
            setSearchPostData(response.data.data.posts);
            // console.log(searchUserData.length);
            // console.log(searchPostData.length);
            
            if(response.data.data.users.length == 0){
                document.getElementById('user').removeAttribute('hidden');
            }
            
            if(response.data.data.posts.length == 0){
                document.getElementById('post').removeAttribute('hidden');
            }
        })
        .catch((error) => (
            console.log(error.response)
        ));

        
    }, [])

    const indexOfLastPostSearch =  currentSearchPage*searchPostsPerPage
    const indexOfFirstPostSearch = indexOfLastPostSearch - searchPostsPerPage
    const currentSearch = searchPostData.slice(indexOfFirstPostSearch, indexOfLastPostSearch);

    console.log(currentSearch)
    const sortPostResult = async (e) =>{
        
    }

    return(
        <div className={styles.container}>
            <Head>
                <title>Search Results for {search}</title>
                <meta name="description" content="Critique Hall generated by Next App" />
                <link rel="icon" href="/logo256.png" onLoad=""/>
            </Head>
            <Box w="100%" mb="10" mt="15vh">
                <Heading><Center>Search Result for "{search}"</Center></Heading>
            </Box>
            
            
            <Flex w="80%">
                {/* <Pagination></Pagination> */}
                <Box w='10vw'></Box>
                <Spacer />
                
            </Flex>
            <Heading>User</Heading>

            {/* User item */}
            <Text id='user' mx='auto' hidden>No Users Found</Text>
            {searchUserData.map((user, i) => (
            <Box w={{lg: '20%', sm: '100%'}} display={{lg: 'flex', sm: 'block'}} key={i} mt='2ch' mx="auto" border='1px solid' borderColor='dark' rounded='lg'>
                <Box p="3" w="100%" bg="light">
                    <Image src={user.profile_photo} w='30px' h='30px' rounded='full' />
                </Box>

                <Box p="3" w="100%" bg="light">
                    {user.display_name}
                </Box>      
            </Box>
            ))}
            <Heading>Posts</Heading>
            <Flex w={{lg: '70%', sm: '100%'}}>

                <Pagination
                    defaultCurrent={5}
                    current={currentSearch}
                    paginationProps={{ display: "flex", }}
                    baseStyles={{ bg: "light", color: 'dark' }}
                    activeStyles={{ bg: "gray.300", color: 'black' }}
                    hoverStyles={{ bg: "gray.300" }}
                    pageNeighbours={1}
                    total={searchPostData.length}
                    pageSize={searchPostsPerPage}
                    onChange={(page) => {
                        setCurrentSearchPage(page);
                      }}
                    bg='dark'
                />
                <Spacer />

                <Flex w='15vw' mt={1}>
                    <Text mr={5} w={20} mt={2} >Sort By: </Text>
                    <Select onChange={(e) => sortPostResult(e.target.value)}>
                        <option value='oldest'>Oldest</option>
                        <option value='newest'>Newest</option>
                    </Select>
                </Flex>
            </Flex>

            {/* Search Item */}
            <Text id='post' mx='auto' hidden>No Posts Found</Text>

            {currentSearch.map((post, i) => (
            <Box w={{lg: '70%', sm: '100%'}} mt='2ch' mx="auto" border='1px solid' key={i} borderColor='dark' rounded='lg'>
                <Link href='/post/[id]'  as={`/post/${post.post_id}`}>
                    <a>
                    <Box w='100%' display={{lg: 'flex', sm: 'block'}} >
                        <Box p="3" w="100%" bg="light">
                            {post.hall_id}
                        </Box>
                        <Box p="3" w="100%" bg="light">
                            Image
                        </Box>
                        <Box p="3" w="100%" bg="light">
                            {post.title}
                        </Box>
                        <Box p="3" w="100%" bg="light">
                            {post.display_name}
                        </Box>
                        <Box p="3" w="100%" bg="light">
                            {post.time_ago}
                        </Box>       
                    </Box>
                    </a>
                </Link>
            </Box>
            ))}

        </div>
    )


};
