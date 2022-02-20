import React from 'react'
import Link from 'next/link'
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
import { extendTheme, useColorModeValue } from '@chakra-ui/react'
import EditCritique from './options/edit-critique'
import DeleteCritique from './options/delete-critique'
import EditCritiqueHistory from './options/edit-critique-history'
import { useRouter } from 'next/router'
import { useToast } from "@chakra-ui/react";
import { getCookie } from 'cookies-next'
import ReportCritique from '@component/report-critique'

const breakpoints = createBreakpoints({
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  })

const theme = extendTheme({ breakpoints })

export const Critiques = ({id, newCritique}) => {
    const { API_URL } = process.env
    const { API_KEY } = process.env

    const [cookie] = useCookies()
    const token = getCookie('token')
    const user_id = getCookie('encrypted_id')
    const display_name = getCookie('display_name')

    const [critiqueItems, setCritiqueItems] = useState([])
    const [reply, setReply] = useState([])
    const [lastId, setLastID] =  useState('0')
    const [filter, setFilter] = useState('desc')
    const [loading, setLoading] = useState(true)
    const [newReply, setNewReply] = useState('')
    const router = useRouter()
    const toast = useToast()
    const toastIdRef = React.useRef()
    // const [newPostCritique, setNewPostCritique] = useState(newPost)
    // const filterCritique = filter;
    // console.log(filter)
    // console.log(cookie.token)
    // const [data, setData] =  useState([])

    const beCritique = useColorModeValue('/be-first-critique.png', '/be-first-critique-dark.png')
    const CritiqueTitle = useColorModeValue('/critiques-title.png', '/critiques-title-dark.png')
    const TextareaBorderColor = useColorModeValue('black', 'white')
    const changeIcon = useColorModeValue('/stars-clicked.png', '/stars-clicked-dark.png')
    const changeBadgeIcon = useColorModeValue('/badge-icon.png', '/badge-icon-dark.png')

    const config = {
        headers: { 
          'content-type': 'multipart/form-data',
          'X-API-KEY': `${API_KEY}`,
          'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
          'Accept': 'application/json',
          'Token': token,
          'User-Id': user_id
        }
    };

    useEffect(() => {
        if(!router.isReady) return;
        
        let formData = new FormData;
        formData.append('post_id', id);
        formData.append('last_id', null);
        formData.append('sort', filter)

        axios.post(`${API_URL}/api/display_all_critiques`, formData, config)
        .then((response) =>{
            console.log(response.data)
            setCritiqueItems(response.data.data)
            setLoading(false)
            // document.getElementById(response.data.data.critique_id).hidden=true
            // console.log(response.data.data[0])
            
            for(let i = 0; i < response.data.data.length; i++){
                if(i == response.data.data.length - 1){
                    setLastID(response.data.data[i].critique_id)
                }
            }
        }).catch((error) =>{
            console.log(error)
        })
        
    }, [newCritique, id])

    const openReply = async(id) =>{
        document.getElementById(id).removeAttribute('hidden');
        // document.getElementById(!id).hidden=true;
    }

    const submitReply = (critique_id, e) =>{
        e.preventDefault();

        let formData = new FormData;
        formData.append('critique_id', critique_id);
        formData.append('body', reply[critique_id]);

        axios.post(`${API_URL}/api/create_reply`, formData, config)
        .then((response) =>{
            // console.log(response.data)
            document.getElementById(critique_id).hidden=true;
            document.getElementById(`reply${critique_id}`).value=''
            setNewReply(reply[critique_id]);

        }).catch((error) =>{
            console.log(error)
            if(error.response.data.status === "Account Muted"){
                toastIdRef.current = toast({ title: 'Account Muted!', status: 'error', duration: 3000, isClosable: false })
            }
        })
    }

    const handleChange = (e, i) =>{
        e.preventDefault()
        reply[i] = e.target.value;
    }

    const sortCritique = (e) =>{
        // e.preventDefault();

        let formData = new FormData;
        formData.append('post_id', id);
        formData.append('last_id', null);
        formData.append('sort', e)

        axios.post(`${API_URL}/api/display_all_critiques`, formData, config)
        .then((response) =>{
            // console.log(response.data)
            setCritiqueItems(response.data.data)
            // document.getElementById(response.data.data.critique_id).hidden=true
            // console.log(response.data.data[0])
            
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
        document.getElementById(`reply${id}`).value=''
    }

    const loadMore = async() =>{
        let formData = new FormData;
        formData.append('post_id', id);
        formData.append('last_id', lastId);
        // console.log(lastId)
        // console.log(critiqueItems)

        axios.post(`${API_URL}/api/display_all_critiques`, formData, config)
        .then((response) =>{
            console.log(response.data.length)
            // this.setState((prevState) => [...prevState, urls])
            response.data.data.map((item)=>{
                setCritiqueItems((prevState) => [...prevState, item])
            })

            if(response.data.data.length < 5){
                document.getElementById('loadMore').hidden=true;
            }
            

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

    const giveStar = (crit_id) =>{
        let formData = new FormData;
        formData.append('critique_id', crit_id);
        formData.append('post_id', id)
        
        axios.post(`${API_URL}/api/star_critique`, formData, config)
        .then((response) =>{
            // console.log(response.data)
            document.getElementById(`star${crit_id}`).innerHTML=response.data.stars;
        }).catch((error) =>{
            console.log(error)
            if(error.response.data.status === "Account Muted"){
                toastIdRef.current = toast({ title: 'Account Muted!', status: 'error', duration: 3000, isClosable: false })
            }
        })
    }

    // function changeImage() {
    //     document.getElementById("changeStarClicked").src = changeIcon2;
    // }

    return (
        <div>
            <Box display='flex' flexDir={{lg: 'row', base: 'column'}}>
                        <Image src={CritiqueTitle} w='25vh' h='5vh' />
                        <Spacer />
                        <Flex w={{lg: '15vw', sm: '50%'}} mt={1}>
                        <Text fontFamily={'Raleway'} mr={{lg: 1, sm: 1}} w={28} my={{lg: 2, base: 5}}>Sort by:</Text>
                        <Select my={{lg: 0, base: 5}} borderColor={useColorModeValue('black', 'white')} fontFamily={'Raleway'} onChange={(e)=>sortCritique(e.target.value)}>
                            <option value='desc'>Newest</option>
                            <option value='asc'>Oldest</option>
                            <option value='most_stars'>Most Stars</option>
                            {/* <option value='most_interacted'>Most Interacted</option> */}
                        </Select>
                        </Flex>
            </Box>


            <Box overflowY="auto" h={{'2xl': '80vh', xl: '75vh', lg: '70vh', sm: '70vh', base: '70vh'}} css={{
                    '&::-webkit-scrollbar': {
                    width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                    width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                    background: '#212121',
                    borderRadius: '24px',
                    },
                }} mt={5}>
            {loading ? <Box fontFamily={"Raleway"}>Loading...</Box> :
             critiqueItems.length != 0 ?
                critiqueItems.map((critique, i) => { 
                    if(critique.display_name === display_name){
                    return(
                        <Box key={i}>
                        <Box p="2" overflowY="auto" w={{lg: '35vw', sm: '100%'}} mt={5} position='static' >
                                <Flex>
                                    <Image src={critique.profile_photo} w='3vh' h='3vh' mt={2} />
                                    <Link href={`/profile/${critique.display_name}`} passHref>
                                        <Heading fontFamily={'Raleway'} size='md' ml={3} mt={2} _hover={{cursor: 'pointer'}}>{critique.display_name}</Heading>
                                    </Link>
                                    {Number(critique.reputation_points) >= 10 ? <Image src={changeBadgeIcon} alt="Badge" w="25px" h="25px" ml={3} mt={2} /> : null}
                                    {critique.starred_by_author == '1' ? <><Image src={critique.author_photo} alt="Reputation Stars" w="20px" h="20px" ml={3} mt={2} rounded="full"/><Image src='/reputation-stars.png' alt="Reputation Stars"  w="15px" h="15px" ml={3} mt={2} /></> : null}
                                    <Spacer />
                                    <Text fontFamily={'Raleway'} color="gray.400" fontSize='sm' mt={2}>{critique.time_ago}</Text>

                                    <Menu>
                                        <MenuButton
                                        px={4}
                                        py={2}
                                        transition='all 0.2s'
                                        >
                                        <ChevronDownIcon />
                                        </MenuButton>
                                        <MenuList p={3}>
                                        {critique.is_edited == 1 ?  
                                        <MenuGroup>
                                            <MenuItem fontFamily={'Raleway'}><EditCritiqueHistory id={critique.critique_id} /></MenuItem>
                                        </MenuGroup> : null}
                                        <MenuDivider /> 
                                        <MenuGroup>
                                            <MenuItem fontFamily={'Raleway'}><EditCritique data={critique} /></MenuItem>
                                        </MenuGroup>
                                        <MenuDivider />
                                        <MenuGroup>
                                            <MenuItem fontFamily={'Raleway'}><DeleteCritique id={critique.critique_id} /></MenuItem>
                                        </MenuGroup>
                                        </MenuList>
                                    </Menu>
                                </Flex>
                                <Box w='100%' mt={1}>
                                    <Text fontFamily={'Raleway'} textAlign={'justify'} fontSize='md'>{critique.body}</Text>
                                </Box>
                                <Flex w='20vw'>
                                    <Button fontFamily={'Raleway'} variant='ghost' onClick={()=>giveStar(critique.critique_id)}><Image src={changeIcon} alt="Stars" w="25px" h="25px" ml={2} mr={2} id="changeStarClicked"/> <Text id={`star${critique.critique_id}`}>{critique.stars}</Text></Button>
                                    <Button fontFamily={'Raleway'} variant='ghost' ml={5} onClick={()=>openReply(critique.critique_id)}>Reply</Button>
                                    {critique.is_edited == 1 ? <Text fontFamily={'Raleway'} color="gray.400" mt={3} fontSize="sm">(Edited)</Text> : null}
                                </Flex>
                        </Box>
                        <Box p="2" w='35vw' mt={1} id={critique.critique_id} hidden>
                        <form onSubmit={(e)=>submitReply(critique.critique_id, e)}>
                            <Textarea borderColor={TextareaBorderColor} fontFamily={'Raleway'} w="full" id={`reply${critique.critique_id}`} onChange={(e) => handleChange(e, critique.critique_id)}/>
                            <Flex>
                                <Button fontFamily={'Raleway'} mt={3} type="submit">Reply</Button>
                                <Button fontFamily={'Raleway'} mt={3} ml={3} onClick={ () => cancelReply(critique.critique_id)}>Cancel</Button>
                            </Flex>
                        </form>
                        </Box>
                        <CritiqueReply id={critique.critique_id} newReply={newReply} post_id={id} />
                        </Box>
                )
                }

                return(
                        <Box key={i}>
                        <Box p="2" overflow-y="auto" w={{lg: '35vw', sm: '100%'}} mt={5} position='static' >
                                <Flex>
                                    <Image src={critique.profile_photo} w='3vh' h='3vh' mt={2} />
                                    <Link href={`/profile/${critique.display_name}`} passHref>
                                        <Heading fontFamily={'Raleway'} size='md' ml={3} mt={2} _hover={{cursor: 'pointer'}}>{critique.display_name}</Heading>
                                    </Link>
                                    {Number(critique.reputation_points) >= 10 ? <Image src={changeBadgeIcon} alt="Badge" w="25px" h="25px" ml={3} mt={2} /> : null}
                                    {critique.starred_by_author == '1' ? <><Image src={critique.author_photo} alt="Reputation Stars"  w="20px" h="20px" ml={3} mt={2} rounded="full" /><Image src='/reputation-stars.png' alt="Reputation Stars"  w="15px" h="15px" ml={3} mt={2} /></> : null}
                                    <Spacer />
                                    <Text fontFamily={'Raleway'} color="gray.400" fontSize='sm' mt={2}>{critique.time_ago}</Text>
                                    
                                    <Menu>
                                        <MenuButton
                                        px={4}
                                        py={2}
                                        transition='all 0.2s'
                                        >
                                        <ChevronDownIcon />
                                        </MenuButton>
                                        <MenuList p={3}>
                                        {critique.is_edited == 1 ? 
                                        <MenuGroup>
                                            <MenuItem fontFamily={'Raleway'}><EditCritiqueHistory id={critique.critique_id} /></MenuItem>
                                        </MenuGroup> : null}
                                        <MenuDivider />
                                        <MenuGroup>
                                            <MenuItem fontFamily={'Raleway'}><ReportCritique id={critique.critique_id} /></MenuItem>
                                        </MenuGroup> 
                                        </MenuList>
                                    </Menu> 
                                </Flex>
                                <Box w='100%' mt={1}>
                                    <Text fontFamily={'Raleway'} textAlign={'justify'} fontSize='md'>{critique.body}</Text>
                                </Box>
                                <Flex w='30vw'>
                                    <Button fontFamily={'Raleway'} variant='ghost' w={{lg: "5em", base: "100px"}} onClick={()=>giveStar(critique.critique_id)}><Image src={changeIcon} alt="Stars" w="25px" h="25px" ml={2} mr={2} id="changeStarClicked"/><Text id={`star${critique.critique_id}`}>{critique.stars}</Text></Button>
                                    <Button fontFamily={'Raleway'} variant='ghost' ml={5} onClick={()=>openReply(critique.critique_id)}>Reply</Button>
                                    {critique.is_edited == 1 ? <Text fontFamily={'Raleway'} color="gray.400" mt={3} fontSize="sm">(Edited)</Text> : null}
                            </Flex>
                    </Box>
                    <Box p="2" w='35vw' mt={1} id={critique.critique_id} hidden>
                        <form onSubmit={(e)=>submitReply(critique.critique_id, e)}>
                            <Textarea fontFamily={'Raleway'} w="full" id={`reply${critique.critique_id}`} onChange={(e) => handleChange(e, critique.critique_id)}/>
                            <Flex>
                                <Button fontFamily={'Raleway'} mt={3} type='submit'>Reply</Button>
                                <Button fontFamily={'Raleway'} mt={3} ml={3} onClick={ () => cancelReply(critique.critique_id)}>Cancel</Button>
                            </Flex>
                        </form>
                    </Box>
                    {/* {console.log(critique.critique_id)} */}
                    <CritiqueReply id={critique.critique_id} newReply={newReply} post_id={id} />
                    </Box>
                )
                })
            : <Center><Image src={beCritique} w='350px' h='30px' disabled/></Center>
            
            }
            {/* { critiqueItems.length != 0 ? 
                <Center>
                    <Button variant='ghost' w="100%" onClick={loadMore} id='loadMore'>Load More</Button>
                </Center>
            : null } */}
            

            </Box>

        </div>
    )
}
