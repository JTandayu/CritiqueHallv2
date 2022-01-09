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

    const [cookie, setCookie] = useCookies('token', 'id', 'encrypted_id', 'display_name')
    const [critique, setCritique] = useState('')
    const token = cookie.token
    const user_id = cookie.encrypted_id
    const id = cookie.id
    const likes = null
    const [data, setData] = useState([])

    useEffect(() => {
        // console.log(post_id.post_id)

        const config = {
            headers: { 
              'content-type': 'multipart/form-data',
              'X-API-KEY': `${API_KEY}`,
              'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
              'Accept': 'application/json',
              'token': cookie.token,
              'user_id': cookie.encrypted_id
            }
        }

        axios.get(`${API_URL}/api/display_post/${post_id.post_id}`, config)
        .then(response => {
            console.log(response.data);
            setData(response.data.post);
            // console.log(cookie.display_name)

            if(response.data.post.display_name === cookie.display_name){
                document.getElementById('diffAcc').hidden=true;
            }else{
                document.getElementById('sameAcc').hidden=true; 
            }
            // console.log(posts)
        })
        .catch(error => {
            console.log(error.response);
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
              'token': cookie.token,
              'user_id': cookie.encrypted_id
            }
        }

        axios.post(`${API_URL}/api/like_post/${post_id.post_id}`, formData, config)
        .then(response => {
            console.log(response.data);
            document.getElementById('likes').innerHTML=response.data.likes;
        })
        .catch(error => {
            console.log(error);
            // console.log(error.response);
        });
    }

    const giveCritique = async() =>{
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
              'token': cookie.token,
              'user_id': cookie.encrypted_id
            }
        }

        axios.post(`${API_URL}/api/create_critique`, formData, config)
        .then(response => {
            console.log(response.data);
            // window.location=`post/${post_id.post_id}`
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
            <title>Critique Post</title>
            <meta name="description" content="Critique Hall generated by Next App" />
            <link rel="icon" href="/logo256.png" onLoad=""/>
            </Head>

            <Box w="100%" h="full" spacing="10px" mt="5">
                <Box display="flex" p="3">
                    {/* Main */}
                    {/* <PostMain /> */}
                    <Box w="50%" bg='light' h='90vh' p={5} boxShadow='md' mt={28} ml='3vw'>
                    <Heading mx="auto">{data.title}</Heading>
                            
                    {/* Image */}
                    <Flex ml="10vh" mt={5}>
                        <Image src={data.attachment1} w='50vh' h='40vh' onClick='' />
                            <Flex flexDir='column' spacing={5}>
                                <Image w='20vh' h='10vh' onClick='' src={data.attachment2} />
                                <Image w='20vh' h='10vh' onClick='' src={data.attachment3} />
                                <Image w='20vh' h='10vh' onClick='' src={data.attachment4} />
                                <Image w='20vh' h='10vh' onClick='' src={data.attachment5} />
                            </Flex>
                    </Flex>
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
                                    <MenuItem><EditPost data={data} /></MenuItem>
                                </MenuGroup>
                                <MenuDivider />
                                <MenuGroup>
                                    <MenuItem><EditHistory /></MenuItem>
                                </MenuGroup>
                                <MenuDivider />
                                <MenuGroup>
                                    <MenuItem><DeletePost /></MenuItem>
                                </MenuGroup>
                                </MenuList>
                            </Menu>
                        </Box> 
                        <Box id='diffAcc'>
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
                                    <MenuItem><EditHistory /></MenuItem>
                                </MenuGroup>
                                <MenuDivider />
                                <MenuGroup >
                                    <MenuItem><ReportPost /></MenuItem>
                                </MenuGroup>
                                </MenuList>
                            </Menu>
                        </Box>
                    </Box>
                    {/* Description */}
                    <Box mt={5}>
                        <Heading size='md'>Description</Heading>
                        <Text w='45vw' mx='auto' mt={5}>{data.body}</Text>
                    </Box>
                    {/* Critique Input */}
                    <Box display='flex' flexDir='column' mt={5}>
                        <Textarea bg='white' boxShadow='md' w="90vh" mx="auto" mt={3} onChange={e => setCritique(e.target.value)} />
                        <Button w='10vh' mx='auto' mt={3} onClick={giveCritique}>Post</Button>
                    </Box>
        
            </Box>
                    {/* Critique */}
                    {/* <PostCritiques /> */}
                    <Box w="40%" bg='light' h='90vh' p={5} boxShadow='md' mt={28} ml='3vw'>
                    {/* Header */}
                    <Box display='flex'>
                        <Heading>Critiques</Heading>
                        <Spacer />
                        <Flex w='15vw' mt={1}>
                        <Text mr={5} w={20} mt={2}>Sort By: </Text>
                        <Select>
                            <option value='oldest'>Oldest</option>
                            <option value='newest'>Newest</option>
                            <option value='most-star'>Most Stars</option>
                            <option value='least-star'>Least Stars</option>
                            <option value='has-badge'>Badge</option>
                        </Select>
                        </Flex>
                        {/* <Menu>
                            <MenuButton
                            px={4}
                            py={2}
                            transition='all 0.2s'
                            > 
                            Sort By: 
                            <ChevronDownIcon ml={2} />
                            </MenuButton>
                            <MenuList>
                            <MenuItem><Link href="/profile/profile" as="/profile">Profile</Link></MenuItem>
                            <MenuItem><Link href="/settings" as="/setting">Settings</Link></MenuItem>
                            <MenuItem color="red" _hover={{ bg: 'red.500' }}><Link href="/">Log Out</Link></MenuItem>
                            </MenuList>
                        </Menu> */}
                    </Box>
                    {/* Critiques */}
                    <Box overflowY="scroll" h='80vh'>

                        <Box p="2"mt={5}>
                            <Flex>
                                <Image src="" w='3vh' h='3vh' mt={2} />
                                <Heading size='sm' ml={3} mt={2}>Username</Heading>
                                <Spacer />
                                <Text fontSize='sm' mt={2}>Time</Text>

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
                                        <MenuItem><EditHistory /></MenuItem>
                                    </MenuGroup>
                                    <MenuDivider />
                                    <MenuGroup>
                                        <MenuItem><ReportUser /></MenuItem>
                                    </MenuGroup>
                                    </MenuList>
                                </Menu>
                            </Flex>
                            <Box w='100%' mt={1}>
                                <Text fontSize='md'>Lorem Adipisicing ut adipisicing ea aliqua ad esse amet eiusmod aliqua. Dolore tempor velit fugiat commodo consectetur eiusmod ad. Id in laborum aliquip et adipisicing ut esse adipisicing non et. Do nisi id in nisi anim fugiat excepteur quis pariatur magna incididunt non ipsum.</Text>
                            </Box>
                            <Flex w='20vw'>
                                <Button variant='ghost'>Star 0</Button>
                                <Button variant='ghost' ml={5}>Reply</Button>
                            </Flex>

                        </Box>
                        <CritiqueReply id={post_id.post_id} />
                    </Box>
                    
                        
                    </Box>
                    
                </Box>
            </Box>

        </main>

        
        
        </>
    )
}