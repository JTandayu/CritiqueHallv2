import React from 'react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {Box, Flex, Heading, Image, Spacer, Text, Button, useColorModeValue } from '@chakra-ui/react'
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
import EditHistory from '@component/edit-history';
import ReportUser from '@component/report-user'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { extendTheme } from '@chakra-ui/react'
import EditReply from './options/edit-reply'
import DeleteReply from './options/delete-reply'
import EditReplyHistory from './options/edit-reply-history'
import { useRouter } from 'next/router'
import { useToast } from "@chakra-ui/react";
import { getCookie } from 'cookies-next'
import ReportReply from '@component/report-reply'

const breakpoints = createBreakpoints({
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  })

const theme = extendTheme({ breakpoints })

export const CritiqueReply = ({id, post_id, newReply}) => {
    const { API_URL } = process.env
    const { API_KEY } = process.env
    // const [cookie] = useCookies()

    const token = getCookie('token')
    const user_id = getCookie('encrypted_id')
    const display_name = getCookie('display_name')


    const [critiqueReply, setCritiqueReply] =  useState([])
    const router = useRouter()
    const toast = useToast()
    const toastIdRef = React.useRef()
    // console.log(post_id)

    const changeIcon = useColorModeValue('/stars-clicked.png', '/stars-clicked-dark.png')
    const changeBadgeIcon = useColorModeValue('/badge-icon.png', '/badge-icon-dark.png')

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
        // const res = axios.get(`${API_URL}/api/display_all_critiques`, config)

        let formData = new FormData;
        formData.append('critique_id', id);

        axios.post(`${API_URL}/api/display_replies`, formData, config)
        .then((response) =>{
            console.log(response.data)
            setCritiqueReply(response.data.data)

        }).catch((error) =>{
            console.log(error)
        })

    }, [newReply, id])

    const giveStar = (reply_id, e) =>{
        e.preventDefault()
        let formData = new FormData;
        formData.append('reply_id', reply_id);
        formData.append('post_id', post_id)

        axios.post(`${API_URL}/api/star_reply`, formData, config)
        .then((response) =>{
            // console.log(response.data)
            document.getElementById(`starreply${reply_id}`).innerHTML=response.data.stars;
        }).catch((error) =>{
            console.log(error)
            if(error.response.data.status === "Account Muted"){
                toastIdRef.current = toast({ position: 'top', title: 'Account muted!', status: 'error', duration: 3000, isClosable: true })
            }
        })
    }

    const loadMore = async() =>{
        let formData = new FormData;
        formData.append('last_id', lastId);
        formData.append('critique_id', id)

        axios.post(`${API_URL}/api/display_replies`, formData, config)
        .then((response) =>{
            // console.log(response.data)

            response.data.data.map((item)=>{
                setCritiqueReply((prevState) => [...prevState, item])
            })

            for(let i = 0; i < response.data.data.length; i++){
                if(i == response.data.data.length - 1){
                    setLastID(response.data.data[i].reply_id)
                }
            }

        }).catch((error) =>{
            console.log(error)
        })
    }

    return (
        <div>
            {/* {critiqueReply ? <Button w="full" h="20px" onClick={loadMore} id='loadMore'>Load More</Button> : null} */}
            {critiqueReply.map((reply, i)=>{
                if(reply.display_name === display_name){
                return(
            
                <Box p="2" overflow-y="auto" w={{lg: '32vw', sm: '85%'}} ml={{lg: 16, base: 5}} mt={5} key={i}>
                            <Flex>
                                <Image src={reply.profile_photo} w='3vh' h='3vh' mt={2} />
                                <Link href={`/profile/${reply.display_name}`} passHref>
                                    <Heading fontFamily={'Raleway'} size='md' ml={3} mt={2} _hover={{cursor: 'pointer'}}>{reply.display_name}</Heading>
                                </Link>
                                {Number(reply.reputation_points) >= 10 ? <Image src={changeBadgeIcon} alt="Badge" w="25px" h="25px" ml={3} mt={2} /> : null}
                                {reply.starred_by_author == '1' ? <><Image src={reply.author_photo} alt="Reputation Stars"  w="20px" h="20px" ml={3} mt={2} rounded="full"/><Image src='/reputation-stars.png' alt="Reputation Stars"  w="15px" h="15px" mt={4} ml={-2} /></> : null}
                                <Spacer />
                                <Text fontFamily={'Raleway'} color="gray.400" fontSize='sm' mt={2} isTruncated>{reply.time_ago}</Text>

                                <Menu>
                                    <MenuButton
                                    px={4}
                                    py={2}
                                    transition='all 0.2s'
                                    >
                                    <ChevronDownIcon />
                                    </MenuButton>
                                    <MenuList p={3}>
                                    {reply.is_edited == 1 ?  
                                    <MenuGroup>
                                        <MenuItem fontFamily={'Raleway'}><EditReplyHistory id={reply.reply_id} /></MenuItem>
                                    </MenuGroup> : null}
                                    <MenuDivider />
                                    <MenuGroup>
                                        <MenuItem fontFamily={'Raleway'}><EditReply data={reply} /></MenuItem>
                                    </MenuGroup>
                                    <MenuDivider />
                                    <MenuGroup>
                                        <MenuItem fontFamily={'Raleway'}><DeleteReply id={reply.reply_id} /></MenuItem>
                                    </MenuGroup>
                                    </MenuList>
                                </Menu>
                            </Flex>
                            <Box w='100%' mt={1}>
                                <Text fontFamily={'Raleway'} fontSize='sm' textAlign={'justify'}>{reply.body}</Text>
                            </Box>
                            <Flex w='20vw'>
                                <Button fontFamily={'Raleway'} variant='ghost' onClick={(e)=>giveStar(reply.reply_id, e)}><Image src={changeIcon} alt="Stars" w="25px" h="25px" ml={2} mr={2}/> <Text id={`starreply${reply.reply_id}`}>{reply.stars}</Text></Button>
                                {reply.is_edited == 1 ? <Text fontFamily={'Raleway'} color="gray.400" mt={3} fontSize="sm">(Edited)</Text> : null}
                        </Flex>

                </Box>
                )
            }
            return(
            
                <Box p="2" overflow-y="auto" w={{lg: '32vw', sm: '85%'}} ml={{lg: 16, base: 5}} mt={5} key={i}>
                            <Flex>
                                <Image src={reply.profile_photo} w='3vh' h='3vh' mt={2} />
                                <Link href={`/profile/${reply.display_name}`} passHref>
                                    <Heading fontFamily={'Raleway'} size='md' ml={3} mt={2} _hover={{cursor: 'pointer'}}>{reply.display_name}</Heading>
                                </Link>
                                {Number(reply.reputation_points) >= 10 ? <Image src={changeBadgeIcon} alt="Badge" w="25px" h="25px" ml={3} mt={2} /> : null}
                                {reply.starred_by_author == '1' ? <><Image src={reply.author_photo} alt="Reputation Stars"  w="20px" h="20px" ml={3} mt={2} rounded="full"/><Image src='/reputation-stars.png' alt="Reputation Stars"  w="15px" h="15px" mt={4} ml={-2} /></> : null}
                                <Spacer />
                                <Text fontFamily={'Raleway'} color="gray.400" fontSize='sm' mt={2} isTruncated>{reply.time_ago}</Text>
                                  
                                <Menu>
                                    <MenuButton
                                    px={4}
                                    py={2}
                                    transition='all 0.2s'
                                    >
                                    <ChevronDownIcon />
                                    </MenuButton>
                                    <MenuList p={3}>
                                    {reply.is_edited == 1 ?
                                    <MenuGroup>
                                        <MenuItem fontFamily={'Raleway'}><EditReplyHistory id={reply.reply_id} /></MenuItem>
                                    </MenuGroup>: null}
                                    <MenuDivider />
                                    <MenuGroup>
                                        <MenuItem fontFamily={'Raleway'}><ReportReply id={reply.reply_id} /></MenuItem>
                                    </MenuGroup>
                                    </MenuList>
                                </Menu>
                            </Flex>
                            <Box w='100%' mt={1}>
                                <Text fontSize='sm' fontFamily={'Raleway'}  textAlign={'justify'}>{reply.body}</Text>
                            </Box>
                            <Flex w='20vw'>
                                <Button fontFamily={'Raleway'} variant='ghost' onClick={(e)=>giveStar(reply.reply_id, e)}><Image src={changeIcon} alt="Stars" w="25px" h="25px" ml={2} mr={2}/> <Text id={`starreply${reply.reply_id}`}>{reply.stars}</Text></Button>
                                {reply.is_edited == 1 ? <Text fontFamily={'Raleway'} color="gray.400" mt={3} fontSize="sm">(Edited)</Text> : null}
                        </Flex>

                </Box>
            )
            })}
        </div>
    )
}
