import Head from 'next/head'
import { Box } from '@chakra-ui/react'
import Link from 'next/link'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react'
import { post } from 'jquery'

export async function getServerSideProps(context) {
  const { API_URL } = process.env
  const { API_KEY } = process.env

  const res = await fetch(`${API_URL}/api/display_all_posts`)
  const data = await res.json() 
    return {
      props: {}, // will be passed to the page component as props
    }
}

function CritiqueItem(){
  return(
    <Box w="100%" display={{lg: 'flex', sm: 'block'}} mt='2ch'>
                        <Link href='/post/[id]' as={`/post/${post.id}`}>
                        <Box p="3" w="100%" bg="white">
                            Hall
                        </Box>
                        <Box p="3" w="100%" bg="white">
                            Image
                        </Box>
                        <Box p="3" w="100%" bg="white">
                            {post.title}
                        </Box>
                        <Box p="3" w="100%" bg="white">
                            Posted by: {post.user}
                        </Box>
                        </Link>
                        <Box p="3" w="100%" bg="white" display='flex'>
                            <Box w="100%" bg="white">
                                {post.time}
                            </Box>
                            <Box w="100%" bg="white">
                                <Menu>
                                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                        Actions
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem>Report</MenuItem>
                                        <MenuItem>Create a Copy</MenuItem>
                                        <MenuItem>Mark as Draft</MenuItem>
                                        <MenuItem>Delete</MenuItem>
                                        <MenuItem>Attend a Workshop</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Box>      
                        </Box>                 
                    </Box>
  )
}

export default CritiqueItem