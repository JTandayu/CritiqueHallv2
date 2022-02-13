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
    Box
  } from "@chakra-ui/react"
import { useDisclosure, useColorModeValue, Spacer } from '@chakra-ui/react'
import { Input,Button } from '@chakra-ui/react'
import styles from "@styles/Hall.module.css";
import axios from 'axios'
import {useState, useEffect} from 'react' 
import {useCookies} from 'react-cookie'
import { useRouter } from 'next/router';
import { useToast } from "@chakra-ui/react";
import { getCookie } from 'cookies-next'

const EditCritique = ({data}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { API_URL } = process.env
    const { API_KEY } = process.env
    const [critique, setCritique] = useState(data.body)
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

    // useEffect(() => {
        
    // }, [])

    const editCritiqueItem = () => {
        let formData = new FormData;
        formData.append('critique_id', data.critique_id)
        formData.append('body', critique)
        
        axios.post(`${API_URL}/api/update_critique`, formData, config)
        .then((response) => {
            console.log(response.data)
            onClose()
            router.reload()
          }).catch((error)=>{
            console.log(error.response)
            if(error.response.data.status === "Account Muted"){
                toastIdRef.current = toast({ title: 'Account Muted!', status: 'error', duration: 3000, isClosable: false })
            }
        })
    }

    return (
        <>
            <Box onClick={onOpen} width='100%' justifyContent="flex-start" _hover={{bgColor: "none", cursor: "pointer"}}>Edit</Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                    <ModalContent maxW="40rem" h='40vh'>
                    <ModalHeader fontFamily={'Raleway'}>Edit Critique</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Textarea fontFamily={'Raleway'} borderColor={useColorModeValue('black', 'white')} w='100%' h='70%' value={critique} onChange={(e)=>setCritique(e.target.value)} mb={5}></Textarea>
                        <Button fontFamily={'Raleway'} bgColor={useColorModeValue('#2777C1','#0085FF')} color={useColorModeValue('#FFFFFF', '#FFFFFF')} _hover={{bgColor: useColorModeValue('#56AEFF', '#0B5090')}} onClick={editCritiqueItem} mr={3}>Save</Button>
                        <Button fontFamily={'Raleway'} bgColor={useColorModeValue('#C1272D', '#9E0B0F')} color={useColorModeValue('white', 'white')} _hover={{bgColor: useColorModeValue('#FF000A', '#470507')}} onClick={onClose}>Cancel</Button>
                        
                    </ModalBody>
                </ModalContent>
            </Modal>
            
        </>
    )
}

export default EditCritique
