import Link from 'next/link'
import {Box, Button} from '@chakra-ui/react'
import { Textarea, Image, Text } from '@chakra-ui/react'
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
import {ChevronDownIcon} from '@chakra-ui/icons'
import EditPost from '@component/post/options/edit'
import ReportPost from '@component/report-post'
import DeletePost from '@component/post/options/delete'

function CritiqueList({critique}){

  return(
    <>
    <Box w="100%" display={{lg: 'flex', sm: 'block'}} key={posts.post_id} mt='2ch' borderColor='white' border='1px solid'>
                                <Link href='/post/[id]'  as={`/post/${post.post_id}`}>
                                <a>
                                <Box display={{lg: 'flex', sm: 'block'}} w="50vw">
                                    <Box p="3" w="100%" bg="light" my='auto'>
                                        <Text>{post.hall_id}</Text>
                                    </Box>
                                    <Box p="3" w="100%" bg="light" my='auto'>
                                        <Image src="/hello.jpg" w='10vw' h='10vh' />
                                    </Box>
                                    <Box p="3" w="100%" bg="light" my='auto'>
                                        <Text>{post.title}</Text>
                                    </Box>
                                    <Box p="3" w="100%" bg="light" my='auto'>
                                        Posted by: {post.display_name}
                                    </Box>
                                </Box>
                                </a>
                                </Link>
                                <Box p="3" w="100%" bg="light" display='flex'>
                                    <Box w="100%" bg="light" my='auto'>
                                        {post.time_ago}
                                    </Box>
                                    <Box w="100%" bg="light" my='auto'>
                                    <Menu>
                                        <MenuButton
                                        px={4}
                                        py={2}
                                        transition='all 0.2s'
                                        >
                                        <ChevronDownIcon />
                                        </MenuButton>
                                        <MenuList p={3}>
                                        <MenuGroup id='editPost'>
                                            <MenuItem><EditPost id={post.post_id} /></MenuItem>
                                        </MenuGroup>
                                        <MenuDivider />
                                        <MenuGroup id='repPost'>
                                            <MenuItem><ReportPost /></MenuItem>
                                        </MenuGroup>
                                        <MenuDivider id='repPost' />
                                        <MenuGroup>
                                            <MenuItem><DeletePost /></MenuItem>
                                        </MenuGroup>
                                        </MenuList>
                                    </Menu>
                                    </Box>      
                                </Box>                 
                            </Box>
    </>
  )

  
}

export async function getServerSideProps(context) {
  const { API_URL } = process.env
  const { API_KEY } = process.env

  const res = await fetch(`${API_URL}/api/display_all_posts`)
  const data = await res.json() 
    return {
      props: {}, // will be passed to the page component as props
    }
  }

export default CritiqueList


