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
        axios.get(`${API_URL}/api/display_replies`, config)
        .then((response) =>{
            console.log(response.data)
            setCritiqueReply(response.data)
        }).catch((error) =>{
            console.log(error.response)
        })
    }, [])

    const giveStar = async() =>{
        axios.post(`${API_URL}/api/star_reply`, config)
        .then((response) =>{
            console.log(response.data)
        }).catch((error) =>{
            console.log(error.response)
        })
    }

    return (
        <div>
            {critiqueReply.map((reply)=>(
                <Box p="2" overflow-y="auto" w={{lg: '32vw', sm: '85%'}} ml={16} mt={5}>
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
                                <Button variant='ghost' onClick={giveStar}>Star 0</Button>
                                {/* <Button variant='ghost' ml={5}>Reply</Button> */}
                        </Flex>

                </Box>
            ))
            }
        </div>
    )
}
