import Head from 'next/head'
// import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import { Grid, GridItem, useColorModeValue } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import Link from 'next/link'
import styles from "@styles/Feedback.module.css";
import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { Button, ButtonGroup, Spacer, Flex, Select } from "@chakra-ui/react"
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
import { Textarea, Image, Text } from '@chakra-ui/react'
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
    Center
  } from '@chakra-ui/react'
  import { ChevronDownIcon } from '@chakra-ui/icons'
import EditPost from '@component/post/options/edit';
import EditHistory from '@component/edit-history';
import ReportPost from '@component/report-post';
import ReportUser from '@component/report-user';
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { CritiqueReply } from '@component/critique/CritiqueReply'
import DeletePost from '@component/post/options/delete'
import { Critiques } from '@component/critique/Critiques'
import { storage } from '../../../firebase.js'
import { getDownloadURL, ref, uploadBytesResumable, deleteObject  } from 'firebase/storage'
import { useToast } from '@chakra-ui/react'
import { SRLWrapper } from "simple-react-lightbox";
import { post } from 'jquery'
import { cookie } from 'cookie'
import Linkify from 'linkify-react';
import { useRouter } from 'next/router'

const breakpoints = createBreakpoints({
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  })

const theme = extendTheme({ breakpoints })

// export async function getServerSideProps(context) {
//     const { API_URL } = process.env
//     const { API_KEY } = process.env

//     const post_id = context.params.id
//     const cookie = context.req.cookies

//     // const parsedCookies = cookie.parse(context.req.headers.cookie);

//     const res = await fetch(`${API_URL}/api/display_post/${context.params.id}`, {
//         method: 'GET',
//         headers: {
//             'content-type': 'multipart/form-data',
//             'X-API-KEY': `${API_KEY}`,
//             'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
//             'Accept': 'application/json',
//             'Token': cookie.token,
//             'User-Id': cookie.encrypted_id
//         },
//     })
//     const data = await res.json()
//     // console.log(data.post);
    
//   return {
//     props: {
//         post_id,
//         data1: data
//     },
//   }
// }

// export async function getServerSideProps(context){
//     const post_id = context.params.id

//     // console.log(post_id)

//     return {
//             props: {
//                 post_id
//             },
//           }
// }

const options = {
    buttons: {
      showDownloadButton: false,
      showAutoplayButton: false,
      showFullscreenButton: false,
    }
}


