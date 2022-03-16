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
import {useEffect, forwardRef} from 'react'
import axios from 'axios'
import Pagination from '@choc-ui/paginator'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import ScrollToTop from "react-scroll-to-top";
import {getCookie} from "cookies-next"


// export async function getServerSideProps(context){
//     const { API_URL } = process.env
//     const { API_KEY } = process.env

    

//     // const [search, setSearch] = useState('')
    

//     const res = await fetch(`${API_URL}/api/display_posts`, {header:{'x-api-key': '1234'}})
//     const res2 = await fetch(`${API_URL}/api/display_profile` , {header:{'x-api-key': '1234'}})

//     const data = await res.json()
    
//     return{
//         props:{
//             data
//         }
//     }
// }

export default function SearchResult(){
    const { API_URL } = process.env
    const { API_KEY } = process.env

    // const [cookies] = useCookies()

    // const [searchItem, setSearchItem] = useState('')
    const [searchUserData, setSearchUserData] = useState([])
    const [searchPostData, setSearchPostData] = useState([])
    const [currentSearchPage, setCurrentSearchPage] = useState(1)
    const [searchPostsPerPage, setSearchPostsPerPage] = useState(5)

    const changeColor = useColorModeValue('#BAB9B9', '#1F1F1F')
    const changeColor2 = useColorModeValue('#1B1464', '#B2A3FF')
    const changeBadgeIcon = useColorModeValue('/badge-icon.png', '/badge-icon-dark.png')
    const changeBackgroundColor = useColorModeValue('white', 'black')
    const changeBorderColor = useColorModeValue('2px solid black', '2px solid white')
    const router = useRouter();
    const token = getCookie('token')
    const user_id = getCookie('encrypted_id')
    
    // const searchItem = ;

    const searchItem = router.query.id
    const [search, setSearch] = useState('')
    // console.log(router.query.id)

    
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
    
    useEffect(() => {
        const { API_URL } = process.env
        const { API_KEY } = process.env
        document.getElementById('user').hidden=true;
        document.getElementById('post').hidden=true;

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


        // setSearchItem(localStorage.getItem('search-item'))
        
        // console.log(searchItem)
        // // const searchItem = localStorage.getItem('search-item')
        setSearch(searchItem)
        

        let formData = new FormData;
        formData.append('search_data', searchItem)



        axios.post(`${API_URL}/api/search`, formData, config)
        .then((response) => {
            // console.log(response.data);
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
            console.log(error)
        ));

        
    }, [searchItem])

    const indexOfLastPostSearch =  currentSearchPage*searchPostsPerPage
    const indexOfFirstPostSearch = indexOfLastPostSearch - searchPostsPerPage
    const currentSearch = searchPostData.slice(indexOfFirstPostSearch, indexOfLastPostSearch);

    // console.log(currentSearch)
    
    const sortPostResult = async (e) =>{
        // const searchItem = localStorage.getItem('search-item')
        // setSearch(searchItem)

        let formData = new FormData;
        formData.append('search_data', searchItem)
        formData.append('sort', e)

        axios.post(`${API_URL}/api/search`, formData, config)
        .then((response) => {
            // console.log(response.data);
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
        .catch((error) => {
            console.log(error)
            if(typeof error.response === 'undefined'){
                toastIdRef.current = toast({ position: 'top', title: 'Undefined request. Please try again.', status: 'error', duration: 3000, isClosable: true })
            }
        });

    }

    const addDefaultSrc = (e) => {
        e.target.src = "/no-image-attachment.png";
        e.target.onerror = null;
    }

    return(
        <div className={useColorModeValue(styles.container, styles.container2)}>
            <Head>
                <title>Search results for: {search}</title>
                <meta name="description" content="Critique Hall generated by Next App" />
                <link rel="icon" href={useColorModeValue('/logo256.png', '/logo256-dark.png')} onLoad=""/>
                <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap" rel="stylesheet" />
            </Head>

            <ScrollToTop color={'black'} width={40} boxShadow={'dark-lg'} smooth />
            {/* <Image src={useColorModeValue('/searchresults.png', '/searchresults-dark.png')} w="20%"/> */}
            <Box w="100%" mb="10" mt="15vh">
                <Heading fontFamily={'Raleway'} color={useColorModeValue('#C1272D', '#FF5C61')}><Center><Image src={useColorModeValue('/critique-user-icon.png', '/critique-user-icon-dark.png')} w='1em' mr={5}/><Text color={changeColor2} mr={2}>Search results for:</Text> &quot;{search}&quot;</Center></Heading>
            </Box>
            
            
            <Flex w="80%">
                {/* <Pagination></Pagination> */}
                <Box w='10vw'></Box>
                <Spacer />
                
            </Flex>
            <Heading fontFamily={'Raleway'} color={useColorModeValue('#1B1464', '#B2A3FF')}>User:</Heading>

            {/* User item */}
            <Text id='user' mx='auto' my="50px" hidden fontFamily={'Raleway'} color={changeColor2}>No Users Found</Text> 
            {searchUserData.map((user, i) => (
            <Box w={{lg: '50%', base: "100%"}} key={user.user_id} bgImage={`url('${user.cover_photo}')`} bgSize="cover" border="2px" borderColor={changeColor2} color="white" mt={5} rounded="lg">
            <Link href="/profile/[id]" as={`/profile/${user.display_name}`} passHref>
                <a>
                <Box w={{lg: '100%', sm: '100%'}} display={{lg: 'flex', sm: 'block'}} flexDir={{lg: "row", base: "column"}}  mt='2ch' mx="auto" borderColor='dark' rounded='lg' fontFamily={'Raleway'}>
                    <Box p="3" w="100%" bg="light" ml={{lg: "30px", base: 0}}>
                        <Image src={user.profile_photo} w='170px' h='170px' rounded='full'/>
                    </Box>
                    <Spacer />
                    <Box p="3" w="100%" bg="light" ml={{lg: "20vh", base: 0}}>
                        <Center><Heading bgColor={changeColor2} borderRadius={10} fontFamily={'Raleway'} fontWeight={'black'} size='2xl' textShadow='2px 2px #000' p={1}  mt={28} display="flex">{user.display_name}{user.reputation_points >= 10 ? <Image src={changeBadgeIcon} alt="Badge Icon" w="50px" h="50px" ml={2}/> : null}</Heading></Center>
                        <Center><Heading bgColor={changeColor2} borderRadius={10} fontFamily={'Raleway'} fontWeight={'black'} size='md' color='gray.300' textShadow='2px 2px #000'A p={1} mt={2} display="flex">{user.first_name}<Text ml={1} color='gray.300'>{user.last_name}</Text></Heading></Center>
                    </Box>      
                </Box>
                
                </a>
            </Link>
            </Box>
            ))}
            <Heading mt={5} fontFamily={'Raleway'}  color={useColorModeValue('#1B1464', '#B2A3FF')}>Posts:</Heading>
            <Flex w={{lg: '70%', sm: '100%', base: "100%"}} my="30px" flexDir={{lg: 'row', base: 'column-reverse'}} alignItems="center">

                <Pagination
                    defaultCurrent={5}
                    current={currentSearchPage}
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
                    responsive
                />
                <Spacer />

                <Flex w={{lg: '15vw', base: '60%'}} mt={1} mb={{lg: 0, base: 10}} fontFamily={'Raleway'}>
                    <Text mr={{lg: 5, base: 0}} w={{lg: 28, base: '100%'}} mt={2} >Sort By: </Text>
                    <Select borderColor={useColorModeValue('black', 'white')} color={useColorModeValue('black', 'white')} bgColor={useColorModeValue('#FFFFFF', '#2E2E2E')} boxShadow={'lg'} onChange={(e) => sortPostResult(e.target.value)}>
                        <option value='desc'>Newest</option>
                        <option value='asc'>Oldest</option>
                    </Select>
                </Flex>
            </Flex>

            {/* Search Item */}

            <Text id='post' mx='auto' hidden fontFamily={'Raleway'} color={changeColor2}>No Posts Found</Text>
            
            {currentSearch.map((post, i) => (
            <Box bgColor={changeBackgroundColor} border={changeBorderColor} w={{lg: '70%', sm: '100%'}} mt='2ch' mx="auto" key={post.post_id} display="flex" flexDir={{lg: "row", base: "column"}} boxShadow='lg' rounded='lg' fontFamily={'Raleway'}>
                                <Link href='/post/[id]'  as={`/post/${post.post_id}`} passHref>
                                <a>
                                <Box display={{lg: 'flex', sm: 'block'}} w={{lg: "50vw", sm: '100%'}}>
                                    <Box fontFamily={'Raleway'} p="3" w="100%" bg="light" my='auto'>
                                        <Center display={{lg: 'none', base: 'block'}} w="100%">
                                            <Box bgColor={post.hall_color} w="150px" p={5} color="white" rounded="md" boxShadow="lg">
                                                <Center>
                                                    {post.hall_name}
                                                </Center>
                                            </Box>
                                        </Center>
                                        <Box display={{lg: 'block', base: 'none'}} bgColor={post.hall_color} w="150px" p={5} color="white" rounded="md" boxShadow="lg">
                                                <Center>
                                                    {post.hall_name}
                                                </Center>
                                            </Box>
                                    </Box>
                         
                                    {post.attachment1 != 'undefined' && post.attachment1.includes('.jpg') || post.attachment1.includes('.jpeg') || post.attachment1.includes('.JPG') || post.attachment1.includes('.png') || post.attachment1.includes('.PNG') || post.attachment1.includes('.gif')   ?
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
                                    <Box fontFamily={'Raleway'} p="3" w={{lg: "20%", base: "100%"}} bg="light" my='auto'>
                                        <Center>
                                        <Text>{post.title}</Text>
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
            ))}

        </div>
    )


};
