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
import { useDisclosure, useColorModeValue } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import styles from "@styles/Hall.module.css";
import {useCookies} from 'react-cookie'
import axios from 'axios';
import { useRouter } from 'next/router';
import { useToast } from "@chakra-ui/react";

const DeleteCritique = ({id}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { API_URL } = process.env
    const { API_KEY } = process.env
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'id', 'encrypted_id']);
    const router = useRouter()
    const toast = useToast()
    const toastIdRef = React.useRef()

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
          if(error.response.data.status === "Account Muted"){
            toastIdRef.current = toast({ title: 'Account Muted!', status: 'error', duration: 3000, isClosable: false })
        }
        })
    }

    return (
        <>
            <Box onClick={onOpen} width='100%' justifyContent="flex-start" _hover={{bgColor: "none", cursor: "pointer"}}>Delete</Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                    <ModalContent maxW="40rem" h='20vh'>
                    <ModalHeader fontFamily={'Raleway'}>Delete Critique</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody fontFamily={'Raleway'}>
                        Are you sure you want to delete?
                        <Flex>
                            <Button fontFamily={'Raleway'} bgColor={useColorModeValue('#2777C1','#0085FF')} color={useColorModeValue('#FFFFFF', '#FFFFFF')} _hover={{bgColor: useColorModeValue('#56AEFF', '#0B5090')}} onClick={deleteCritiqueItem} mt={5} mr={3}>Yes</Button>
                            <Button fontFamily={'Raleway'} bgColor={useColorModeValue('#C1272D', '#9E0B0F')} color={useColorModeValue('white', 'white')} _hover={{bgColor: useColorModeValue('#FF000A', '#470507')}} onClick={onClose} mt={5}>No</Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>

            
        </>
    )
}

export default DeleteCritique

