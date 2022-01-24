import Head from 'next/head'
// import Image from 'next/image'
import { Center, Image } from '@chakra-ui/react';
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
    colorMode === 'light' ? 'dark' : 'light'

    const [display, changeDisplay] = useState('none')

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


    <Flex boxShadow='md' w='100%' h='10vh' bg={useColorModeValue('white', '#212121')} pos='fixed'> 
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
                <Link href="/" passHref>
                    <Image className={styles.critique_logo} src={useColorModeValue('critiquehall2.png', 'critiquehall2-dark.png')} alt="Critique Hall Logo" w="10em" h="3em" _hover={{cursor:'pointer'}}></Image>
                </Link>
            </Flex>

        <Flex
            pos='fixed'
            top='1rem'
            right='1rem'
            align='center'
        >

            <Flex display={['none','none','flex','flex']}>
                <Link href="/login" passHref>
                    <a>
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={2}
                        mr={5}
                        w='100%'
                        color={useColorModeValue('#1B1464', '#B2A3FF')}
                        _hover={{cursor:'pointer', textDecoration:'underline'}}
                        _active={{bgColor: 'none'}}
                        fontFamily={'Raleway'}                                                                             
                    >
                        <Image src={useColorModeValue('critique-user-icon.png', 'critique-user-icon-dark.png')} alt="Critique Hall User Logo" w="2em" h="2em" mr={2} />LOG-IN
                    </Button>
                    </a>
                </Link>
 
                <Link href="/register" passHref>
                    <a>
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={2}
                        w='100%'
                        color={useColorModeValue('#C1272D', '#FF5C61')}
                        _hover={{cursor:'pointer', textDecoration:'underline'}}
                        _active={{bgColor: 'none'}}
                        fontFamily={'Raleway'}
                    >
                        <Image src={useColorModeValue('critique-message-icon.png', 'critique-message-icon-dark.png')} alt="Critique Hall Message Logo" w="2em" h="2em" mr={2} />REGISTER
                    </Button>
                    </a>
                </Link>

                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={2}
                        ml={4}
                        w='100%'
                        onClick={changeDarkAndLightIcon}
                        _hover={{cursor:'pointer'}}
                        _active={{bgColor: 'none'}}
                    >
                        <Image className={styles.darkicon} src={ImgUrl} alt="darkmode" w="2em" h="2em" ml={-5} />
                    </Button>

            </Flex>

            
        </Flex>

        
        <Flex
        w='40vw'
        bg={useColorModeValue('#FFFFFF', '#212121')}
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
                <Link href="/" passHref>
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={5}
                        w='100%'
                        // color={useColorModeValue('#1B1464')}
                        _hover={{cursor:'pointer', textDecoration:'underline'}}
                        _active={{bgColor: 'none'}}
                    >
                        <Image className={styles.critique_logo_2} src={useColorModeValue('critiquehall.png', 'critiquehall-dark.png')} alt="Critique Hall Logo" w="100px" h="70px" mr={2} />
                    </Button>
                </Link>
                <Link href="/login" passHref>
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={5}
                        w='100%'
                        color={useColorModeValue('#1B1464', '#B2A3FF')}
                        _hover={{cursor:'pointer', textDecoration:'underline'}}
                        _active={{bgColor: 'none'}}
                    >
                        <Image src={useColorModeValue('critique-user-icon.png', 'critique-user-icon-dark.png')} alt="Critique Hall User Logo" w="1.2em" h="2em" mr={2} />LOG-IN
                    </Button>
                </Link>
                <Link href="/register" passHref>
                    <Button
                        as='a'
                        variant='ghost'
                        aria-label='Home'
                        my={5}
                        w='100%'
                        color={useColorModeValue('#C1272D', '#FF5C61')}
                        _hover={{cursor:'pointer', textDecoration:'underline'}}
                        _active={{bgColor: 'none'}}
                    >
                        <Image src={useColorModeValue('critique-message-icon.png', 'critique-message-icon-dark.png')} alt="Critique Hall Message Logo" w="2em" h="2em" mr={2} />REGISTER
                    </Button>
                </Link>
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
                        <Image className={styles.darkicon} src={ImgUrl} alt="moon" w="3em" h="3em" />
                    </Button>
            </Flex> 
        </Flex>


    </Flex>
    </>
    )
}

