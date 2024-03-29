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
import { useDisclosure, useColorModeValue } from '@chakra-ui/react'
import { Input ,Button, Spacer } from '@chakra-ui/react'
import styles from "@styles/Hall.module.css";
import axios from 'axios'
import {useState, useEffect} from 'react' 
import {useCookies} from 'react-cookie'
import { useRouter } from 'next/router';
import { useToast } from "@chakra-ui/react";
import { getCookie } from 'cookies-next'

const EditReply = ({data}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { API_URL } = process.env
    const { API_KEY } = process.env
    const [reply, setReply] = useState(data.body)
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

    useEffect(() => {
        
    }, [])

    const editReply = () => {

        if (reply == ''){
            toastIdRef.current = toast({ position: 'top', title: 'Reply is required.', status: 'error', duration: 3000, isClosable: true })
            return;
        }else{
        let formData = new FormData;
        formData.append('reply_id', data.reply_id)
        formData.append('body', reply)

        axios.post(`${API_URL}/api/update_reply`, formData, config)
        .then((response) => {
            // console.log(response)
            onClose()
            router.reload()
          }).catch((error)=>{
            console.log(error)
            if(typeof error.response === 'undefined'){
                toastIdRef.current = toast({ position: 'top', title: 'Undefined request. Please try again.', status: 'error', duration: 3000, isClosable: true })
              }
            else if(error.response.status == 500) {
                toastIdRef.current = toast({ position: 'top', title: 'Server error. Please try again later.', status: 'error', duration: 3000, isClosable: true })
            }
            else if(error.response.data.status === "Account Muted"){
                toastIdRef.current = toast({ position: 'top', title: 'Account muted!', status: 'error', duration: 3000, isClosable: true })
            }
        })}
    }

    const cancelEdit = () =>{
        setReply(data.body)
        onClose()
    }

    return (
        <>
            <Box onClick={onOpen} width='100%' justifyContent="flex-start" _hover={{bgColor: "none", cursor: "pointer"}}>Edit</Box>

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
                    <ModalHeader fontFamily={'Raleway'}>Edit Reply</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Textarea borderColor={useColorModeValue('black', 'white')} fontFamily={'Raleway'} w='100%' h='70%' value={reply} onChange={(e)=>setReply(e.target.value)} mb={5}></Textarea>
                        <Button fontFamily={'Raleway'} bgColor={useColorModeValue('#2777C1','#0085FF')} color={useColorModeValue('#FFFFFF', '#FFFFFF')} _hover={{bgColor: useColorModeValue('#56AEFF', '#0B5090')}} mr={3} onClick={editReply}>Save</Button>
                        <Button fontFamily={'Raleway'} bgColor={useColorModeValue('#C1272D', '#9E0B0F')} color={useColorModeValue('white', 'white')} _hover={{bgColor: useColorModeValue('#FF000A', '#470507')}} onClick={cancelEdit}>Cancel</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
            
        </>
    )
}

export default EditReply
