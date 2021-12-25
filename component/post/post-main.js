import Head from 'next/head'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import styles from "@styles/component/Nav.module.css";
import Link from 'next/link'
import Logo from "@public/critiquehall.png";
import { Button, ButtonGroup, Spacer } from "@chakra-ui/react"
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
import { Heading } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';
import EditPost from './options/edit';
import EditHistory from '@component/edit-history';
import ReportPost from '@component/report-post';


const MotionButton = motion(Button)
const MotionBox = motion(Box)

// export async function getServerSideProps(context) {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }

export default function PostMain(){


    return(
    <Box w="50%" bg='light' h='80vh' p={5} boxShadow='md' mt={28} ml='3vw'>
      <Heading mx="auto">Title</Heading>
              
      {/* Image */}
        <Image mx="auto" w='30vh' h='30vh' onClick='' />
      {/* Options */}
      <Box display="flex" w="100%" mt={5}>
        <Button position='static'>Like</Button>
        <Spacer />
        <Menu>
            <MenuButton
              px={4}
              py={2}
              transition='all 0.2s'
            >
            <ChevronDownIcon />
            </MenuButton>
            <MenuList p={3}>
              <MenuGroup>
                <MenuItem><EditPost /></MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup>
                <MenuItem><EditHistory /></MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup>
                <MenuItem><ReportPost /></MenuItem>
              </MenuGroup>
            </MenuList>
        </Menu>
      </Box>
      {/* Description */}
      <Box mt={5}>
        <Heading size='md'>Description</Heading>
        <Text w='45vw' mx='auto' mt={5}>Dolor est mollit id cillum laborum irure velit do magna consequat veniam qui deserunt et. Lorem sunt irure eu deserunt proident consectetur. Incididunt laboris laboris consequat eu consectetur voluptate dolore velit in. Commodo aute velit tempor esse fugiat. Dolore Lorem officia ullamco elit.</Text>
      </Box>
      {/* Critique Input */}
      <Box display='flex' flexDir='column' mt={5}>
        <Textarea bg='white' boxShadow='md' w="90vh" mx="auto" mt={3}  />
        <Button w='10vh' mx='auto' mt={3}>Post</Button>
      </Box>
 
    </Box>
    )
}

