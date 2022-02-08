import Head from 'next/head'
// import Image from 'next/image'
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
import {cookie} from 'cookie'

const MotionButton = motion(Button)

const breakpoints = createBreakpoints({
    sm: '40em',
    md: '52em',
    lg: '64em',
    xl: '80em',
})

// export async function getServerSideProps(context){
//     const cookies = context.req.cookies;
//     const { API_URL } = process.env
//     const { API_KEY } = process.env

//     // console.log(cookies)
//     var profile_pic = '';

//     const res = await fetch(`${API_URL}/api/display_profile/${cookies.display_name}`, {
//             method: 'GET',
//             headers: {
//                 'content-type': 'multipart/form-data',
//                 'X-API-KEY': `${API_KEY}`,
//                 'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
//                 'Accept': 'application/json',
//                 'Token': cookies.token,
//                 'User-Id': cookies.encrypted_id
//             },
//         })
//     const data = await res.json();
//     console.log(data)


//     return{
//         props:{
//             profile_pic,
//             data
//         }
//     }
// }


export default function Nav(data, profile_pic){
    const { API_URL } = process.env
    const { API_KEY } = process.env

    const changeColor = useColorModeValue('#C1272D', '#FF5C61')
    const changeColor2 = useColorModeValue('#1B1464', '#B2A3FF')

    const { colorMode, toggleColorMode } = useColorMode()
    colorMode === 'light' ? 'dark' : 'light'

    const [darkMode ,setDarkMode] = useState('')
    const [ImgUrl, setImgUrl] = useState('/dark-mode-icon.png')
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
    const [firstId, setFirstId] = useState('')


    const user_id = cookies.id;
    const display_name =  cookies.display_name
    const Router = useRouter()
    
    const toast = useToast()
    const toastIdRef = React.useRef()


    useEffect(() => {
        const { API_URL } = process.env
        const { API_KEY } = process.env 
        
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

        if (cookies.token === 'undefined' || cookies.encrypted_id === 'undefined'){
            Router.replace('/login')
            return null;
        }
        
        axios.get(`${API_URL}/api/display_profile/${cookies.display_name}`, config)
        .then(response => {
            // console.log(response.data);      
            setProfilePic(response.data.data.user.profile_photo)
        })
        .catch(error => {
            // console.log(error.response.data.error);
            if(error.response.data.error ==  'User does not exist'){
                Router.replace('/login')
                return null;
            }
            if(error.response.data.error ==  'Token Expired'){
                Router.replace('/login')
                return null;
            }
            if(error.response.data.error ==  'Unauthorized'){
                Router.replace('/login')
                return null;
            }
        });

        axios.get(`${API_URL}/api/get_notifs`, config)
            .then(response => {
                // console.log(response.data);      
                setNotif(response.data.status)
                setFirstId(response.data.status[0].notifs_id)
            })
            .catch(error => {
                // console.log(error.response.data.error);
            });

        const getNotif = setInterval(()=>{
            axios.get(`${API_URL}/api/get_notifs`, config)
            .then(response => {
                // console.log(response.data);      
                setNotif(response.data.status)
                setFirstId(response.data.status[0].notifs_id)
            })
            .catch(error => {
                // console.log(error.response.data.error);
            });
        }, 15000)

        
    }, [])

    //Search Function
    const searchItem = async()=>{
        localStorage.setItem("search-item", search);
        router.push('/search')
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
                'Token': cookies.token,
                'User-Id': cookies.encrypted_id
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

    const readNotif = () =>{
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

        let formData = new FormData;
        formData.append('first_id', firstId)

        axios.get(`${API_URL}/api/read_notifs/${firstId}`, config)
            .then(response => {
                console.log(response.data);      
            })
            .catch(error => {
                console.log(error.response);
        });
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
            <Flex
            pos='fixed'
            top='1rem'
            left='15rem'
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
                        color={Router.pathname === "/home" ? changeColor : changeColor2}
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
                        color={Router.pathname === "/critique" ?  changeColor : changeColor2} 
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
                        color={Router.pathname === "/feedback" ?  changeColor : changeColor2}
                        textDecoration={Router.pathname === "/feedback" ? 'underline' : 'none'}
                        _hover={{cursor:'pointer', textDecoration:'underline', color: useColorModeValue('#C1272D', '#FF5C61')}}
                        fontFamily={'Raleway'}
                        fontWeight={'bold'}
                        size='lg'
                    >
                        Feedback
                    </Button>
                </Link>
                </Flex>
            </Flex>
            <Spacer />
                <form action='/search' method='POST' onSubmit={searchItem}>
                    <Input fontFamily={'Raleway'} fontWeight={'light'} placeholder='Looking for something?' display={['none','none','none','flex']} w='30vw' type='text' mt={7} mr='25vw' onChange={(e)=>setSearch(e.target.value)} borderColor={useColorModeValue('black', 'white')} />
                </form>
            <Spacer />
        <Flex
            pos='fixed'
            top='1rem'
            right='3rem'
            align='center'
            w="15em"
        >
            <Flex display={['none','none','flex','flex']} w="full">
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
                            onClick={readNotif}
                        ><Img src={useColorModeValue('/notification-alert-icon.png', '/notification-alert-icon-dark.png')} alt="Notification" w="2em" h="2em" ml={-5} /></Button>
                    </PopoverTrigger>
                    <Button as='a'
                            variant='ghost'
                            aria-label='Home'
                            my={2}
                            w='100%'
                            position='static'
                            _hover={{cursor:'pointer'}}
                            _active={{bgColor: 'none'}}
                            onClick={changeDarkAndLightIcon}
                            > <Img src={ImgUrl} alt="moon" w="2em" h="2em" ml={-20} /></Button>
                    <PopoverContent w="400px">
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader fontFamily={'Raleway'}>Notifications</PopoverHeader>
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
                        {/* <Text fontFamily={'Raleway'} fontWeight={'bold'} mt={2} ml={1}>{display_name}</Text> */}
                        {/* <Text ml={1} mr={3}>{user_id}</Text> */}
                        <ChevronDownIcon ml={1} mt={3} />
                    </Flex>  
                    </MenuButton>
                    <MenuList>
                        <MenuItem fontFamily={'Raleway'} fontWeight={'bold'}><Link href={`/profile/${display_name}`} passHref>Profile</Link></MenuItem>
                        <MenuItem fontFamily={'Raleway'} fontWeight={'bold'} color="red" _hover={{ bg: 'red.500', color: 'white' }} onClick={logOut}>Logout</MenuItem>
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
        display={{sm: display, lg: 'none'}}
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
                    <Input fontFamily={'Raleway'} fontWeight={'light'} w='50vw' type='text' mt={7} placeholder='Looking for something?' onChange={(e)=>setSearch(e.target.value)} boxShadow={'md'} />
                </form>
                <Link href="/home" passHref>
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={5}
                        w='100%'
                        color={Router.pathname === "/home" ? changeColor : changeColor2}
                        textDecoration={Router.pathname === "/home" ? 'underline' : 'none'}
                        _hover={{cursor:'pointer', textDecoration:'underline', color: useColorModeValue('#C1272D', '#FF5C61')}}
                    >
                        Home
                    </Button>
                </Link>
                <Link href="/critique" as='/critique' passHref>
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={5}
                        w='100%'
                        color={Router.pathname === "/critique" ? changeColor : changeColor2}
                        textDecoration={Router.pathname === "/critique" ? 'underline' : 'none'}
                        _hover={{cursor:'pointer', textDecoration:'underline', color: useColorModeValue('#C1272D', '#FF5C61')}}
                    >
                        Critique
                    </Button>
                </Link>
                <Link href="/feedback" passHref>
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={5}
                        w='100%'
                        color={Router.pathname === "/feedback" ? changeColor : changeColor2}
                        textDecoration={Router.pathname === "/feedback" ? 'underline' : 'none'}
                        _hover={{cursor:'pointer', textDecoration:'underline', color: useColorModeValue('#C1272D', '#FF5C61')}}
                    >
                        Feedback
                    </Button>
                </Link>
                <Link href="/profile/[id]" as={`/profile/${user_id}`} passHref>
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={5}
                        w='100%'
                        color={Router.pathname === "/profile" ? changeColor: changeColor2}
                        textDecoration={Router.pathname === "/profile" ? 'underline' : 'none'}
                        _hover={{cursor:'pointer', textDecoration:'underline', color: useColorModeValue('#C1272D', '#FF5C61')}}
                    >
                        <Link href={`/profile/${display_name}`} passHref>Profile</Link>
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
                    <Img src={useColorModeValue('/power-icon-dark.png', '/power-icon.png')} alt="Critique Hall Message Logo" w="2em" h="2em" mr={2} />Logout
                    </Button>
            </Flex> 
        </Flex>


    </Flex>
    </>
    )
}

