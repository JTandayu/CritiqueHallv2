import Head from 'next/head'
// import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import styles from "@styles/component/Nav.module.css";
import Link from 'next/link'
// import Logo from "@public/critiquehall2.png";
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
import { useToast } from '@chakra-ui/react';
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
    const [ImgUrl, setImgUrl] = useState('/dark-and-light.png')
    const router = useRouter();

    const changeDarkAndLightIcon = () => {
        toggleColorMode()
        if(colorMode === 'light'){
            setImgUrl('/light-mode-icon.png')
        }else {
            setImgUrl('/dark-mode-icon.png')
        }
    }

    // const [isOpen, setIsOpen] = useState(false)
    // const open = () => setIsOpen(!isOpen)
    // const close = () => setIsOpen(false)

    
    const [display, changeDisplay] = useState('none')
    const [cookies, removeCookie] = useCookies(['token', 'display_name'])
    const [search, setSearch] = useState('')
    const [profPic, setProfilePic] = useState('')

    const [notif, setNotif] = useState([])


    const user_id = cookies.id;
    const display_name =  cookies.display_name
    const Router = useRouter()
    
    const toast = useToast()
    const toastIdRef = React.useRef()


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
            if(error.response.data.error ==  'Token Expired'){
                Router.replace('/login')
                return;
            }
            if(error.response.data.error ==  'Unauthorized'){
                Router.replace('/login')
                return;
            }
        });

        axios.get(`${API_URL}/api/get_notifs`, config)
            .then(response => {
                console.log(response.data);      
                setNotif(response.data.status)
            })
            .catch(error => {
                console.log(error.response.data.error);
            });

        const getNotif = setInterval(()=>{
            axios.get(`${API_URL}/api/get_notifs`, config)
            .then(response => {
                console.log(response.data);      
                setNotif(response.data.status)
            })
            .catch(error => {
                console.log(error.response.data.error);
            });
        }, 15000)

        
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
        let formData = new FormData;


        axios.post(`${API_URL}/api/logout`, formData, config)
        .then((response)=>{
            console.log(response)
            toastIdRef.current = toast({ title: 'Logout Successful!', status: 'success', duration: 3000, isClosable: false })
        })
        .then(()=>{
            removeCookie('token');
            removeCookie('id');
            removeCookie('encrypted_id');
            removeCookie('profile_pic');
            removeCookie('display_name');
            router.push('/login')
        }).catch((error)=>console.log(error.response))


        // toastIdRef.current = toast({ title: 'Logout Successful!', status: 'success', duration: 3000, isClosable: false })
        
        // removeCookie('token');
        // removeCookie('id');
        // removeCookie('encrypted_id');
        // removeCookie('profile_pic');
        // removeCookie('display_name');
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
                <Img className={styles.critique_logo} src={useColorModeValue('/critiquehall2.png', '/critiquehall2-dark.png')} alt="Critique Hall Logo" w="10em" h="3em" _hover={{cursor:'pointer'}}></Img>
                </Link>
            </Flex>
            <Spacer />
                <form action='/search' method='POST' onSubmit={searchItem}>
                    <Input fontFamily={'Raleway'} fontWeight={'bold'} fontStyle={'italic'} placeholder='SEARCH' display={['none','none','none','flex']} w='30vw' type='text' mt={7} mr='25vw' onChange={(e)=>setSearch(e.target.value)} boxShadow='md' />
                </form>
            <Spacer />
        <Flex
            pos='fixed'
            top='1rem'
            right='3rem'
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
                        color={Router.pathname === "/home" ? useColorModeValue('#C1272D', '#FF5C61') : useColorModeValue('#1B1464', '#B2A3FF')}
                        textDecoration={Router.pathname === "/home" ? 'underline' : 'none'}
                        _hover={{cursor:'pointer', textDecoration:'underline', color: useColorModeValue('#C1272D', '#FF5C61')}}
                        fontFamily={'Raleway'}
                        fontWeight={'bold'}
                        size='lg'
                    >
                        Home
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
                        color={Router.pathname === "/critique" ?  useColorModeValue('#C1272D', '#FF5C61') : useColorModeValue('#1B1464', '#B2A3FF')} 
                        textDecoration={Router.pathname === "/critique" ? 'underline' : 'none'}
                        _hover={{cursor:'pointer', textDecoration:'underline', color: useColorModeValue('#C1272D', '#FF5C61')}}
                        fontFamily={'Raleway'}
                        fontWeight={'bold'}
                        size='lg'
                    >
                        Critique
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
                        color={Router.pathname === "/feedback" ?  useColorModeValue('#C1272D', '#FF5C61') : useColorModeValue('#1B1464', '#B2A3FF')}
                        textDecoration={Router.pathname === "/feedback" ? 'underline' : 'none'}
                        _hover={{cursor:'pointer', textDecoration:'underline', color: useColorModeValue('#C1272D', '#FF5C61')}}
                        fontFamily={'Raleway'}
                        fontWeight={'bold'}
                        size='lg'
                    >
                        Feedback
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
                        ><Img src={useColorModeValue('/notification-alert-icon.png', '/notification-alert-icon-dark.png')} alt="Notification" w="2em" h="2em" ml={-5} /></Button>
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
                    <PopoverContent w="400px">
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader fontFamily={'Raleway'}>NOTIFICATIONS</PopoverHeader>
                        <PopoverBody fontFamily={'Raleway'}>
                            {notif.map((notification, i) =>
                            <Box key={i} display='flex'>
                                {notification.profile_photo ? <Img src={notification.profile_photo} mr={3} w="25px" h="25px" alt="Notification Image" /> : null}
                                <Text mr={3} fontFamily={'Raleway'}>{notification.display_name}</Text>
                                <Text mr={2} fontFamily={'Raleway'}>{notification.action}</Text>
                                <Text w="full" fontFamily={'Raleway'}>{notification.title}</Text>
                            <Divider />
                            </Box>
                            )}
                        </PopoverBody>
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
                        <MenuItem fontFamily={'Raleway'} fontWeight={'bold'}><Link href={`/profile/${display_name}`} passHref>PROFILE</Link></MenuItem>
                        <MenuItem fontFamily={'Raleway'} fontWeight={'bold'} color="red" _hover={{ bg: 'red.500', color: 'white' }} onClick={logOut}>LOG OUT</MenuItem>
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
                        <Img src={useColorModeValue('/critiquehall.png', '/critiquehall-dark.png')} alt="Critique Hall Logo" w="100px" h="70px" mr={2} />
                    </Button>
                </Link>
                <form action='/search' method='POST' onSubmit={searchItem}>
                    <Input fontFamily={'Raleway'} fontWeight={'bold'} fontStyle={'italic'} w='50vw' type='text' mt={7} placeholder='SEARCH' onChange={(e)=>setSearch(e.target.value)} boxShadow={'md'} />
                </form>
                <Link href="/home" passHref>
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={5}
                        w='100%'
                        color={Router.pathname === "/home" ? useColorModeValue('#C1272D', '#FF5C61') : useColorModeValue('#1B1464', '#B2A3FF')}
                        textDecoration={Router.pathname === "/home" ? 'underline' : 'none'}
                        _hover={{cursor:'pointer', textDecoration:'underline', color: useColorModeValue('#C1272D', '#FF5C61')}}
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
                        color={Router.pathname === "/critique" ? useColorModeValue('#C1272D', '#FF5C61') : useColorModeValue('#1B1464', '#B2A3FF')}
                        textDecoration={Router.pathname === "/critique" ? 'underline' : 'none'}
                        _hover={{cursor:'pointer', textDecoration:'underline', color: useColorModeValue('#C1272D', '#FF5C61')}}
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
                        color={Router.pathname === "/feedback" ? useColorModeValue('#C1272D', '#FF5C61') : useColorModeValue('#1B1464', '#B2A3FF')}
                        textDecoration={Router.pathname === "/feedback" ? 'underline' : 'none'}
                        _hover={{cursor:'pointer', textDecoration:'underline', color: useColorModeValue('#C1272D', '#FF5C61')}}
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
                        color={Router.pathname === "/profile" ? useColorModeValue('#C1272D', '#FF5C61') : useColorModeValue('#1B1464', '#B2A3FF')}
                        textDecoration={Router.pathname === "/profile" ? 'underline' : 'none'}
                        _hover={{cursor:'pointer', textDecoration:'underline', color: useColorModeValue('#C1272D', '#FF5C61')}}
                    >
                        <Link href={`/profile/${display_name}`} passHref>PROFILE</Link>
                    </Button>
                </Link>
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
                    <Img src={useColorModeValue('/power-icon-dark.png', '/power-icon.png')} alt="Critique Hall Message Logo" w="2em" h="2em" mr={2} />LOG OUT
                    </Button>
            </Flex> 
        </Flex>


    </Flex>
    </>
    )
}

