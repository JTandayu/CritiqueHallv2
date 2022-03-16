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
import { getCookie } from 'cookies-next'

const DeleteCritique = ({id}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { API_URL } = process.env
    const { API_KEY } = process.env
    // const [cookies] = useCookies();

    const token = getCookie('token')
    const user_id = getCookie('encrypted_id')

    const router = useRouter()
    const toast = useToast()
    const toastIdRef = React.useRef()

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

    const deleteCritiqueItem = async () =>{
        axios.delete(`${API_URL}/api/delete_critique/${id}`, config)
        .then((response) => {
        //   console.log(response)
          onClose()
          router.reload();
        }).catch((error)=>{
          console.log(error)
          if(typeof error.response === 'undefined'){
            toastIdRef.current = toast({ position: 'top', title: 'Undefined request. Please try again.', status: 'error', duration: 3000, isClosable: true })
          }
          else if(error.response.status == 500) {
            toastIdRef.current = toast({ position: 'top', title: 'Server error. Please try again later.', status: 'error', duration: 3000, isClosable: true })
          }
          else if(error.response.data.status === "Account Muted"){
            toastIdRef.current = toast({ title: 'Account Muted!', status: 'error', duration: 3000, isClosable: false })
        }
        })
    }

    return (
        <>
            <Box onClick={onOpen} width='100%' justifyContent="flex-start" _hover={{bgColor: "none", cursor: "pointer"}}>Delete</Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                    <ModalContent maxW="40rem" h='20vh' overflowY="auto" css={{
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

