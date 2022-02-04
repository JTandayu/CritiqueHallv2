import Head from 'next/head'
// import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import { Grid, GridItem } from "@chakra-ui/react"
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

const breakpoints = createBreakpoints({
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  })

const theme = extendTheme({ breakpoints })

export async function getServerSideProps(context) {
    const { API_URL } = process.env
    const { API_KEY } = process.env

    // const res = await fetch(`${API_URL}/api/display_post/${context.params.id}`, {
    //     method: 'GET',
    //     headers: {
    //         'content-type': 'multipart/form-data',
    //         'X-API-KEY': `${API_KEY}`,
    //         'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
    //         // 'Accept-Encoding': 'gzip, deflate, br',
    //         'Accept': 'application/json',
    //     },
    // })

    const post_id = context.params.id
    
  return {
    props: {
        post_id
    },
  }
}


export default function CritiquePost(post_id){
    const { API_URL } = process.env
    const { API_KEY } = process.env
    const toast = useToast()

    const [cookie, setCookie] = useCookies(['token', 'id', 'encrypted_id', 'display_name'])
    const [critique, setCritique] = useState('')
    const token = cookie.token
    const user_id = cookie.encrypted_id
    const id = cookie.id
    const likes = null
    const [data, setData] = useState([])
    const [urls, setUrls] = useState([])
    const [fileName, setFileName] = useState([])
    const [filter, setFilter] = useState('newest')
    const [newPost, setNewPost] = useState(0)

    useEffect(() => {
        // console.log(post_id.post_id)

        const config = {
            headers: { 
              'content-type': 'multipart/form-data',
              'X-API-KEY': `${API_KEY}`,
              'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
              'Accept': 'application/json',
              'Token': cookie.token,
              'User-Id': cookie.encrypted_id
            }
        }

        axios.get(`${API_URL}/api/display_post/${post_id.post_id}`, config)
        .then(response => {
            console.log(response.data);
            const fileName1 = ref(storage, response.data.post.attachment1); 
            const fileName2 = ref(storage, response.data.post.attachment2); 
            const fileName3 = ref(storage, response.data.post.attachment3); 
            const fileName4 = ref(storage, response.data.post.attachment4); 
            const fileName5 = ref(storage, response.data.post.attachment5); 
            // console.log(fileName1.name)
            setData(response.data.post);
            // console.log(storage.refFromURL(response.data.post.attachment1))
            // console.log(fileName)

            if(response.data.post.display_name === cookie.display_name){
                document.getElementById('diffAcc').hidden=true;
            }else{
                document.getElementById('sameAcc').hidden=true; 
            }
            
            if(response.data.post.attachment1 !== 'undefined'){
                setUrls((prevState) => [...prevState, response.data.post.attachment1])
                setFileName((prevState) => [...prevState, fileName1.name])
                if(response.data.post.attachment2 !== 'undefined'){
                    setUrls((prevState) => [...prevState, response.data.post.attachment2])
                    setFileName((prevState) => [...prevState, fileName2.name])
                    if(response.data.post.attachment3 !== 'undefined'){
                        setUrls((prevState) => [...prevState, response.data.post.attachment3])
                        setFileName((prevState) => [...prevState, fileName3.name])
                        if(response.data.post.attachment4 !== 'undefined'){
                            setUrls((prevState) => [...prevState, response.data.post.attachment4])
                            setFileName((prevState) => [...prevState, fileName4.name])
                            if(response.data.post.attachment5 !== 'undefined'){
                                setUrls((prevState) => [...prevState, response.data.post.attachment5])
                                setFileName((prevState) => [...prevState, fileName5.name])
                            }
                        }
                    }
                }
            }
   
        })
        .catch(error => {
            console.log(error);
        });

        

    }, [])

    

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
              'Token': cookie.token,
              'User-Id': cookie.encrypted_id
            }
        }

        axios.post(`${API_URL}/api/like_post/${post_id.post_id}`, formData, config)
        .then(response => {
            console.log(response.data);
            document.getElementById('likes').innerHTML=response.data.stars;
        })
        .catch(error => {
            console.log(error);
            // console.log(error.response);
        });
    }

    const giveCritique = async(e) =>{
        e.preventDefault();
        let formData = new FormData();
        formData.append('body', critique)
        formData.append('post_id', post_id.post_id)

        const config = {
            headers: { 
              'content-type': 'multipart/form-data',
              'X-API-KEY': `${API_KEY}`,
              'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
              // 'Accept-Encoding': 'gzip, deflate, br',
              'Accept': 'application/json',
              'Token': cookie.token,
              'User-Id': cookie.encrypted_id
            }
        }

        axios.post(`${API_URL}/api/create_critique`, formData, config)
        .then(response => {
            console.log(response.data);
            window.location.href=`/post/${post_id.post_id}`
        })
        .catch(error => {
            console.log(error.response);
            // console.log(error.response);
        });
    }


    return(
        <>
        <main className={styles.container}>
            <Head>
            <title>Critique Hall - Post | {data.title}</title>
            <meta name="description" content="Critique Hall generated by Next App" />
            <link rel="icon" href="/logo256.png" onLoad=""/>
            </Head>

            <Box w="100%" h="full" spacing="10px" mt="5">
                <Box display="flex" flexDir={{lg: 'row', sm: 'column'}} p="3">
                    {/* Main */}
                    {/* <PostMain /> */}
                    <Box w={{lg: '50%', sm: '100%'}} bg='light' h={{lg: "90vh", sm: "100%"}} p={5} boxShadow='md' mt={28} ml='3vw'>
                    <Heading mx="auto">{data.title}</Heading>

                    {/* Description */}
                    <Box mt={5}>
                        <Heading size='md'>Description</Heading>
                        <Text w={{lg: '45vw', sm: '100%'}} mx='auto' mt={5}>{data.body}</Text>
                    </Box>

                    <SRLWrapper>     
                    {/* Image */}
                    <Flex ml={{lg: "10vh", sm: 5}} flexDir={{lg: "row", sm: 'column'}} mt={5}>
                        <Image src={data.attachment1} w='50vh' h='40vh' />
                        <Flex flexDir='column' spacing={5}>
                            <Image src={data.attachment2} w='20vh' h='10vh' />
                            <Image src={data.attachment3} w='20vh' h='10vh' />
                            <Image src={data.attachment4} w='20vh' h='10vh' />
                            <Image src={data.attachment5} w='20vh' h='10vh' />
                        </Flex>
                    </Flex>
                    {/* { urls ?
                    <Flex ml={{lg: "10vh", sm: 5}} flexDir={{lg: "row", sm: 'column'}} mt={5}>
                        {data.attachment1 ? [ fileName[0].endsWith('.docx') == true || fileName[0].endsWith('.xls') == true ?
                            <Image src={data.attachment1} w='50vh' h='40vh' /> :
                            <Button>Download</Button>
                            ] : null}

                            <Flex flexDir='column' spacing={5}>
                            {data.attachment2 ? [ fileName[1].endsWith('.docx') == true || fileName[1].endsWith('.xls') == true ?
                                <Image src={data.attachment1} w='50vh' h='40vh' /> :
                                <Button>Download</Button>
                                ] : null}

                            {data.attachment3 ? [ fileName[2].endsWith('.docx') == true || fileName[2].endsWith('.xls') == true ?
                                <Image src={data.attachment1} w='50vh' h='40vh' /> :
                                <Button>Download</Button>
                                ] : null}

                            {data.attachment4 ? [ fileName[3].endsWith('.docx') == true || fileName[3].endsWith('.xls') == true ?
                                <Image src={data.attachment1} w='50vh' h='40vh' /> :
                                <Button>Download</Button>
                                ] : null}

                            {data.attachment5 ? [ fileName[4].endsWith('.docx') == true || fileName[4].endsWith('.xls') == true ?
                                <Image src={data.attachment1} w='50vh' h='40vh' /> :
                                <Button>Download</Button>
                                ] : null}
                                
                            </Flex>
                    </Flex> : null} */}
                    </SRLWrapper>
                    {/* Options */}
                    <Box display="flex" w="100%" mt={5}>
                        <Button position='static' variant='ghost' onClick={giveLike}>Like <Text id='likes' ml={2}>{data.likes}</Text></Button>
                        <Spacer />
                        <Box id='sameAcc' >
                            <Menu >
                                <MenuButton
                                px={4}
                                py={2}
                                transition='all 0.2s'
                                >
                                <ChevronDownIcon />
                                </MenuButton>
                                <MenuList p={3}>
                                <MenuGroup>
                                    <MenuItem><EditPost data={data} url={urls} fileNames={fileName} /></MenuItem>
                                </MenuGroup>
                                <MenuDivider />
                                {/* <MenuGroup>
                                    <MenuItem><EditHistory /></MenuItem>
                                </MenuGroup>
                                <MenuDivider /> */}
                                <MenuGroup>
                                    <MenuItem><DeletePost id={data.post_id} /></MenuItem>
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
                    <Box display='flex' flexDir='column' mt={5}>
                        <Textarea placeholder='Critique this...' bg='white' boxShadow='md' w={{lg: '90vh', sm: '100%'}} mx="auto" mt={3} onChange={e => setCritique(e.target.value)} />
                        <Button w='10vh' mx='auto' mt={3} onClick={giveCritique}>Submit</Button>
                    </Box>
        
            </Box>
                    {/* Critique */}
                    {/* <PostCritiques /> */}
                    <Box w={{lg: '40%', sm: '100%'}} bg='light' h='90vh' p={5} boxShadow='md' mt={28} ml='3vw'>
                    {/* Header */}
                    {/* <Box display='flex'>
                        <Heading>Critiques</Heading>
                        <Spacer />
                        <Flex w={{lg: '15vw', sm: '50%'}} mt={1}>
                        <Text mr={{lg: 5, sm: 1}} w={20} mt={2}>Sort by: </Text>
                        <Select onChange={(e)=>setFilter(e.target.value)}>
                            <option value='newest'>Newest</option>
                            <option value='oldest'>Oldest</option>
                            <option value='most-star'>Most Stars</option>
                            <option value='least-star'>Least Stars</option>
                        </Select>
                        </Flex>
                    </Box> */}
                    {/* Critiques */}
                    {/* <Box overflowY="scroll" h={{lg: '80vh', sm: '70vh'}} mt={5}> */}
                        <Critiques id={post_id.post_id} />
                    {/* </Box> */}
                    
                        
                    </Box>
                    
                </Box>
            </Box>

        </main>

        
        
        </>
    )
}