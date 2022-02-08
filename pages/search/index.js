import Head from 'next/head'
// import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import { Button, Center, Heading, Spacer, useColorModeValue } from '@chakra-ui/react'
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

    const changeColor = useColorModeValue('#BAB9B9', '#1F1F1F')


    // const searchItem = ''
    const [search, setSearch] = useState('')
    

    
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
    console.log(searchPostData.length)
    
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
                'Token': cookies.token,
                'User-Id': cookies.encrypted_id
            }
        }


        // setSearchItem(localStorage.getItem('search-item'))
        const searchItem = localStorage.getItem('search-item')
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
        const searchItem = localStorage.getItem('search-item')
        setSearch(searchItem)

        let formData = new FormData;
        formData.append('search_data', searchItem)
        formData.append('sort', e)

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

    }

    const addDefaultSrc = (e) => {
        e.target.src = "/no-preview-available.png";
        e.target.onerror = null;
    }

    return(
        <div className={useColorModeValue(styles.container, styles.container2)}>
            <Head>
                <title>Search results for: {search}</title>
                <meta name="description" content="Critique Hall generated by Next App" />
                <link rel="icon" href={useColorModeValue('logo256.png', 'logo256-dark.png')} onLoad=""/>
                <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap" rel="stylesheet" />
            </Head>
            <Box w="100%" mb="10" mt="15vh">
                <Heading fontFamily={'Raleway'} color={useColorModeValue('#C1272D', '#FF5C61')}><Center><Image src={useColorModeValue('/searchresults.png', '/searchresults-dark.png')} w="20%" /> &quot;{search}&quot;</Center></Heading>
            </Box>
            
            
            <Flex w="80%">
                {/* <Pagination></Pagination> */}
                <Box w='10vw'></Box>
                <Spacer />
                
            </Flex>
            <Heading fontFamily={'Raleway'} color={useColorModeValue('#1B1464', '#B2A3FF')}>User:</Heading>

            {/* User item */}
            <Text id='user' mx='auto' my="50px" hidden fontFamily={'Raleway'} color={useColorModeValue('#1B1464', '#B2A3FF')}>No Users Found</Text>
            {searchUserData.map((user, i) => (
            <Box w='50%' key={user.user_id} bgImage={`url('${user.cover_photo}')`} color="white" mt={5} rounded="lg">
            <Link href="/profile/[id]" as={`/profile/${user.display_name}`} passHref>
                <a>
                <Box w={{lg: '100%', sm: '100%'}} display={{lg: 'flex', sm: 'block'}}   mt='2ch' mx="auto" borderColor='dark' rounded='lg' fontFamily={'Raleway'}>
                    <Box p="3" w="100%" bg="light" ml="30px">
                        <Image src={user.profile_photo} w='170px' h='170px' rounded='full' />
                    </Box>
                    <Spacer />
                    <Box p="3" w="100%" bg="light" ml="30vh">
                        <Heading fontFamily={'Raleway'} size="2xl" mt={28}>{user.display_name}</Heading>
                    </Box>      
                </Box>
                
                </a>
            </Link>
            </Box>
            ))}
            <Heading mt={5} fontFamily={'Raleway'}  color={useColorModeValue('#1B1464', '#B2A3FF')}>Posts:</Heading>
            <Flex w={{lg: '70%', sm: '100%'}} my="30px">

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

                <Flex w='15vw' mt={1} fontFamily={'Raleway'}>
                    <Text mr={5} w={20} mt={2} >Sort By: </Text>
                    <Select borderColor={useColorModeValue('black', 'white')} color={useColorModeValue('black', 'white')} bgColor={useColorModeValue('#FFFFFF', '#2E2E2E')} boxShadow={'lg'} onChange={(e) => sortPostResult(e.target.value)}>
                        <option value='desc'>Newest</option>
                        <option value='asc'>Oldest</option>
                    </Select>
                </Flex>
            </Flex>

            {/* Search Item */}
            <Text id='post' mx='auto' hidden fontFamily={'Raleway'} color={useColorModeValue('#1B1464', '#B2A3FF')}>No Posts Found</Text>

            {currentSearch.map((post, i) => (
            <Box bgColor={changeColor} w={{lg: '70%', sm: '100%'}} mt='2ch' mx="auto" key={post.post_id} display="flex" boxShadow='lg' rounded='lg' fontFamily={'Raleway'}>
                                <Link href='/post/[id]'  as={`/post/${post.post_id}`} passHref>
                                <a>
                                <Box display={{lg: 'flex', sm: 'block'}} w={{lg: "50vw", sm: '100%'}}>
                                    <Box fontFamily={'Raleway'} p="3" w="100%" bg="light" my='auto'>
                                        <Center>
                                        {/* <Text >{post.hall_id}</Text> */}
                                        <Box bgColor={post.hall_color} w="150px" p={5} color="white" rounded="md" boxShadow="lg">
                                            <Center>
                                            {post.hall_name}
                                            </Center>
                                        </Box>
                                        </Center>
                                    </Box>
                                    <Box p="3" w="100%" bg="light" my='auto'>
                                        <Center>
                                        {post.attachment1 != 'undefined' ? 
                                        <Image src={post.attachment1} w={{lg: '10vw', sm:'100%'}} h={{lg: '10vh', sm: '20vh'}} onError={addDefaultSrc} />
                                        : <Image src="/no-image-preview.png" w={{lg: '10vw', sm:'100%'}} h={{lg: '10vh', sm: '20vh'}} />}
                                        </Center>
                                    </Box>
                                    <Box fontFamily={'Raleway'} p="3" w="100%" bg="light" my='auto'>
                                        <Center>
                                        <Text>{post.title}</Text>
                                        </Center>
                                    </Box>
                                    <Box fontFamily={'Raleway'} p="3" w="100%" bg="light" my='auto'>
                                        <Center>
                                        Posted by: {post.display_name}
                                        </Center>
                                    </Box>
                                </Box>
                                </a>
                                </Link> 
                                <Box fontFamily={'Raleway'} p="3" w="100%" bg="light" display='flex'>
                                    <Box w="100%" bg="light" my='auto'>
                                        <Center>
                                            {post.time_ago}
                                        </Center>
                                    </Box>
                                </Box>
            </Box>
            ))}

        </div>
    )


};
