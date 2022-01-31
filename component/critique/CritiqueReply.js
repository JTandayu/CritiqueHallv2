import React from 'react'
import { useEffect, useState } from 'react'
import {Box, Flex, Heading, Image, Spacer, Text, Button} from '@chakra-ui/react'
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

const breakpoints = createBreakpoints({
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  })

const theme = extendTheme({ breakpoints })

export const CritiqueReply = ({id}) => {
    const { API_URL } = process.env
    const { API_KEY } = process.env
    const [cookie, setCookie] = useCookies('token', 'id', 'encrypted_id', 'display_name')
    const [critiqueReply, setCritiqueReply] =  useState([])
    // console.log(id)

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

    useEffect(() => {
        // const res = axios.get(`${API_URL}/api/display_all_critiques`, config)

        let formData = new FormData;
        formData.append('critique_id', id);
        formData.append('last_id', null);

        axios.post(`${API_URL}/api/display_replies`, formData, config)
        .then((response) =>{
            console.log(response.data)
            setCritiqueReply(response.data.data)
        }).catch((error) =>{
            console.log(error)
        })
    }, [])

    const giveStar = async (id) =>{
        let formData = new FormData;
        formData.append('reply_id', id);

        axios.post(`${API_URL}/api/star_reply`, formData, config)
        .then((response) =>{
            console.log(response.data)
            document.getElementById(id).innerHTML=response.data.likes;
        }).catch((error) =>{
            console.log(error.response)
        })
    }

    const loadMore = async() =>{
        let formData = new FormData;
        formData.append('post_id', id);
        formData.append('last_id', lastId);

        axios.post(`${API_URL}/api/display_replies`, formData, config)
        .then((response) =>{
            console.log(response.data)
            setCritiqueItems(response.data)
        }).catch((error) =>{
            console.log(error.response)
        })
        document.getElementById('reply').hidden=true;
    }

    return (
        <div>
            {critiqueReply ? <Button w="full" h="20px" onClick={loadMore}>Load More</Button> : null}
            {critiqueReply.map((reply)=>{
                if(reply.display_name === cookie.display_name){
                return(
            
                <Box p="2" overflow-y="auto" w={{lg: '32vw', sm: '85%'}} ml={16} mt={5}>
                            <Flex>
                                <Image src={reply.profile_photo} w='3vh' h='3vh' mt={2} />
                                <Heading size='sm' ml={3} mt={2}>{reply.display_name}</Heading>
                                <Spacer />
                                <Text fontSize='sm' mt={2}>{reply.time_ago}</Text>

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
                                        <MenuItem><EditReplyHistory id={reply.reply_id} /></MenuItem>
                                    </MenuGroup>
                                    <MenuDivider />
                                    <MenuGroup>
                                        <MenuItem><EditReply data={reply} /></MenuItem>
                                    </MenuGroup>
                                    <MenuDivider />
                                    <MenuGroup>
                                        <MenuItem><DeleteReply id={reply.reply_id} /></MenuItem>
                                    </MenuGroup>
                                    </MenuList>
                                </Menu>
                            </Flex>
                            <Box w='100%' mt={1}>
                                <Text fontSize='md'>{reply.body}</Text>
                            </Box>
                            <Flex w='20vw'>
                                <Button variant='ghost' id={reply.reply_id} onClick={()=>giveStar(reply.reply_id)}>Star {reply.stars}</Button>
                                {/* <Button variant='ghost' ml={5}>Reply</Button> */}
                        </Flex>

                </Box>
                )
            }
            return(
            
                <Box p="2" overflow-y="auto" w={{lg: '32vw', sm: '85%'}} ml={16} mt={5}>
                            <Flex>
                                <Image src={reply.profile_photo} w='3vh' h='3vh' mt={2} />
                                <Heading size='sm' ml={3} mt={2}>{reply.display_name}</Heading>
                                <Spacer />
                                <Text fontSize='sm' mt={2}>{reply.time_ago}</Text>

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
                                        <MenuItem><EditReplyHistory id={reply.reply_id} /></MenuItem>
                                    </MenuGroup>
                                    <MenuDivider />
                                    <MenuGroup>
                                        <MenuItem><ReportUser /></MenuItem>
                                    </MenuGroup>
                                    </MenuList>
                                </Menu>
                            </Flex>
                            <Box w='100%' mt={1}>
                                <Text fontSize='md'>{reply.body}</Text>
                            </Box>
                            <Flex w='20vw'>
                                <Button variant='ghost' id={reply.reply_id} onClick={()=>giveStar(reply.reply_id)}>Star {reply.stars}</Button>
                                {/* <Button variant='ghost' ml={5}>Reply</Button> */}
                        </Flex>

                </Box>
            )
            })}
        </div>
    )
}
