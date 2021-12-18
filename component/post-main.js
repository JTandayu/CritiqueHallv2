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
import { Image } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'


const MotionButton = motion(Button)
const MotionBox = motion(Box)

// export async function getServerSideProps(context) {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }

export default function PostMain(){
    return(
    <Box w="40%">
      <Heading mx="auto">Title</Heading>
              
      {/* Image */}
      <Image mx="auto" />
      {/* Options */}
      <Box display="flex" w="100%">
        <Menu>
            <MenuButton
              px={4}
              py={2}
              transition='all 0.2s'
            >
            <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem>Edit</MenuItem>
              <MenuItem>History</MenuItem>
              <MenuItem>Report</MenuItem>
            </MenuList>
        </Menu>
      </Box>
      {/* Description */}
      <Box>
        <Text>Description</Text>
      </Box>
      {/* Critique Input */}
      <MotionBox>
        <TextArea w="90" mx="auto" />
        <Button>Post</Button>
      </MotionBox>
      


        
    </Box>
    )
}

