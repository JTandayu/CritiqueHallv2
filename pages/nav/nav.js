import Head from 'next/head'
// import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import styles from "@styles/component/Nav.module.css";
import Link from 'next/link'
import Logo from "@public/critiquehall2.png";
import { Button, ButtonGroup, IconButton, Input, Spacer, useColorMode, useColorModeValue, Img, Divider } from "@chakra-ui/react"
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { ChevronDownIcon, Search2Icon } from '@chakra-ui/icons'
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

    const { colorMode, toggleColorMode } = useColorMode()
    colorMode === 'light' ? 'dark' : 'light'

    const [darkMode ,setDarkMode] = useState('')
    const [ImgUrl, setImgUrl] = useState('dark-and-light.png')

    const changeDarkAndLightIcon = () => {
        toggleColorMode()
        if(colorMode === 'light'){
            setImgUrl('light-mode-icon.png')
        }else {
            setImgUrl('dark-mode-icon.png')
        }
    }
    
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
            
            <Flex w='10em' h='3em' ml={[32,32,16,16]} mt={5}>
                <Link href="/home" passHref>
                    <Img src='critiquehall2.png' className={styles.critique_logo} alt="Critique Hall Logo"  w="10em" h="3em" _hover={{cursor:'pointer'}}></Img>
                </Link>
            </Flex>
            <Spacer />
                <form action='/search' method='POST' onSubmit={searchItem}>
                    <Input fontFamily={'Raleway'} fontWeight={'bold'} fontStyle={'italic'} placeholder='SEARCH' display={['none','none','none','flex']} w='30vw' type='text' mt={7} mr='25vw' color='black' bg='white'  onChange={(e)=>setSearch(e.target.value)} boxShadow='md' />
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
                        color={Router.pathname === "/home" ? '#C1272D' : '#1B1464'}
                        textDecoration={Router.pathname === "/home" ? 'underline' : 'none'}
                        _hover={{cursor:'pointer', color: '#C1272D', textDecoration:'underline'}}
                        fontFamily={'Raleway'}
                        fontWeight={'bold'}
                        size='lg'
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
                        mr={2}
                        w='100%'
                        position='static'
                        color={Router.pathname === "/critique" ?  '#C1272D' : '#1B1464'} 
                        textDecoration={Router.pathname === "/critique" ? 'underline' : 'none'}
                        _hover={{cursor:'pointer', color: '#C1272D', textDecoration:'underline'}}
                        fontFamily={'Raleway'}
                        fontWeight={'bold'}
                        size='lg'
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
                        color={Router.pathname === "/feedback" ?  '#C1272D' : '#1B1464'}
                        textDecoration={Router.pathname === "/feedback" ? 'underline' : 'none'}
                        _hover={{cursor:'pointer', color: '#C1272D', textDecoration:'underline'}}
                        fontFamily={'Raleway'}
                        fontWeight={'bold'}
                        size='lg'
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
                            > <Img src='notification-alert-icon.png' alt="Notification" w="2em" h="2em" ml={-5} /></Button>
                    </PopoverTrigger>
                    <Button as='a'
                            variant='ghost'
                            aria-label='Home'
                            my={2}
                            w='100%'
                            position='static'
                            onClick={changeDarkAndLightIcon}
                            _hover={{cursor:'pointer'}}
                            _active={{bgColor: 'none'}}
                            > <Img src={ImgUrl} alt="moon" w="2em" h="2em" ml={-20} /></Button>
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
                        <Img src={profPic} w='2vw' h='2vw'></Img>
                        <Text fontFamily={'Raleway'} fontWeight={'bold'} mt={2} ml={1}>{display_name}</Text>
                        {/* <Text ml={1} mr={3}>{user_id}</Text> */}
                        <ChevronDownIcon ml={1} mt={3} />
                    </Flex>  
                    </MenuButton>
                    <MenuList>
                        <MenuItem><Link href={`/profile/${display_name}`} passHref>PROFILE</Link></MenuItem>
                        <MenuItem color="red" _hover={{ bg: 'red.500', color: 'white' }} onClick={logOut}><Link href="/" passHref>LOG OUT</Link></MenuItem>
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
            <Link href="/home" passHref>
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={5}
                        w='100%'
                        color={useColorModeValue('#1B1464')}
                        _hover={{cursor:'pointer', textDecoration:'underline'}}
                        _active={{bgColor: 'none'}}
                    >
                        <Img src='critiquehall.png' alt="Critique Hall Logo" w="100px" h="70px" mr={2} />
                    </Button>
                </Link>
                <form action='/search' method='POST' onSubmit={searchItem}>
                    <Input fontFamily={'Raleway'} fontWeight={'bold'} fontStyle={'italic'} w='50vw' type='text' mt={7} color='black' bg='white' placeholder='SEARCH' onChange={(e)=>setSearch(e.target.value)} boxShadow={'md'} />
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
                        <Link href="/profile/[id]" as={`/profile/${display_name}`} passHref>PROFILE</Link>
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
                    <Img src='power-icon-dark.png' alt="Critique Hall Message Logo" w="2em" h="2em" mr={2} />LOG OUT
                    </Button>
                </Link>
            </Flex> 
        </Flex>


    </Flex>
    </>
    )
}

