import Head from 'next/head'
import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import styles from "@styles/component/Nav.module.css";
import Link from 'next/link'
import Logo from "@public/critiquehall.png";
import { Flex, Heading, Spacer, Text } from '@chakra-ui/react'
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
import { Select } from '@chakra-ui/react';


const MotionButton = motion(Button)

// export async function getServerSideProps(context) {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }

export default function PostCritiques(){

    const giveStar = async() =>{

    }

    const giveReply = async() =>{
      
    }


    return(
    <Box w="40%" bg='light' h='80vh' p={5} boxShadow='md' mt={28} ml='3vw'>
      {/* Header */}
      <Box display='flex'>
        <Heading>Critiques</Heading>
        <Spacer />
        <Flex w='15vw' mt={1}>
          <Text mr={5} w={20} mt={2}>Sort By: </Text>
          <Select>
            <option value='oldest'>Oldest</option>
            <option value='newest'>Newest</option>
            <option value='most-star'>Most Stars</option>
            <option value='least-star'>Least Stars</option>
            <option value='has-badge'>Badge</option>
          </Select>
        </Flex>
        {/* <Menu>
            <MenuButton
              px={4}
              py={2}
              transition='all 0.2s'
            > 
            Sort By: 
            <ChevronDownIcon ml={2} />
            </MenuButton>
            <MenuList>
              <MenuItem><Link href="/profile/profile" as="/profile">Profile</Link></MenuItem>
              <MenuItem><Link href="/settings" as="/setting">Settings</Link></MenuItem>
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

