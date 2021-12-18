import Head from 'next/head'
import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import styles from "@styles/component/Nav.module.css";
import Link from 'next/link'
import Logo from "@public/critiquehall.png";
import { Heading } from '@chakra-ui/react'
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
import CritiqueItem from './Critique';


const MotionButton = motion(Button)

// export async function getServerSideProps(context) {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }

export default function PostCritiques(){
    return(
    <Box w="40%">
      {/* Header */}
      <Box >
        <Heading>Critiques</Heading>
        {/* <Menu>
            <MenuButton
              px={4}
              py={2}
              transition='all 0.2s'
            > 
            <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem><Link href="/profile/profile" as="/profile">Profile</Link></MenuItem>
              <MenuItem><Link href="/settings" as="/setting">Settings</Link></MenuItem>
              <MenuItem>Dark Mode<Switch id='dark-mode' ml="3" /></MenuItem>
              <MenuItem color="red" _hover={{ bg: 'red.500' }}><Link href="/">Log Out</Link></MenuItem>
            </MenuList>
        </Menu> */}
        
      </Box>
      {/* Critiques */}

      <Box p="2" overflow-y="auto">

      </Box>
      
        
    </Box>
    )
}

