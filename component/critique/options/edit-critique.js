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

const EditCritique = ({data}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { API_URL } = process.env
    const { API_KEY } = process.env
    const [critique, setCritique] = useState(data.body)
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
          }).catch((error)=>{
            console.log(error.response)
        })
    }

    return (
        <>
            <button onClick={onOpen} width='10vw'>Edit</button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                    <ModalContent maxW="40rem" h='40vh'>
                    <ModalHeader>Edit Critique</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Textarea w='100%' value={critique} onChange={(e)=>setCritique(e.target.value)}></Textarea>
                        <Button onClick={editCritiqueItem}>Save</Button>
                        <Button onClick={onClose}>Cancel</Button>
                        
                    </ModalBody>
                </ModalContent>
            </Modal>
            
        </>
    )
}

export default EditCritique
