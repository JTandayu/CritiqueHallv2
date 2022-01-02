import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormLabel,
    Flex,
    Spacer,
    Heading,
    Textarea,
  } from "@chakra-ui/react"
import { useDisclosure } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import styles from "@styles/Hall.module.css";
import { Box } from '@chakra-ui/react'
import { useState } from 'react';
import { Input } from '@chakra-ui/react'
import { Label } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { useCookies, cookies } from 'react-cookie'
import axios from 'axios'



const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
})


export async function getStaticProps(){
    const { API_URL } = process.env
    const { API_KEY } = process.env

    const res = await fetch(`${API_URL}/api/get_halls`, {
        method: 'GET',
        headers: {
            'content-type': 'multipart/form-data',
            'X-API-KEY': `${API_KEY}`,
            'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
            // 'Accept-Encoding': 'gzip, deflate, br',
            'Accept': 'application/json',
        }
    })

    const data = await res.json()
    console.log(data)

    return{
        props:{
            data: data.halls
        }
    }

}

function CreatePost({data}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { API_URL } = process.env
    const { API_KEY } = process.env

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [hall_id, setHallID] = useState('1')

    const [color, setColor] = useState('purple')
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'id', 'encrypted_id']);

    // const color = {
    //     if 
    // }



    const submitPost = async () =>{

        const token = cookies.token
        const id = cookies.id
        const enc_id =  cookies.encrypted_id

        const post = {
            title : title,
            body : description,
            hall_id: hall_id,
            token : token,
            user_id : id
        }

        let formData = new FormData(); 
        formData.append('title', title);
        formData.append('body', description);
        formData.append('hall_id', hall_id);
        formData.append('token', token);   //append the values with key, value pair
        formData.append('user_id', enc_id);

        // console.log(enc_id)

        const config = {
            headers: {
            'content-type': 'multipart/form-data',
            'X-API-KEY': `${API_KEY}`,
            'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
            // 'Accept-Encoding': 'gzip, deflate, br',
            'Accept': 'application/json',
            }
        }

        axios.post(`${API_URL}/api/create_post`, formData, config)
        .then(response => {
          console.log(response.data);
          window.location.href = "/critique"
        })
        .catch(error => {
            console.log(error);
            console.log(error.response)
            // window.location.href = "/login"
        });
    }

    return(
        <>
        <button onClick={onOpen} className={styles.cpbutton}>Create Post</button>


        <form action='' method='POST'>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent maxW="60rem">
                <ModalHeader>Create Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    <Flex mb={5} flexDir={{lg: 'row', sm: 'column'}}>
                    <Box w={{lg: '24vw', sm: '100%'}}>
                    <Flex mt='3vh'>
                        <FormLabel>Title</FormLabel>
                        <Input type='text' w={{lg: '20vw', sm: '100%'}} ml='11px' bg='white' color='black' onChange={e => setTitle(e.target.value)}  />
                    </Flex>

                    <FormLabel mt={2}>Description</FormLabel>
                    <Textarea type='text' w={{lg: '23vw', sm: '100%'}} h='20vh' color='black' bg='white' onChange={e => setDescription(e.target.value)} />
                    <Flex mt={5}>
                        <FormLabel mt={2}>Post This to: </FormLabel>
                        <Select w={{lg: '10vw', sm: '50vw'}} bg='light' onChange={e => setHallID(e.target.value)}>
                            <option value='1'>Technology</option>
                            <option value='2'>Business</option>
                            <option value='3'>Arts</option>
                            <option value='4'>Lounge</option>
                        </Select>
                    
                    </Flex>
                    

                    <Center mt={10}>
                        <Button type="submit" colorScheme='blue' mr={2} onClick={submitPost}>
                            Submit
                        </Button>

                        <Button type="submit" variant='ghost' mr={2} onClick={onClose}>
                            Cancel
                        </Button>
                    </Center>

                    </Box>
                    

                    <Center height='50vh' display={{lg: 'block', sm: 'none'}}>
                        <Divider orientation='vertical' borderColor='black'/>
                    </Center>

                    <Divider display={{lg: 'none', sm: 'block'}} my={5} borderColor='black'/>
                

                    <Box ml='2vw' w={{lg: '20vw', sm: '100%'}} p={5}>
                        <Flex>
                            <Heading size='sm'>Attachments</Heading>
                            <Button bg='blue.400' color='white' ml={5} h='2em'>upload</Button>
                        </Flex>
                        <Flex bg='white' w={{lg: '19vw', sm: '100%'}} h='5vh' rounded='md' overflowX='auto' mt={3}>

                        </Flex>

                        <Heading size='sm' mt={5}>Attachments Preview</Heading>
                        <Flex bg='white' w={{lg: '19vw', sm: '100%'}} h='20vh' rounded='md' overflowX='auto' mt={3}>
                            
                        </Flex>
                    </Box>

                    </Flex >
                    {/* <Button variant='ghost'>Post</Button>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Cancel
                    </Button> */}
                </ModalBody>
                {/* <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                    </Button>
                </ModalFooter> */}
            </ModalContent>
        </Modal>
        </form>
        
        
        </>
    )

}

export default CreatePost