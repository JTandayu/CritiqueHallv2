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
import axios from 'axios';
import { useRouter } from 'next/router';

const DeleteCritique = ({id}) => {
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

    const deleteCritiqueItem = async () =>{
        axios.delete(`${API_URL}/api/delete_critique/${id}`, config)
        .then((response) => {
          console.log(response.data)
          onClose()
          router.reload();
        }).catch((error)=>{
          console.log(error)
        })
    }

    return (
        <>
            <button onClick={onOpen} width='10vw'>Delete</button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                    <ModalContent maxW="40rem" h='40vh'>
                    <ModalHeader>Delete Critique</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to delete?
                        <Flex>
                            <Button onClick={deleteCritiqueItem}>Yes</Button>
                            <Button onClick={onClose}>No</Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>

            
        </>
    )
}

export default DeleteCritique

