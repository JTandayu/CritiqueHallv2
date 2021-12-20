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



const MotionButton = motion(Button)

export default function Nav(){
    return(
    <Box className={styles.container}>
        <div className={styles.menu_button}>
        <Button ><HamburgerIcon /></Button>
        </div>
        <div className={styles.logo}>
            <Link href="/">
                <Image src={Logo} alt="Critique Hall Logo"></Image>
            </Link>
        </div>
        <nav>
            <motion.ul 
            animate={{ y: -5, stdDeviation: [1, 3, 2], opacity:1}}
            initial={{opacity: 0 , y: -15}}>
                <li><Link px={4} py={2} href="/login"><a>LOG-IN</a></Link></li>
                <li><Link px={4} py={2} href="/register"><a>REGISTER</a></Link></li>
                <li><Switch id='dark-mode' ml="3" /></li>
            </motion.ul>
        </nav>
    </Box>
    )
}

