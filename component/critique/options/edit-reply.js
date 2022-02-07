import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Textarea,
  } from "@chakra-ui/react"
import { useDisclosure, useColorModeValue } from '@chakra-ui/react'
import { Input ,Button, Spacer } from '@chakra-ui/react'
import styles from "@styles/Hall.module.css";
import axios from 'axios'
import {useState, useEffect} from 'react' 
import {useCookies} from 'react-cookie'

const EditReply = ({data}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { API_URL } = process.env
    const { API_KEY } = process.env
    const [reply, setReply] = useState(data.body)
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'id', 'encrypted_id']);

    const config = {
        headers: {
        'content-type': 'multipart/form-data',
        'X-API-KEY': `${API_KEY}`,
        'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
        'Accept': 'application/json',
        'Token': cookies.token,
        'User-Id': cookies.encrypted_id
        }
      }

    useEffect(() => {
        
    }, [])

    const editReply = () => {
        let formData = new FormData;
        formData.append('reply_id', data.reply_id)
        formData.append('body', reply)

        axios.post(`${API_URL}/api/update_reply`, formData, config)
        .then((response) => {
            console.log(response.data)
            onClose()
          }).catch((error)=>{
            console.log(error.response)
        })
    }

    return (
        <>
            <button onClick={onOpen} width='10vw'>Edit</button>

            <form action='' method='POST'>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                    <ModalContent maxW="40rem" h='40vh'>
                    <ModalHeader fontFamily={'Raleway'}>Edit Reply</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Textarea borderColor={useColorModeValue('black', 'white')} fontFamily={'Raleway'} w='100%' h='70%' value={reply} onChange={(e)=>setReply(e.target.value)} mb={5}></Textarea>
                        <Button fontFamily={'Raleway'} bgColor={useColorModeValue('#2777C1','#0085FF')} color={useColorModeValue('#FFFFFF', '#FFFFFF')} _hover={{bgColor: useColorModeValue('#56AEFF', '#0B5090')}} mr={3} onClick={editReply}>Save</Button>
                        <Button fontFamily={'Raleway'} bgColor={useColorModeValue('#C1272D', '#9E0B0F')} color={useColorModeValue('white', 'white')} _hover={{bgColor: useColorModeValue('#FF000A', '#470507')}} onClick={onClose}>Cancel</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
            </form>
            
        </>
    )
}

export default EditReply
