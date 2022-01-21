import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Flex,
  } from "@chakra-ui/react"
import { useDisclosure } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import styles from "@styles/Hall.module.css";
import {useCookies} from 'react-cookie'

const deleteReply = ({id}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { API_URL } = process.env
    const { API_KEY } = process.env
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
    
    const deleteReply = async () =>{
        axios.get(`${API_URL}api/delete_reply/${id}`, config)
        .then((response) => {
          console.log(response.data)
          onClose
        }).catch((error)=>{
          console.log(error)
        })
      }

    return (
        <>
            <form action='' method='POST'>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                    <ModalContent maxW="40rem" h='40vh'>
                    <ModalHeader>Delete Reply</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to delete?
                        <Flex>
                            <Button onClick={deleteReply}>Yes</Button>
                            <Button onClick={onClose}>No</Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
            </form>
            
        </>
    )
}

export default deleteReply

