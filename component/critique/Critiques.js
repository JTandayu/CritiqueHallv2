import React from 'react'
import { useEffect, useState } from 'react'
import {Box, Flex, Heading, Image, Spacer, Text, Button, Textarea, Center, Select} from '@chakra-ui/react'
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
import { ChevronDownIcon } from '@chakra-ui/icons'
import EditHistory from '@component/edit-history';
import ReportUser from '@component/report-user'
import axios from 'axios'
import { CritiqueReply } from './CritiqueReply'
import { useCookies } from 'react-cookie'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { extendTheme } from '@chakra-ui/react'
import EditCritique from './options/edit-critique'
import DeleteCritique from './options/delete-critique'
import EditCritiqueHistory from './options/edit-critique-history'

const breakpoints = createBreakpoints({
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  })

const theme = extendTheme({ breakpoints })

export const Critiques = ({id}) => {
    const { API_URL } = process.env
    const { API_KEY } = process.env

    const [cookie, setCookie] = useCookies('token', 'id', 'encrypted_id', 'display_name')
    const [critiqueItems, setCritiqueItems] = useState([])
    const [reply, setReply] = useState('')
    const [lastId, setLastID] =  useState('0')
    const [filter, setFilter] = useState('desc')
    const [loading, setLoading] = useState(true)
    // const [newPostCritique, setNewPostCritique] = useState(newPost)
    // const filterCritique = filter;
    // console.log(filter)
    // console.log(cookie.token)
    // const [data, setData] =  useState([])

    const config = {
        headers: { 
          'content-type': 'multipart/form-data',
          'X-API-KEY': `${API_KEY}`,
          'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
          'Accept': 'application/json',
          'Token': cookie.token,
          'User-Id': cookie.encrypted_id
        }
    };

    useEffect(() => {

        let formData = new FormData;
        formData.append('post_id', id);
        formData.append('last_id', null);

        axios.post(`${API_URL}/api/display_all_critiques`, formData, config)
        .then((response) =>{
            console.log(response.data)
            setCritiqueItems(response.data.data)
            setLoading(true)
            // document.getElementById(response.data.data.critique_id).hidden=true
            console.log(response.data.data[0])
            
            for(let i = 0; i < response.data.data.length; i++){
                if(i == response.data.data.length - 1){
                    setLastID(response.data.data[i].critique_id)
                }
            }
        }).catch((error) =>{
            console.log(error)
        })
        
    }, [])

    const openReply = async(id) =>{
        document.getElementById(id).removeAttribute('hidden');
    }

    const submitReply = async(critique_id) =>{
        e.preventDefault();

        let formData = new FormData;
        formData.append('critique_id', critique_id);
        formData.append('body', reply);

        axios.post(`${API_URL}/api/create_reply`, formData, config)
        .then((response) =>{
            console.log(response.data)
            document.getElementById(critique_id).hidden=true;
            setCritiqueItems(critiqueItems => critiqueItems.filter())
            window.location.href = `/post/${id}`;
        }).catch((error) =>{
            console.log(error.response)
        })
    }

    const sortCritique = (e) =>{
        e.preventDefault();

        let formData = new FormData;
        formData.append('post_id', id);
        formData.append('last_id', null);
        formData.append('sort', e)

        axios.post(`${API_URL}/api/display_all_critiques`, formData, config)
        .then((response) =>{
            console.log(response.data)
            setCritiqueItems(response.data.data)
            // document.getElementById(response.data.data.critique_id).hidden=true
            console.log(response.data.data[0])
            
            for(let i = 0; i < response.data.data.length; i++){
                if(i == response.data.data.length - 1){
                    setLastID(response.data.data[i].critique_id)
                }
            }
        }).catch((error) =>{
            console.log(error)
        })
    }

    const cancelReply = async(id) =>{
        document.getElementById(id).hidden=true;
    }

    const loadMore = async() =>{
        let formData = new FormData;
        formData.append('post_id', id);
        formData.append('last_id', lastId);
        console.log(lastId)
        console.log(critiqueItems)

        axios.post(`${API_URL}/api/display_all_critiques`, formData, config)
        .then((response) =>{
            console.log(response.data)
            // this.setState((prevState) => [...prevState, urls])
            response.data.data.map((item)=>{
                setCritiqueItems((prevState) => [...prevState, item])
            })
            

            for(let i = 0; i < response.data.data.length; i++){
                if(i == response.data.data.length - 1){
                    setLastID(response.data.data[i].critique_id)
                }
            }

        }).catch((error) =>{
            console.log(error.response)
        })
        // document.getElementById('reply').hidden=true;
    }

    const giveStar = async(id) =>{
        let formData = new FormData;
        formData.append('critique_id', id);
        
        axios.post(`${API_URL}/api/star_critique`, formData, config)
        .then((response) =>{
            console.log(response.data)
            document.getElementById(`star${id}`).innerHTML=response.data.likes;
        }).catch((error) =>{
            console.log(error.response)
        })
    }

    return (
        <div>
            <Box display='flex'>
                        <Heading>Critiques</Heading>
                        <Spacer />
                        <Flex w={{lg: '15vw', sm: '50%'}} mt={1}>
                        <Text mr={{lg: 5, sm: 1}} w={20} mt={2}>Sort by: </Text>
                        <Select onChange={(e)=>sortCritique(e.target.value)}>
                            <option value='desc'>Newest</option>
                            <option value='asc'>Oldest</option>
                            <option value='most_stars'>Most Stars</option>
                            <option value='most_interacted'>Most Interacted</option>
                        </Select>
                        </Flex>
            </Box>


            <Box overflowY="scroll" h={{lg: '80vh', sm: '70vh'}} mt={5}>
            {loading ? <Box>Loading...</Box> :
            critiqueItems.map((critique) => { 
                if(critique.display_name === cookie.display_name){
                return(
                    <>
                    <Box p="2" overflow-y="auto" w={{lg: '35vw', sm: '100%'}} mt={5} position='static'>
                            <Flex>
                                <Image src={critique.profile_photo} w='3vh' h='3vh' mt={2} />
                                <Heading size='sm' ml={3} mt={2}>{critique.display_name}</Heading>
                                <Spacer />
                                <Text fontSize='sm' mt={2}>{critique.time_ago}</Text>

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
                                        <MenuItem><EditCritiqueHistory id={critique.critique_id} /></MenuItem>
                                    </MenuGroup>
                                    <MenuDivider />
                                    <MenuGroup>
                                        <MenuItem><EditCritique data={critique} /></MenuItem>
                                    </MenuGroup>
                                    <MenuDivider />
                                    <MenuGroup>
                                        <MenuItem><DeleteCritique id={critique.critique_id} /></MenuItem>
                                    </MenuGroup>
                                    </MenuList>
                                </Menu>
                            </Flex>
                            <Box w='100%' mt={1}>
                                <Text fontSize='md'>{critique.body}</Text>
                            </Box>
                            <Flex w='20vw'>
                                <Button variant='ghost' id={`star${critique.critique_id}`} onClick={()=>giveStar(critique.critique_id)}>Star {critique.stars}</Button>
                                <Button variant='ghost' ml={5} onClick={()=>openReply(critique.critique_id)}>Reply</Button>
                        </Flex>
                    </Box>
                    <Box p="2" w='35vw' mt={1} id={critique.critique_id} hidden>
                    <Textarea w="full" onChange={(e) => setReply(e.target.value)}/>
                    <Flex>
                        <Button mt={3} onClick={() => submitReply(critique.critique_id)}>Reply</Button>
                        <Button mt={3} ml={3} onClick={ () => cancelReply(critique.critique_id)}>Cancel</Button>
                    </Flex>
                    </Box>
                    <CritiqueReply id={critique.critique_id} />
                    </>
            )
            }

            return(
                    <>
                    <Box p="2" overflow-y="auto" w={{lg: '35vw', sm: '100%'}} mt={5} position='static'>
                            <Flex>
                                <Image src={critique.profile_photo} w='3vh' h='3vh' mt={2} />
                                <Heading size='sm' ml={3} mt={2}>{critique.display_name}</Heading>
                                <Spacer />
                                <Text fontSize='sm' mt={2}>{critique.time_ago}</Text>
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
                                        <MenuItem><EditCritiqueHistory id={critique.critique_id} /></MenuItem>
                                    </MenuGroup>
                                    <MenuDivider />
                                    <MenuGroup>
                                        <MenuItem><ReportUser /></MenuItem>
                                    </MenuGroup>
                                    </MenuList>
                                </Menu>
                            </Flex>
                            <Box w='100%' mt={1}>
                                <Text fontSize='md'>{critique.body}</Text>
                            </Box>
                            <Flex w='20vw'>
                                <Button variant='ghost' id={`star${critique.critique_id}`} onClick={()=>giveStar(critique.critique_id)}>Star {critique.stars}</Button>
                                <Button variant='ghost' ml={5} onClick={()=>openReply(critique.critique_id)}>Reply</Button>
                        </Flex>
                </Box>
                <Box p="2" w='35vw' mt={1} id={critique.critique_id} hidden>
                    <Textarea w="full" onChange={(e) => setReply(e.target.value)}/>
                    <Flex>
                        <Button mt={3} onClick={() => submitReply(critique.critique_id)}>Reply</Button>
                        <Button mt={3} ml={3} onClick={ () => cancelReply(critique.critique_id)}>Cancel</Button>
                    </Flex>
                </Box>
                {/* {console.log(critique.critique_id)} */}
                <CritiqueReply id={critique.critique_id} />
                </>
            )
            })}

            <Center>
                <Button variant='ghost' w="100%" onClick={loadMore} id='loadMore'>Load More</Button>
            </Center>

            </Box>

        </div>
    )
}
