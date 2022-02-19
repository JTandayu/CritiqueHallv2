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
  import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
  } from '@chakra-ui/react'
import EditProfile from '@component/edit-profile'
import styles from '@styles/Profile.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useCookies, cookies } from 'react-cookie'
import ReportUser from '@component/report-user'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'
import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  })

const theme = extendTheme({ breakpoints })

// export async function getServerSideProps(context){
//     const { API_URL } = process.env
//     const { API_KEY } = process.env

//     // const cookies = context.req.headers.cookie;
//     // const cookie = await cookies.json()
//     // const data = []
//     // console.log(cookie);

//     // const config = {
//     //     method: 'Get',
//     //     headers: { 
//     //         'content-type': 'multipart/form-data',
//     //         'X-API-KEY': `${API_KEY}`,
//     //         'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
//     //         // 'Accept-Encoding': 'gzip, deflate, br',
//     //         'Accept': 'application/json',
//     //         'token': cookies.token,
//     //         'user_id': cookies.encrypted_id
//     //     }
//     // }

//     // const res = await fetch(`${API_URL}/api/display_profile/${cookies.display_name}`, config)

//     // const data = await res.json()

//     const data = context.params.id

//     // console.log(data.id)

//     return{
//         props:{
//             data
//         }
//     }

// }

