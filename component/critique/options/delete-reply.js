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
    Box
  } from "@chakra-ui/react"
import { useDisclosure } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import styles from "@styles/Hall.module.css";
import {useCookies} from 'react-cookie'
import axios from 'axios';
import { useRouter } from 'next/router';

const DeleteReply = ({id}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { API_URL } = process.env
    const { API_KEY } = process.env
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'id', 'encrypted_id']);
    const router = useRouter()


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
    
    const deleteReply = async () =>{
        axios.delete(`${API_URL}/api/delete_reply/${id}`, config)
        .then((response) => {
          console.log(response.data)
          onClose()
          router.reload()
        }).catch((error)=>{
          console.log(error)
        })
      }

    return (
        <>
            <Box onClick={onOpen} width='100%' justifyContent="flex-start" _hover={{bgColor: "none", cursor: "pointer"}}>Delete</Box>
          
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
            
        </>
    )
}

export default DeleteReply