export default function CritiquePost({}){
    const { API_URL } = process.env
    const { API_KEY } = process.env
    const toast = useToast()
    const router = useRouter()
    const post_id = router.query.id;
    // console.log(post_id)


    const [cookies, setCookie] = useCookies(['token', 'id', 'encrypted_id', 'display_name'])
    const [critique, setCritique] = useState('')
    const token = cookies.token
    const user_id = cookies.encrypted_id
    const id = cookies.id
    const likes = null
    const [data, setData] = useState([])
    const [urls, setUrls] = useState([])
    const [fileName, setFileName] = useState([])
    const [filter, setFilter] = useState('newest')
    const [newPost, setNewPost] = useState(0)
    var fileName1 = ''
    var fileName2 = ''
    var fileName3 = ''
    var fileName4 = ''
    var fileName5 = ''
    const [file1Doc, setfile1Doc] = useState(false)
    const [file2Doc, setfile2Doc] = useState(false)
    const [file3Doc, setfile3Doc] = useState(false)
    const [file4Doc, setfile4Doc] = useState(false)
    const [file5Doc, setfile5Doc] = useState(false)
    const [newCritique, setNewCritique] = useState('')

    useEffect(() => {
        // console.log(post_id.post_id)
        if(!router.isReady) return;

        const config = {
            headers: { 
              'content-type': 'multipart/form-data',
              'X-API-KEY': `${API_KEY}`,
              'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
              'Accept': 'application/json',
              'Token': cookies.token,
              'User-Id': cookies.encrypted_id
            }
        }

        axios.get(`${API_URL}/api/display_post/${post_id}`, config)
        .then(response => {
            console.log(response.data);
            setNewCritique('temp')
            fileName1 = ref(storage, response.data.post.attachment1).name; 
            fileName2 = ref(storage, response.data.post.attachment2).name; 
            fileName3 = ref(storage, response.data.post.attachment3).name; 
            fileName4 = ref(storage, response.data.post.attachment4).name;
            fileName5 = ref(storage, response.data.post.attachment5).name; 
            setData(response.data.post);
            // console.log(storage.refFromURL(response.data.post.attachment1))
            // console.log(fileName)

            if(response.data.post.display_name === cookies.display_name){
                document.getElementById('diffAcc').hidden=true;
            }else{
                document.getElementById('sameAcc').hidden=true; 
            }

            if(fileName1.endsWith('.docx') == true || fileName1.endsWith('.xls') == true){
                setfile1Doc(true)
            }
            if(fileName2.endsWith('.docx') == true || fileName2.endsWith('.xls') == true){
                setfile2Doc(true)
            }
            if(fileName3.endsWith('.docx') == true || fileName3.endsWith('.xls') == true){
                setfile3Doc(true)
            }
            if(fileName4.endsWith('.docx') == true || fileName4.endsWith('.xls') == true){
                setfile4Doc(true)
            }
            if(fileName5.endsWith('.docx') == true || fileName5.endsWith('.xls') == true){
                setfile5Doc(true)
            }

            // console.log(file1Doc)
            
        })
        .catch(error => {
            console.log(error);
        });

        

    }, [router.isReady])

    

    const giveLike = async () =>{

        let formData = new FormData();
        formData.append('token', token)
        formData.append('post_id', data.post_id_encrypted)
        formData.append('user_id', user_id)
        // console.log(data.post_id_encrypted)
        // console.log(data.post_id_encrypted)

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

        axios.post(`${API_URL}/api/like_post/${post_id}`, formData, config)
        .then(response => {
            console.log(response.data);
            document.getElementById('likes').innerHTML=response.data.stars;
        })
        .catch(error => {
            console.log(error);
            // console.log(error.response);
        });
    }

    const giveCritique = (e) =>{
        e.preventDefault();
        let formData = new FormData();
        formData.append('body', critique)
        formData.append('post_id', post_id)

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

        axios.post(`${API_URL}/api/create_critique`, formData, config)
        .then(response => {
            console.log(response.data);
            setNewCritique(critique)
            // window.location.href=`/post/${post_id.post_id}`
            setCritique('')
        })
        .catch(error => {
            console.log(error.response);
            // console.log(error.response);
        });
    }


    return(
        <>
        <main className={useColorModeValue(styles.container, styles.container2)}>
            <Head>
            <title>Critique Hall - Post | {data.title}</title>
            <meta name="description" content="Critique Hall generated by Next App" />
            <link rel="icon" href={useColorModeValue('/logo256.png', '/logo256-dark.png')} onLoad=""/>
            <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap" rel="stylesheet" />
            </Head>

            <Box w="100%" h="full" spacing="10px" mt="5">
                <Box display="flex" flexDir={{lg: 'row', sm: 'column'}} p="3">
                    {/* Main */}
                    {/* <PostMain /> */}
                <Box  w={{lg: '50%', sm: '100%'}}  bg={useColorModeValue('white', '#212121')} h={{lg: "90vh", sm: "100%"}} p={5} boxShadow='dark-lg' borderRadius={10} mt={28} ml='3vw'>
                    <Heading fontFamily={'Raleway'} mx="auto">{data.title}</Heading>

                    {/* Description */}
                    <Box mt={5}>
                        {/* <Heading size='md'>Description</Heading> */}
                        <Linkify>
                            <Text fontFamily={'Raleway'} fontSize='sm' textAlign={'justify'} w={{lg: '45vw', sm: '100%'}} mx='auto' mt={5}>{data.body}</Text>
                        </Linkify>
                    </Box>

                    <SRLWrapper options={options}>     
                    {/* Image */}
                    {/* <Flex ml={{lg: "10vh", sm: 5}} flexDir={{lg: "row", sm: 'column'}} mt={5}>
                        <Image src={data.attachment1} w='50vh' h='40vh' />
                        <Flex flexDir='column' spacing={5}>
                            <Image src={data.attachment2} w='20vh' h='10vh' />
                            <Image src={data.attachment3} w='20vh' h='10vh' />
                            <Image src={data.attachment4} w='20vh' h='10vh' />
                            <Image src={data.attachment5} w='20vh' h='10vh' />
                        </Flex>
                    </Flex> */}
                    { data.attachment1 != 'undefined' ?
                    <Flex ml={{lg: "10vh", sm: 5}} flexDir={{lg: "row", sm: 'column'}} mt={5}>
                            {data.attachment1 != 'undefined' ? [ file1Doc != true || file1Doc != true ?
                                <Image src={data.attachment1} w='50vh' h='40vh' cursor="pointer" /> :
                                <Center p={10} w="full">
                                    <Link href={data.attachment1}  passHref>
                                        <Button>Download {fileName1} </Button>
                                    </Link>
                                </Center>
                                ] : null}
                            <Flex flexDir='column' w="full" spacing={5}>
                            {data.attachment2 != 'undefined' ? [ file2Doc != true || file2Doc != true ?
                                <Image src={data.attachment2} w='20vh' h='10vh' cursor="pointer" /> :
                                <Center p={5}>
                                    <Link href={data.attachment2} passHref>
                                        <Button>Download</Button>
                                    </Link>
                                </Center>
                                ] : null}

                            {data.attachment3 != 'undefined' ? [ file3Doc != true || file3Doc != true ?
                                <Image src={data.attachment3} w='20vh' h='10vh' cursor="pointer" /> :
                                <Center p={5}>
                                    <Link href={data.attachment3} passHref>
                                        <Button>Download</Button>
                                    </Link>
                                </Center>
                                ] : null}

                            {data.attachment4 != 'undefined' ? [ file4Doc != true || file4Doc != true ?
                                <Image src={data.attachment4} w='20vh' h='10vh' cursor="pointer" /> :
                                <Center p={5}>
                                    <Link href={data.attachment4} passHref>
                                        <Button>Download</Button>
                                    </Link>
                                </Center>
                                ] : null}

                            {data.attachment5 != 'undefined' ? [ file5Doc != true || file5Doc != true ?
                                <Image src={data.attachment5} w='20vh' h='10vh' cursor="pointer" /> :
                                <Center p={5}>
                                    <Link href={data.attachment5} passHref>
                                        <Button>Download</Button>
                                    </Link>
                                </Center>
                                ] : null}
                               
                            </Flex>
                    </Flex> : 
                    
                    <Center>
                        <Image src="/no-preview-available.png" w='700px' h='300px' cursor="pointer"  disabled />
                    </Center>
                    }
                    </SRLWrapper>
                    {/* Options */}
                    <Box display="flex" w="100%" mt={5}>
                        <Button position='static' variant='ghost' onClick={giveLike}><Image src='/stars.png' alt="Stars" w="25px" h="25px" ml={2}/> <Text id='likes' ml={2}>{data.likes}</Text></Button>
                        <Spacer />
                        <Box id='sameAcc' >
                            <Menu>
                                <MenuButton
                                px={4}
                                py={2}
                                transition='all 0.2s'
                                >
                                <ChevronDownIcon />
                                </MenuButton>
                                <MenuList p={3}>
                                <MenuGroup>
                                    <MenuItem fontFamily={'Raleway'}><EditPost data={data} url={urls} fileNames={fileName} /></MenuItem>
                                </MenuGroup>
                                <MenuDivider />
                                {/* <MenuGroup>
                                    <MenuItem><EditHistory /></MenuItem>
                                </MenuGroup>
                                <MenuDivider /> */}
                                <MenuGroup>
                                    <MenuItem fontFamily={'Raleway'}><DeletePost id={data.post_id} /></MenuItem>
                                </MenuGroup>
                                </MenuList>
                            </Menu>
                        </Box> 
                        <Box id='diffAcc'>
                            {/* <Menu>
                                <MenuButton
                                px={4}
                                py={2}
                                transition='all 0.2s'
                                >
                                <ChevronDownIcon />
                                </MenuButton>
                                <MenuList p={3}>
                                <MenuGroup>
                                    <MenuItem><EditHistory /></MenuItem>
                                </MenuGroup>
                                <MenuDivider />
                                <MenuGroup >
                                    <MenuItem><ReportPost /></MenuItem>
                                </MenuGroup>
                                </MenuList>
                            </Menu> */}
                        </Box>
                    </Box>
                    {/* Critique Input */}
                    <form onSubmit={giveCritique}>
                    <Box display='flex' flexDir='column' mt={5}>
                        <Textarea borderColor={useColorModeValue('black', 'white')} fontFamily={'Raleway'} placeholder='Critique this...' bg={useColorModeValue('white', '#212121')} boxShadow='md' w={{lg: '90vh', sm: '100%'}} mx="auto" mt={3} onChange={e => setCritique(e.target.value)} value={critique} />
                        <Button fontFamily={'Raleway'} color={useColorModeValue('white', 'white')} _hover={{bgColor: useColorModeValue('#173cff', '#428eff')}} bgColor={useColorModeValue('#0C1F83', '#1D447E')} type='submit' w='10vh' mx='auto' mt={3}>Submit</Button>
                    </Box>
                    </form>
        
            </Box>
                    {/* Critique */}
                    <Box w={{lg: '40%', sm: '100%'}} bg={useColorModeValue('white', '#212121')} borderRadius={10} h='90vh' p={5} boxShadow='dark-lg' mt={28} ml='3vw'>
                        {post_id ? <Critiques id={post_id} newCritique={newCritique} /> : <Text>Something is wrong</Text>}
                    </Box>
                    
                </Box>
            </Box>

        </main>

        
        
        </>
    )
}