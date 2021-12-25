import Head from 'next/head'
import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import styles from "@styles/component/Nav.module.css";
import Link from 'next/link'
import Logo from "@public/critiquehall.png";
import { Button, ButtonGroup, IconButton, Spacer, useColorModeValue } from "@chakra-ui/react"
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
import Sidebar from './sidebar/sidebar';
import { useState } from 'react';
import {Flex} from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const MotionButton = motion(Button)

const breakpoints = createBreakpoints({
    sm: '40em',
    md: '52em',
    lg: '64em',
    xl: '80em',
})

export default function Nav(){
    const [display, changeDisplay] = useState('none')

    return(
    <>
    {/* <Box bg={useColorModeValue('white', '#1a202c')} className={styles.container} position='sticky' z-index='10000'>
        <div className={styles.menu_button}>
        <IconButton
            aria-label='Open Menu'
            size='lg'
            mr={2}
            icon={<HamburgerIcon/>}
            />
        </div>
        <div className={styles.logo}>
            <Link href="/home">
                <Image src={Logo} alt="Critique Hall Logo"></Image>
            </Link>
        </div>
        <nav>
            <motion.ul 
            animate={{ y: -5, stdDeviation: [1, 3, 2], opacity:1}}
            initial={{opacity: 0 , y: -15}}>
                <li>
                    <form action="/search" method="GET">
                        <input placeholder="Search" id="search" className={styles.input_box} type="text"/>
                    </form>
                </li>
                <li><Link px={4} py={2} href="/home"><a>Home</a></Link></li>
                <li><Link px={4} py={2} href="/critique/hall-page"><a>Critique</a></Link></li>
                <li><Link px={4} py={2} href="/feedback"><a>Feedback</a></Link></li>
                <li><Menu>
                    <MenuButton
                        px={4}
                        py={2}
                        transition='all 0.2s'
                        // borderRadius='md'
                        // borderWidth='1px'
                        // _hover={{ bg: 'gray.400' }}
                        // _expanded={{ bg: 'blue.400' }}
                        // _focus={{ boxShadow: 'outline' }}
                    >
                        
                        User 

                        <ChevronDownIcon />
                    </MenuButton>
                    <MenuList>
                        <MenuItem><Link href="/profile/profile" as="/profile">Profile</Link></MenuItem>
                        <MenuItem color="red" _hover={{ bg: 'red.500' }}><Link href="/">Log Out</Link></MenuItem>
                    </MenuList>
                    </Menu></li>

            
        </nav>
        
    </Box> */}
    <Flex boxShadow='md' w='100%' h='10vh' bg={useColorModeValue('white', '#1a202c')} pos='fixed'> 
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
                <Link href="/home">
                    <Image src={Logo} alt="Critique Hall Logo"></Image>
                </Link>
            </Flex>

        <Flex
            pos='fixed'
            top='1rem'
            right='1rem'
            align='center'
        >

            <Flex display={['none','none','flex','flex']}>
                <Link href="/home">
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={2}
                        w='100%'

                    >
                        Home
                    </Button>
                </Link>
                <Link href="/critique" as='/critique'>
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={2}
                        w='100%'

                    >
                        Critique
                    </Button>
                </Link>
                <Link href="/feedback" >
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={2}
                        w='100%'

                    >
                        Feedback
                    </Button>
                </Link>
                <Menu>
                    <MenuButton
                        px={4}
                        py={2}
                        transition='all 0.2s'
                        display='flex'
                        w='100%'
                    >   
                    User 
                    <ChevronDownIcon />
                    </MenuButton>
                    <MenuList>
                        <MenuItem><Link href="/profile/profile">Profile</Link></MenuItem>
                        <MenuItem color="red" _hover={{ bg: 'red.500' }}><Link href="/">Log Out</Link></MenuItem>
                    </MenuList>
                </Menu>

            </Flex>

            
        </Flex>

        
        <Flex
        w='40vw'
        bg={useColorModeValue('white', '#1a202c')}
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
                <Link href="/home">
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={5}
                        w='100%'

                    >
                        Home
                    </Button>
                </Link>
                <Link href="/critique" as='/critique'>
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={5}
                        w='100%'

                    >
                        Critique
                    </Button>
                </Link>
                <Link href="/feedback" >
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={5}
                        w='100%'

                    >
                        Feedback
                    </Button>
                </Link>
                <Link href="/profile/profile">
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={5}
                        w='100%'

                    >
                        Profile
                    </Button>
                </Link>
                <Link href="/" >
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={5}
                        w='100%'

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