export default function ProfilePage({}){
    const { API_URL } = process.env
    const { API_KEY } = process.env
    const router = useRouter()
    const data = router.query.id

    // const [cookies] = useCookies()
    const [userData, setUserData] = useState('')
    const [userPosts, setUserPosts] = useState([])
    const [userCritique, setUserCritique] = useState([])
    const [filter, setFilter] = useState('newest')
    const [encID, setEncId] = useState("")
    const [loading, setLoading] = useState(true)
    const token = getCookie('token')
    const user_id = getCookie('encrypted_id')
    const display_name = getCookie('display_name')

    const changeColorBox = useColorModeValue('#E5E5E5', '#2E2E2E')
    const changeBadgeIcon = useColorModeValue('/badge-icon.png', '/badge-icon-dark.png')
    const changeStarIcon = useColorModeValue('/stars-clicked.png', '/stars-clicked-dark.png')
    const changeCommentIcon = useColorModeValue('/comments.png', '/comments-dark.png')
    const thereNoPost = useColorModeValue('/there-no-post.png', '/there-no-post-dark.png')

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

    // const user_id = cookies.id
    useEffect(() => {

        document.getElementById('posts').removeAttribute('hidden');
        document.getElementById('critiques').hidden=true;
        document.getElementById('postFilter').removeAttribute('hidden');
        document.getElementById('critiqueFilter').hidden=true;

        

        axios.get(`${API_URL}/api/display_profile/${data}`, config)
        .then(response => {
            // console.log(response.data);      
            setUserData(response.data.data.user)
            displayPostCritique(response.data.data.user.encrypted_id)
            setEncId(response.data.data.user.encrypted_id)
        })
        .catch(error => {
            console.log(error);
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
            // console.log(response.data);      
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
            // console.log(response.data);      
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

    const addDefaultSrc = (e) => {
        e.target.src = "/no-preview-available.png";
        e.target.onerror = null;
    }

    return(
        <main className={useColorModeValue(styles.container, styles.container2)}>

            <Head>
                <title>Critique Hall - Profile | {userData.display_name} </title>
                <meta name="description" content="Critique Hall generated by Next App" />
                <link rel="icon" href={useColorModeValue('/logo256.png', '/logo256-dark.png')} onLoad=""/>
                <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap" rel="stylesheet" />
            </Head>

            <Box mx={{lg: 'auto', md: '0', sm: '0'}} my='auto' bg={useColorModeValue('#E0EEFF', '#333e4f')} w={{lg: '90%', md: '100%', sm: '100%', base: "100%"}} h={{lg: '80vh', md: '100vh', sm: '150vh'}} rounded='lg' mt={32} mb={{lg: 0, md: 0, sm: 10}} position='static' boxShadow={'dark-lg'}>
             
                <Box display='flex' flexDir={{lg: 'row', md: 'column', sm: 'column', base: "column"}} w='100%'>
                    
                    <Box w={{lg: '100vw', md: '95vw', sm: '90%', base: '85vw'}} h={{lg: '35vh', md: '35vh', sm: '45vh', base: '40vh'}} bg='white' bgImage={`url('${userData.cover_photo}')`} bgSize="cover" p={3} display={{lg: 'flex', sm: 'block'}} mt={5} ml={{lg: 8, md: 3, sm: 5, base: 5}} rounded='lg'>
                        
                        <Box w='20vh' h='20vh' mt={24} ml={{lg: 5, md: 0, sm: 0, base: '25%'}} mx={{lg: 0, md: 0, sm: 'auto'}} rounded='full'>
                            <Center>
                                <Image w={{lg: '18vh', base: '10vh'}} h={{lg: '18vh', base: '10vh'}} rounded='full' src={userData.profile_photo} mt={{lg: 3, base: '-20%'}}/>
                            </Center>
                        </Box>

                        <Box w={{lg:'50vh', base: "100%"}} mx='auto' ml={{lg: '10vw', md: 0, sm: 0, base: 0}} alignItems={{md: 'center', sm: "center", base: "center"}}>
                            <Box ml={16} mt={2} float="right">
                                {userData && userData.display_name !== display_name ? <ReportUser data={userData}  /> : null}
                            </Box>
                            <Heading fontFamily={'Raleway'} fontWeight={'black'} size="xl" textShadow='2px 2px #000' color='white' ml={{lg: '10vw', md: 0, sm: 0, base: '30%'}} mt={{'2xl': 48 , lg: 40,  base: '-20%'}}>{userData.display_name}</Heading>
                            <Flex ml={{lg: '10vw', md: 0, sm: 0}} mt={1} mx='auto' textShadow='1px 1px #000' >
                                <Heading fontFamily={'Raleway'} size={{lg: 'lg', base: 'md'}} mr={3} color='white' ml={{lg: 0, md: 0, sm: 0, base: '30%'}}>{userData.first_name}</Heading>
                                <Heading fontFamily={'Raleway'} size={{lg: 'lg', base: 'md'}}  color='white'>{userData.last_name}</Heading>
                            </Flex>
                        </Box>
                        
                    </Box>
                    <Box overflowY='auto' w={{lg: '70vw', md: '97%', sm: '90%', base: '89%'}} h={{lg: '35vh', md: '30%', sm: '45vh'}} bg={useColorModeValue('#81A4CF', '#0A1A2D')} p={3} mt={5} ml={{lg: 8, md: 3, sm: 5, base: 5}} mr={{lg: 5, md: 0, sm: 0}} rounded='lg' fontFamily={'Raleway'}>
                        <Flex>
                        <Heading size='lg' as='h3' color={useColorModeValue('#1B1464', '#B2A3FF')} mt={10} fontFamily={'Raleway'} display='flex'><Image src={useColorModeValue('/critique-user-icon.png', '/critique-user-icon-dark.png')} w='10%' mr={5}/>About Me: </Heading>
                        <Spacer />
                            {userData && userData.display_name === display_name ? <EditProfile data={userData}/> : null}
                        </Flex>
                        <Text w={{lg: '65vh', md: '100%', sm: '100%'}} fontSize='xl' color="white">{userData.about_me}</Text>
                        <Heading size='lg' color={useColorModeValue('#1B1464', '#B2A3FF')} mt={5} display="flex" fontFamily={'Raleway'}>Reputation Stars: <Text fontFamily={'Raleway'} color={useColorModeValue('#C1272D', '#FF5C61')} ml={5} display='flex'>{userData.reputation_points}{userData.reputation_points >= 10 ? <Image src={changeBadgeIcon} alt="Badge Icon" w="50px" h="50px" ml={2}/> : null}
                        <Popover trigger="hover">
                        <PopoverTrigger>
                        <Image src='/question-icon.png' _hover={{cursor: 'pointer'}} alt="question icon" w="20px" h="20px" ml={2} mt={3}/>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow /> 
                            {/* <PopoverCloseButton color={useColorModeValue('black', 'white')}/> */}
                            <PopoverBody><Text fontSize="md" fontFamily={'Raleway'} color={useColorModeValue('black', 'white')} align="justify" p={3}>Reaching 10 stars grants you a Top User badge! This will be displayed in your profile and beside your name whenever you give a critique.</Text></PopoverBody>
                        </PopoverContent> 
                        </Popover>
                        </Text>
                        </Heading>
                        <Heading size='lg' color={useColorModeValue('#1B1464', '#B2A3FF')} mt={5} fontFamily={'Raleway'} display='flex'>Specialization: <Text fontFamily={'Raleway'} color={useColorModeValue('#C1272D', '#FF5C61')} ml={5}>{userData.specialization}</Text></Heading>
                    </Box>
                </Box>
                <Box display='flex' flexDir={{lg: 'row', md: 'row', base: "column"}} w={{lg: '100%', md: '100%', sm: '100%', base: "90%"}} mt={5} ml={{lg: 3, base: 5}} mr={5}>
                    {/* <Button ml={5} h='2em' position='static'>All</Button> */}
                    <Button className={useColorModeValue(styles.myposts, styles.myposts2)} fontFamily={'Raleway'} color={useColorModeValue('black', 'white')} fontWeight={'bold'} ml={{lg: 5, base: 0}} h='2em' position='static' onClick={OpenPost} boxShadow={'lg'}>{userData.display_name === display_name ? <p>My Posts</p> : <p>Post</p>}</Button>
                    <Button className={useColorModeValue(styles.mycritiques, styles.mycritiques2)} fontFamily={'Raleway'} color={useColorModeValue('black', 'white')} fontWeight={'bold'} mt={{lg: 0, md: 0 , base: 5}} ml={{lg: 5, md: 5, base: 0}} h='2em' position='static' onClick={OpenCritique} boxShadow={'lg'}>{userData.display_name === display_name ? <p>My Critiques</p> : <p>Critiques</p>}</Button>
                    <Spacer />
                    <Flex w={{lg: '15vw', sm: '30vw'}} mt={{lg: 1, md: 0, base: 5}} mr={10} id='postFilter'>
                        {/* <Text fontFamily={'Raleway'} mr={{lg: 5, sm: 1}} w={20} mt={2}>Sort by: </Text> */}
                        <Text fontFamily={'Raleway'} mr={{lg: 1, sm: 1}} w={28} mt={2}>Sort by:</Text>
                        <Select fontFamily={'Raleway'} fontWeight={'bold'} onChange={(e)=>sortPost(e.target.value)}  color={useColorModeValue('black', 'white')} bgColor={useColorModeValue('#FFFFFF', '#2E2E2E')} borderColor={useColorModeValue('black', 'white')} boxShadow={'lg'}>
                            <option disabled>Filter Item</option>
                            <option value='desc'>Newest</option>
                            <option value='asc'>Oldest</option>
                            <option value='most_stars'>Most Post Stars</option>
                            {/* <option value='most_interacted'>Most Interacted</option> */}
                        </Select>
                    </Flex>
                    <Flex w={{lg: '15vw', sm: '30vw'}} mt={{lg: 1, base: 5}}  mr={10} id='critiqueFilter'>
                        {/* <Text fontFamily={'Raleway'} mr={{lg: 5, sm: 1}} w={20} mt={2}>Sort by: </Text> */}
                        <Text fontFamily={'Raleway'} mr={{lg: 1, sm: 1}} w={28} mt={2}>Sort by:</Text>
                        <Select fontFamily={'Raleway'} fontWeight={'bold'} onChange={(e)=>sortCritique(e.target.value)}  color={useColorModeValue('black', 'white')} bgColor={useColorModeValue('#FFFFFF', '#2E2E2E')} borderColor={useColorModeValue('black', 'white')} boxShadow={'lg'}>
                            <option disabled>Filter Item</option>
                            <option value='desc'>Newest</option>
                            <option value='asc'>Oldest</option>
                            <option value='most_stars'>Most Critique Stars</option>
                            {/* <option value='most_interacted'>Most Interacted</option> */}
                        </Select>
                    </Flex>
                </Box>
                {loading ? 
                <Box display='flex' h={{lg: '30vh', md: '30vh', sm: '40vh', base: '42vh'}} w={{lg: '98%', base: "90%" }} p={3} mt={5} ml={3} mr={3}  rounded='lg' overflowX='auto' css={{
                            '&::-webkit-scrollbar': {
                            width: '4px',
                            },
                            '&::-webkit-scrollbar-track': {
                            width: '6px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                            background: '#212121',
                            borderRadius: '24px',
                            },
                        }}>
                    <Box id='posts' display='flex'>
                        {userPosts !== null ?
                        userPosts.map((posts, i) => (
                            <Link href={`/post/${posts.post_id}`} key={i} passHref>
                                <Box bgColor={changeColorBox} w={{lg: '20vw', sm: '300px', base: '300px'}} h={{lg: '28vh', md: '28vh', base: '30vh'}} ml={5} borderRadius={10} boxShadow="md">
                                    {/* <Center mt={3}>
                                        <Heading size='md' mx="auto">{posts.title}</Heading>
                                    </Center> */}
                                    <Center mt={0}>
                                        {posts.attachment1 != 'undefined' ? 
                                        <Box bgColor={posts.hall_color} borderRadius={10}><Image _hover={{cursor: 'pointer'}} src={posts.attachment1} w={{lg: '400px', sm: '300px'}} h='20vh' onError={addDefaultSrc} borderRadius={10} boxShadow="md" display="flex" objectFit='cover'/><Box display="flex" w="100%"><Text fontFamily={'Raleway'} color="white" borderRadius={10} align="center" ml={2}>{posts.hall}</Text><Spacer /><Text fontFamily={'Raleway'} fontSize="sm" color="gray.300" borderRadius={10} align="center" mr={2}>{posts.time_ago}</Text></Box></Box>
                                        : <Box bgColor={posts.hall_color} borderRadius={10}><Image _hover={{cursor: 'pointer'}} src="/no-image-attachment.png" w={{lg: '400px', sm: '300px'}} h='20vh' onError={addDefaultSrc} borderRadius={10} boxShadow="md" display="flex" objectFit='cover'/><Box display="flex" w="100%"><Text fontFamily={'Raleway'} color="white" borderRadius={10} align="center" ml={2}>{posts.hall}</Text><Spacer /><Text fontFamily={'Raleway'} fontSize="sm" color="gray.300" borderRadius={10} align="center" mr={2}>{posts.time_ago}</Text></Box></Box>}
                                    </Center>
                                    <Flex w='100%' p={3} fontFamily={'Raleway'}>
                                    <Image src={changeStarIcon} alt="Stars" w="25px" h="25px" ml={2}/> {posts.likes}
                                        <Spacer />
                                        <Image src={changeCommentIcon} alt="Critiques" w="25px" h="25px" ml={2}/>  {posts.critiques}
                                        <Spacer />
                                        <Text ml={5} isTruncated>{posts.body}</Text>
                                    </Flex>
                                </Box>
                            </Link>
                        )) : <Text fontFamily={'Raleway'} fontWeight={'bold'} fontSize="6xl" color="dark">No posts found...</Text>}
                    </Box>
                    <Box id='critiques' display='flex'>
                        {userCritique !== null ?
                        userCritique.map((critique, i) => (
                            <Link href={`/post/${critique.post_id}`} key={i} passHref>
                                <Box bgColor={changeColorBox} w={{lg: '20vw', sm: '300px', base: '300px'}} h={{lg: '28vh', md: '28vh', base: '30vh'}} ml={5} borderRadius={10} boxShadow="md">
                                    {/* <Center mt={3}>
                                        <Heading size='md' mx="auto">{critique.title}</Heading>
                                    </Center> */}
                                    <Center mt={0}>
                                        {critique.attachment1 != 'undefined' ? 
                                         <Box bgColor={critique.hall_color} borderRadius={10}><Image _hover={{cursor: 'pointer'}} src={critique.attachment1} w={{lg: '400px', sm: '300px'}} h='20vh' onError={addDefaultSrc} borderRadius={10} boxShadow="md" display="flex" objectFit='cover'/><Box display="flex" w="100%"><Text fontFamily={'Raleway'} color="white" borderRadius={10} align="center" ml={2}>{critique.hall}</Text><Spacer /><Text fontFamily={'Raleway'} fontSize="sm" color="gray.300" borderRadius={10} align="center" mr={2}>{critique.time_ago}</Text></Box></Box>
                                         : <Box bgColor={critique.hall_color} borderRadius={10}><Image _hover={{cursor: 'pointer'}} src="/no-image-attachment.png" w={{lg: '400px', sm: '300px'}} h='20vh' onError={addDefaultSrc} borderRadius={10} boxShadow="md" display="flex" objectFit='cover'/><Box display="flex" w="100%"><Text fontFamily={'Raleway'} color="white" borderRadius={10} align="center" ml={2}>{critique.hall}</Text><Spacer /><Text fontFamily={'Raleway'} fontSize="sm" color="gray.300" borderRadius={10} align="center" mr={2}>{critique.time_ago}</Text></Box></Box>}
                                         </Center>
                                    <Flex w='100%' p={3} fontFamily={'Raleway'}>
                                    <Image src={changeStarIcon} alt="Stars" w="25px" h="25px" ml={2}/> {critique.stars}
                                        <Spacer />
                                        <Text ml={5} isTruncated>{critique.critique}</Text>
                                    </Flex>
                                </Box>
                            </Link>)    
                        ) : <Text fontFamily={'Raleway'} fontWeight={'bold'} fontSize="6xl" color="dark">No critiques found...</Text> }
                    </Box>
                </Box>
                : <Text fontFamily={'Raleway'} fontWeight={'bold'} fontSize="6xl" color="dark">Loading...</Text> }
            </Box>
        </main>
    )

};
