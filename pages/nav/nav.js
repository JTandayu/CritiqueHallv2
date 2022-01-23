import Head from 'next/head'
import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import styles from "@styles/component/Nav.module.css";
import Link from 'next/link'
import Logo from "@public/critiquehall2.png";
import { Button, ButtonGroup, IconButton, Input, Spacer, useColorModeValue, Img, Divider } from "@chakra-ui/react"
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { ChevronDownIcon } from '@chakra-ui/icons'
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
import { Box } from '@chakra-ui/react'
import { Switch } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import {Flex, Text} from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import React from 'react';
import Login from '../login'
import { useCookies } from 'react-cookie';
import axios from 'axios'
import { useRouter } from 'next/router';
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

const MotionButton = motion(Button)

const breakpoints = createBreakpoints({
    sm: '40em',
    md: '52em',
    lg: '64em',
    xl: '80em',
})



export default function Nav({id}){
    const { API_URL } = process.env
    const { API_KEY } = process.env
    
    const [display, changeDisplay] = useState('none')
    const [cookies, removeCookie] = useCookies(['token', 'display_name'])
    const [search, setSearch] = useState('')
    const [profPic, setProfilePic] = useState('')

    const [notif, setNotif] = useState([])


    const user_id = cookies.id;
    const display_name =  cookies.display_name
    const Router = useRouter()  


    useEffect(() => {
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


        axios.get(`${API_URL}/api/display_profile/${cookies.display_name}`, config)
        .then(response => {
            // console.log(response.data);      
            setProfilePic(response.data.data.user.profile_photo)
        })
        .catch(error => {
            console.log(error.response.data.error);
            if(error.response.data.error ==  'User does not exist'){
                Router.replace('/login')
                return;
            }
        });

        axios.get(`${API_URL}/api/get_notifs`, config)
        .then(response => {
            // console.log(response.data.Notifs);      
            setNotif(response.data.Notifs)
        })
        .catch(error => {
            console.log(error.response.data.error);
            if(error.response.data.error ==  'User does not exist'){
                Router.replace('/login')
                return;
            }
        });
    }, [])

    //Search Function
    const searchItem = async()=>{

        const config = {
            headers: { 
            'content-type': 'multipart/form-data',
            'X-API-KEY': `${API_KEY}`,
            'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
            // 'Accept-Encoding': 'gzip, deflate, br',
            'Accept': 'application/json',
            }
        }

        window.location = '/search'
        localStorage.setItem("search-item", search);

        // axios.get('get')

    }

    //Log-out function
    const logOut = async ()=>{
        removeCookie('token');
        removeCookie('id');
        removeCookie('encrypted_id');
        removeCookie('profile_pic');
        removeCookie('display_name');
    }

    return(
    <>
    <Flex boxShadow='md' w='100%' h='100px' bg={useColorModeValue('white', '#212121')} pos='fixed' zIndex={100}> 
        <IconButton
                aria-label='Open Menu'
                size='lg'
                my='auto'
                mr={2}
                icon={<HamburgerIcon />}
                display={['flex','flex','none','none']}
                left='1rem'
                onClick={() => changeDisplay('flex')}
            />
            
            <Flex w='8em' h='5em' ml={[32,32,16,16]} mt={1}>
                <Link href="/home" passHref>
                    <Image src={Logo} alt="Critique Hall Logo"  w="5em" h="3em" _hover={{cursor:'pointer'}}></Image>
                </Link>
            </Flex>
            <Spacer />
                <form action='/search' method='POST' onSubmit={searchItem}>
                    <Input placeholder='SEARCH...' display={['none','none','none','flex']} w='30vw' type='text' mt={7} mr='10vw' color='black' bg='white' borderColor='gray.400' onChange={(e)=>setSearch(e.target.value)} boxShadow='lg' />
                </form>
            <Spacer />
        <Flex
            pos='fixed'
            top='1rem'
            right='1rem'
            align='center'
        >

            <Flex display={['none','none','flex','flex']}>
                <Link href="/home" passHref>
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={2}
                        w='100%'
                        position='static'
                        color={useColorModeValue('#1B1464')}
                        _hover={{cursor:'pointer', color: '#C1272D', textDecoration:'underline'}}
                        _active={{bgColor: 'none', color: '#C1272D', textDecoration:'underline'}}
                    >
                        HOME
                    </Button>
                </Link>
                <Link href="/critique" as='/critique' passHref>
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={2}
                        w='100%'
                        position='static'
                        color={useColorModeValue('#1B1464')}
                        _hover={{cursor:'pointer', color: '#C1272D', textDecoration:'underline'}}
                        _active={{bgColor: 'none', color: '#C1272D', textDecoration:'underline'}}
                    >
                        CRITIQUE
                    </Button>
                </Link>
                <Link href="/feedback" passHref>
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={2}
                        w='100%'
                        position='static'
                        color={useColorModeValue('#1B1464')}
                        _hover={{cursor:'pointer', color: '#C1272D', textDecoration:'underline'}}
                        _active={{bgColor: 'none', color: '#C1272D',  textDecoration:'underline'}}
                    >
                        FEEDBACK
                    </Button>
                </Link>
                <Popover>
                    <PopoverTrigger>
                        <Button as='a'
                            variant='ghost'
                            aria-label='Home'
                            my={2}
                            w='100%'
                            position='static'
                            color={useColorModeValue('#1B1464')}
                            _hover={{cursor:'pointer', textDecoration:'underline'}}
                        _active={{bgColor: 'none', textDecoration:'underline'}}
                            >Notification</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Notification</PopoverHeader>
                        <PopoverBody>{notif.map((notification, i) =>
                            <Box key={i}>
                            <Text p={2}>{notification.action}</Text>
                            <Divider />
                            </Box>
                        )}</PopoverBody>
                    </PopoverContent>
                </Popover>
                <Menu>
                    <MenuButton
                        px={7}
                        py={2}
                        transition='all 0.2s'
                        display='flex'
                        w='100%'
                    > 
                    <Flex>
                        {/* <Image src=""></Image> */}
                        {/* <Img src='https://www.clipartmax.com/png/middle/119-1198197_anonymous-person-svg-png-icon-free-download-anonymous-icon-png.png' w='2vw' h='2vw'></Img> */}
                        <Img src={profPic} w='2vw' h='2vw' rounded='full'></Img>
                        <Text mt={2} ml={1}>{display_name}</Text>
                        {/* <Text ml={1} mr={3}>{user_id}</Text> */}
                        <ChevronDownIcon ml={1} mt={3} />
                    </Flex>  
                    </MenuButton>
                    <MenuList>
                        <MenuItem><Link href="/profile/[id]" as={`/profile/${display_name}`} passHref>Profile</Link></MenuItem>
                        <MenuItem color="red" _hover={{ bg: 'red.500', color: 'white' }} onClick={logOut}><Link href="/" passHref>Log Out</Link></MenuItem>
                    </MenuList>
                </Menu>

            </Flex>

            
        </Flex>

        
        <Flex
        w='60vw'
        bg={useColorModeValue('white', '#212121')}
        zIndex={20}
        h='100vh'
        pos='fixed'
        top='0'
        left='0'
        overflowY='auto'
        flexDir='column'
        display={display}
        boxShadow='lg'
        >
            <Flex justify='flex-start'>
                <IconButton
                mt={5}
                ml={4}
                aria-label='Close Menu'
                size='lg'
                icon={
                    <HamburgerIcon />
                }
                onClick={() => changeDisplay('none')}
                />

            </Flex>
        <Flex flexDir='column' align='center'>
                <form action='/search' method='POST' onSubmit={searchItem}>
                    <Input w='50vw' type='text' mt={7} color='black' bg='white' placeholder='Search' borderColor='gray.400' onChange={(e)=>setSearch(e.target.value)} />
                </form>
                <Link href="/home" passHref>
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={5}
                        w='100%'
                        color={useColorModeValue('#1B1464')}
                        _hover={{cursor:'pointer', color: '#C1272D', textDecoration:'underline'}}
                        _active={{bgColor: 'none', color: '#C1272D', textDecoration:'underline'}}
                    >
                        HOME
                    </Button>
                </Link>
                <Link href="/critique" as='/critique' passHref>
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={5}
                        w='100%'
                        color={useColorModeValue('#1B1464')}
                        _hover={{cursor:'pointer', color: '#C1272D', textDecoration:'underline'}}
                        _active={{bgColor: 'none', color: '#C1272D',  textDecoration:'underline'}}
                    >
                        CRITIQUE
                    </Button>
                </Link>
                <Link href="/feedback" passHref>
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={5}
                        w='100%'
                        color={useColorModeValue('#1B1464')}
                        _hover={{cursor:'pointer', color: '#C1272D', textDecoration:'underline'}}
                        _active={{bgColor: 'none', color: '#C1272D',  textDecoration:'underline'}}
                    >
                        FEEDBACK
                    </Button>
                </Link>
                <Link href="/profile/[id]" as={`/profile/${user_id}`} passHref>
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={5}
                        w='100%'
                        color={useColorModeValue('#1B1464')}
                        _hover={{cursor:'pointer', color: '#C1272D', textDecoration:'underline'}}
                        _active={{bgColor: 'none', color: '#C1272D',  textDecoration:'underline'}}
                    >
                        Profile
                    </Button>
                </Link>
                <Link href="/" passHref>
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={5}
                        w='100%'
                        _hover={{
                            bg: 'red',
                            color: 'white'
                        }}
                        rounded='none'
                        onClick={logOut}
                    >
                        Logout
                    </Button>
                </Link>
            </Flex> 
        </Flex>


    </Flex>
    </>
    )
}

