import Head from 'next/head'
import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import styles from "@styles/component/Nav.module.css";
import Link from 'next/link'
import Logo from "@public/critiquehall2.png";
import { Button, ButtonGroup } from "@chakra-ui/react"
import { HamburgerIcon } from '@chakra-ui/icons'
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
import { useColorMode, useColorModeValue } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { useState } from 'react';

const breakpoints = createBreakpoints({
    sm: '40em',
    md: '52em',
    lg: '64em',
    xl: '80em',
})

const MotionButton = motion(Button)

export default function Nav(){
    const { colorMode, toggleColorMode } = useColorMode()
    colorMode === 'light' ? 'Dark' : 'Light'
    const [display, changeDisplay] = useState('none')

    return(
        <>
    {/* <Box bg='light' className={styles.container} position='sticky'>
        <Box className={styles.menu_button}>
        <Button ><HamburgerIcon /></Button>
        </Box>
        <Box className={styles.logo}>
            <Link href="/">
                <Image src={Logo} alt="Critique Hall Logo"></Image>
            </Link>
        </Box>
        <Box as='nav'>
            <motion.ul 
            animate={{ y: -5, stdDeviation: [1, 3, 2], opacity:1}}
            initial={{opacity: 0 , y: -15}}>
                <li><Link px={4} py={2} href="/login"><a>LOG-IN</a></Link></li>
                <li><Link px={4} py={2} href="/register"><a>REGISTER</a></Link></li> */}
                {/* <li><Switch id='dark-mode' ml="3"/></li> */}
                {/* <li><Button bg='light' onClick={toggleColorMode}>Toggle {}</Button></li>
            </motion.ul>
        </Box>
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
            
            <Flex w='10em' h='3em' ml={[32,32,16,16]} mt={5}>
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
                <Link href="/login">
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={2}
                        w='100%'

                    >
                        Log-in
                    </Button>
                </Link>
                <Link href="/register">
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={2}
                        w='100%'

                    >
                        Register
                    </Button>
                </Link>
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={2}
                        w='100%'
                        onClick={toggleColorMode}
                    >
                        Dark Mode
                    </Button>

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
                <Link href="/login">
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={5}
                        w='100%'

                    >
                        Log-in
                    </Button>
                </Link>
                <Link href="/register">
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={5}
                        w='100%'

                    >
                        Register
                    </Button>
                </Link>
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={5}
                        w='100%'
                        onClick={toggleColorMode}
                    >
                        Dark Mode
                    </Button>
            </Flex> 
        </Flex>


    </Flex>
    </>
    )
}

