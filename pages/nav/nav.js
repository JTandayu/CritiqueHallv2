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
import { Box, Center } from '@chakra-ui/react'
import { Switch } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import {Flex, Text} from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import React from 'react';
import { useToast } from '@chakra-ui/react';
import Login from '../index.js'
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
// import {cookie} from 'cookie'
import { getCookie, getCookies, removeCookies } from 'cookies-next'

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
    const token = getCookie('token');
    const user_id = getCookie('encrypted_id')
    const display_name = getCookie('display_name')
    const cookie = getCookies()
    // console.log(cookie.hasOwnProperty('token'))

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
    // const [cookies, removeCookie] = useCookies(['token', 'display_name', 'encrypted_id'])
    const [search, setSearch] = useState('')
    const [profPic, setProfilePic] = useState('')

    const [notif, setNotif] = useState([])
    const [firstId, setFirstId] = useState('')


    // const user_id = cookies.id;
    // const display_name =  cookies.display_name
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
                'Token': token,
                'User-Id': user_id
            }
        }


        if (cookie.hasOwnProperty('token') === false || cookie.hasOwnProperty('encrypted_id') === false){
            Router.replace('/')
            return null;
        }
        
        axios.get(`${API_URL}/api/display_profile/${display_name}`, config)
        .then(response => {
            // console.log(response.data);      
            setProfilePic(response.data.data.user.profile_photo)
        })
        .catch(error => {
            // console.log(error.response.data.error);
            if(error.response.data.error ==  'User does not exist'){
                removeCookies('token');
                removeCookies('id');
                removeCookies('encrypted_id');
                removeCookies('profile_pic');
                removeCookies('display_name');
                Router.replace('/')
                return null;
            }
            if(error.response.data.error ==  'Token Expired'){
                removeCookies('token');
                removeCookies('id');
                removeCookies('encrypted_id');
                removeCookies('profile_pic');
                removeCookies('display_name');
                Router.replace('/')
                return null;
            }
            if(error.response.data.error ==  'Unauthorized'){
                removeCookies('token');
                removeCookies('id');
                removeCookies('encrypted_id');
                removeCookies('profile_pic');
                removeCookies('display_name');
                Router.replace('/')
                return null;
            }
            if(error.response.data.error ==  'Account Suspended'){
                removeCookies('token');
                removeCookies('id');
                removeCookies('encrypted_id');
                removeCookies('profile_pic');
                removeCookies('display_name');
                Router.replace('/')
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
                console.log(response.data);      
                setNotif(response.data.status)
                setFirstId(response.data.status[0].notifs_id)
            })
            .catch(error => {
                // console.log(error.response.data.error);
            });
        }, 15000)

        return () => clearInterval(getNotif)
        
    }, [])

    //Search Function
    const searchItem = (e)=>{
        e.preventDefault()
        if(search === ""){
            toastIdRef.current = toast({ title: 'What are you doing?', status: 'error', duration: 3000, isClosable: false })
            return null;
        }else{
            Router.push(`/search/${search}`)
        }
        // localStorage.setItem("search-item", search);
        
    }

    //Log-out function
    const logOut = () =>{
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
        let formData = new FormData;

        axios.post(`${API_URL}/api/logout`, formData, config)
        .then((response)=>{
            console.log(response)
            toastIdRef.current = toast({ title: 'Logout Successful!', status: 'success', duration: 3000, isClosable: false })
        })
        .then(()=>{
            removeCookies('token');
            removeCookies('encrypted_id');
            removeCookies('display_name');
            router.push('/')
        }).catch((error)=>{
            console.log(error.response)
            if(error.response.data.error ==  'Account Suspended'){
                removeCookies('token');
                removeCookies('encrypted_id');
                removeCookies('display_name');
                Router.replace('/')
                return null;
            }else{
                removeCookies('token');
                removeCookies('encrypted_id');
                removeCookies('display_name');
                Router.replace('/')
                return null;
            }
        })


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
                'Token': token,
                'User-Id': user_id
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
                display={{sm: 'flex', md:'flex', lg: 'none', xl: 'none', base: 'flex'}}
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
                <Flex display={{sm: 'none', md:'none', lg: 'flex', xl: 'flex', base: 'none'}}>
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
                <form onSubmit={searchItem}>
                    <Input fontFamily={'Raleway'} fontWeight={'light'} placeholder='Search for a user or a post' display={['none','none','none','flex']} w='30vw' type='text' mt={7} mr={{lg: '25vw', md: '10vw'}} onChange={(e)=>setSearch(e.target.value)} borderColor={useColorModeValue('black', 'white')}/>
                </form>
            <Spacer />
        <Flex
            pos='fixed'
            top='1rem'
            right='5rem'
            align='center'
            w="15em"
        >
            <Flex display={{sm: 'none', md:'none', lg: 'flex', xl: 'flex', base: 'none'}} w="full">
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
                        ><Img className={styles.darkicon2} src={useColorModeValue('/notification-alert-icon.png', '/notification-alert-icon-dark.png')} alt="Notification" w="2em" h="2em" ml={-5}/></Button>
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
                            > <Img className={styles.darkicon2} src={ImgUrl} alt="moon" w="2em" h="2em" ml={-20} /></Button>
                    <PopoverContent w="450px">
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader fontFamily={'Raleway'}>Notifications</PopoverHeader>
                        <PopoverBody fontFamily={'Raleway'} overflowY="auto" h='30vh' css={{
                            '&::-webkit-scrollbar': {
                            width: '4px',
                            },
                            '&::-webkit-scrollbar-track': {
                            width: '6px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                            background: '#212121',
                            borderRadius: '24px',
                            },
                        }}>
                            {notif.map((notification, i) =>
                            <Box key={i} display='flex' w="full" p={3}>
                                {notification.profile_photo ? <Img src={notification.profile_photo} mr={3} w="25px" h="25px" alt="Notification Image" /> : null}
                                <Text mr={3} fontFamily={'Raleway'}>{notification.display_name}</Text>
                                <Text mr={2} fontFamily={'Raleway'}>{notification.action}</Text>
                                <Text w="full" fontFamily={'Raleway'} isTruncated>{notification.title}</Text>
                            <Divider />
                            </Box>
                            )}
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
                <Menu>
                    <MenuButton
                        px={2}
                        py={2}
                        transition='all 0.2s'
                        display='flex'
                        w='100%'
                    > 
                    <Flex>
                        {/* <Image src=""></Image> */}
                        {/* <Img src='https://www.clipartmax.com/png/middle/119-1198197_anonymous-person-svg-png-icon-free-download-anonymous-icon-png.png' w='2vw' h='2vw'></Img> */}
                        <Img src={profPic} w='3vw' h='3vw' borderRadius={10}></Img>
                        {/* <Text fontFamily={'Raleway'} fontWeight={'bold'} mt={2} ml={1}>{display_name}</Text> */}
                        {/* <Text ml={1} mr={3}>{user_id}</Text> */}
                        <ChevronDownIcon ml={1} mt={3} />
                    </Flex>  
                    </MenuButton>
                    <MenuList bgColor={useColorModeValue('#E5E5E5', '#2E2E2E')}>
                        <MenuItem fontFamily={'Raleway'} fontWeight={'bold'} color={changeColor2}><Link href={`/profile/${display_name}`} passHref><Box w="full"><Center>Profile</Center></Box></Link></MenuItem>
                        <MenuItem fontFamily={'Raleway'} fontWeight={'bold'} color={changeColor2} onClick={logOut}><Box w="full"><Center>Logout</Center></Box></MenuItem>
                    </MenuList>
                </Menu>

            </Flex>

            
        </Flex>

        
        <Flex
        w='60vw'
        bg={useColorModeValue('white', '#212121')}
        zIndex={20}
        h='full'
        pos='fixed'
        top='0'
        left='0'
        overflowY='auto'
        flexDir='column'
        display={{sm: display, lg: 'none', base: display}}
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
                <form onSubmit={searchItem}>
                    <Input fontFamily={'Raleway'} fontSize="xs" fontWeight={'light'} w='50vw' type='text' mt={7} placeholder='Search for a user or a post' onChange={(e)=>setSearch(e.target.value)} boxShadow={'md'} />
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
                        fontFamily={'Raleway'}
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
                        fontFamily={'Raleway'}
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
                        fontFamily={'Raleway'}
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
                        fontFamily={'Raleway'}
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
                        color={changeColor2}
                        rounded='none'
                        onClick={logOut}
                        fontFamily={'Raleway'}
                    >
                    Logout
                    </Button>
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={5}
                        w='100%'
                        onClick={changeDarkAndLightIcon}
                        _hover={{cursor:'pointer'}}
                        _active={{bgColor: 'none'}}
                    >
                    <Img className={styles.darkicon2} src={ImgUrl} alt="moon" w="2em" h="2em" ml={-2} />
                    </Button>
            </Flex> 
        </Flex>


    </Flex>
    </>
    )
}

