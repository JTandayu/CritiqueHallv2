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
    Spacer,
    useColorModeValue
  } from "@chakra-ui/react"
import { useDisclosure } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import styles from "@styles/Hall.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {useCookies} from 'react-cookie'
import { getCookie } from 'cookies-next'

// export async function getStaticProps(context) {
//     const res = await fetch(`https://...`)
//     const history = await res.json()


//     return {
//       props: { history }, // will be passed to the page component as props
//     }
// } 
  

function EditReplyHistory({id}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { API_URL } = process.env
    const { API_KEY } = process.env
    // const [cookies] = useCookies();

    const changeTextColor = useColorModeValue('black', 'white')

    const token = getCookie('token')
    const user_id = getCookie('encrypted_id')

    const [data, setData] = useState([])

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
        formData.append('reply_id', id)
        formData.append('last_id', null)

        axios.get(`${API_URL}/api/version_reply/${id}`,  config)
        .then((response)=>{
            console.log(response)
            setData(response.data.data)
        }).catch((error)=>console.log(error.response))
    }, []);
    

    return(
        <>
       <Box onClick={onOpen} width='100%' justifyContent="flex-start" _hover={{bgColor: "none", cursor: "pointer"}}>Edit History</Box>

        
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                    <ModalContent maxW="40rem" h='40vh'>
                    <ModalHeader fontFamily={'Raleway'}>Edit History</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody> 
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
                        {data.length != 0 ?
                            data.map((history, i) => 
                                <Box key={i} w="full">
                                    <Center display="flex" flexDir="column">
                                        <Box display="flex" flexDir="row" w="70%" mb={3}>
                                            <Text fontFamily={'Raleway'}>{history.created_at}</Text>
                                            <Spacer />
                                            <Text fontFamily={'Raleway'}>{history.time_ago}</Text>
                                        </Box>
                                        <Text fontFamily={'Raleway'} textAlign={'justify'} w="70%">{history.body}</Text>
                                    </Center>
                                </Box>
                            )
                        : <Text fontFamily={'Raleway'} color={changeTextColor}>There is nothing in here...</Text>}
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        
        
        </>
    )

}

export default EditReplyHistory