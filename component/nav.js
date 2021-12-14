import Head from 'next/head'
import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import styles from "@styles/component/Nav.module.css";
import Link from 'next/link'
import Logo from "@public/critiquehall.png";
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


const MotionButton = motion(Button)

export default function Nav(){
    return(
    <Box className={styles.container}>
        <div className={styles.menu_button}>
        <Button ><HamburgerIcon /></Button>
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
                <li><Link px={4} py={2} href="/home"><a>Home</a></Link></li>
                <li><Link px={4} py={2} href="/critique/hall-page"><a>Critique</a></Link></li>
                <li><Link px={4} py={2} href="/feedback"><a>Feedback</a></Link></li>
                {/* Profile will be changed into a dropdown with AccName as label */}
                {/* <li><Link href=""><a>Profile</a></Link></li> */}
                <li>
                    <form action="/search" method="GET">
                        <input placeholder="Search" id="search" className={styles.input_box} type="text"/>
                    </form>
                </li>
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
                        <MenuItem><Link href="/settings" as="/setting">Settings</Link></MenuItem>
                        <MenuItem>Dark Mode<Switch id='dark-mode' ml="3" /></MenuItem>
                        <MenuItem color="red" _hover={{ bg: 'red.500' }}><Link href="/">Log Out</Link></MenuItem>
                        {/* <MenuDivider />
                        <MenuItem>Open...</MenuItem>
                        <MenuItem>Save File</MenuItem> */}
                    </MenuList>
                    </Menu></li>
                {/* <MotionButton className={styles.nav_button}
                colorScheme="red"
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}><Link href="/login">Log Out</Link></MotionButton> */}
            </motion.ul>
        </nav>
    </Box>
    )
}

