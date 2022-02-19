import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Box,
    Center,
    Spacer
  } from "@chakra-ui/react"
import { useDisclosure, useColorModeValue } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import styles from "@styles/Hall.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from 'cookies-next'

// export async function getStaticProps(context) {
//     const res = await fetch(`https://...`)
//     const history = await res.json()


//     return {
//       props: { history }, // will be passed to the page component as props
//     }
// } 
  

function EditHistory({id}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { API_URL } = process.env
    const { API_KEY } = process.env

    const token = getCookie('token')
    const user_id = getCookie('encrypted_id')

    const [data, setData] = useState([])

    const changeTextColor = useColorModeValue('black', 'white')

    const config = {
        headers: {
        'content-type': 'multipart/form-data',
        'X-API-KEY': `${API_KEY}`,
        'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
        'Accept': 'application/json',
        'Token': token,
        'User-Id': user_id
        }
      }

    useEffect(() => {
        let formData = new FormData;
        formData.append('post_id', id)
        formData.append('last_id', null)

        axios.get(`${API_URL}/api/version_post/${id}`,  config)
        .then((response)=>{
            console.log(response.data.data)
            setData(response.data.data)
        }).catch((error)=>console.log(error.response))
    }, [id]);


    return(
        <>
        <button onClick={onOpen} ml={5}>Edit History</button>

        <form action='' method='POST'>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent maxW="40rem" h='40vh' overflowY="auto" css={{
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
                        }}>
                <ModalHeader fontFamily={'Raleway'}>Edit History</ModalHeader>
                <ModalCloseButton />
                <ModalBody fontFamily={'Raleway'}>
                <Box w="full" h='40vh' overflowY="auto" css={{
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
                        }}>
                {data != undefined ? 
                [data.length != 0 ?
                        data.map((history, i) => 
                            <Box key={i} w="full">
                                <Center display="flex" flexDir="column">
                                    <Box display="flex" flexDir="row" w="70%" mb={3}>
                                        <Text fontFamily={'Raleway'}>{history.created_at}</Text>
                                        <Spacer />
                                        <Text fontFamily={'Raleway'}>{history.time_ago}</Text>
                                    </Box>
                                    <Text fontFamily={'Raleway'} w="70%">{history.title}</Text>
                                    <Text fontFamily={'Raleway'} w="70%">{history.body}</Text>
                                </Center>
                            </Box>
                        )
                    : <Text fontFamily={'Raleway'} color={changeTextColor}>There is nothing in here...</Text>]
                : null}
                </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
        </form>
        
        
        </>
    )

}

export default EditHistory