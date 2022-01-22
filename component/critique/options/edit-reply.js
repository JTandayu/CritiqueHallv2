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
import { useDisclosure } from '@chakra-ui/react'
import { Input,Button } from '@chakra-ui/react'
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
        'token': cookies.token,
        'user_id': cookies.encrypted_id
        }
      }

    useEffect(() => {
        
    }, [])

    const editReply = () => {
        let formData = new FormData;
        formData.append('body', reply)

        axios.post(`${API_URL}api/update_reply`, formData, config)
        .then((response) => {
            console.log(response.data)
            onClose
          }).catch((error)=>{
            console.log(error)
        })
    }

    return (
        <>
            <button onClick={onOpen} width='10vw'>Edit</button>

            <form action='' method='POST'>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                    <ModalContent maxW="40rem" h='40vh'>
                    <ModalHeader>Edit Reply</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Textarea w='100%' value={reply} onChange={(e)=>setReply(e.target.value)}></Textarea>
                        <Button onClick={editReply}>Save</Button>
                        <Button onClick={onClose}>Cancel</Button>
                        
                    </ModalBody>
                </ModalContent>
            </Modal>
            </form>
            
        </>
    )
}

export default EditReply
