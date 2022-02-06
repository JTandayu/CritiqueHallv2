import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react"
import { useDisclosure } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import styles from "@styles/Hall.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {useCookies} from 'react-cookie'

// export async function getStaticProps(context) {
//     const res = await fetch(`https://...`)
//     const history = await res.json()


//     return {
//       props: { history }, // will be passed to the page component as props
//     }
// } 
  

function EditReplyHistory({id}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { API_URL } = process.env
    const { API_KEY } = process.env
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'id', 'encrypted_id']);
    const [data, setData] = useState([])

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
        let formData = new FormData;
        formData.append('reply_id', id)
        formData.append('last_id', null)

        axios.get(`${API_URL}/api/version_reply/${id}`,  config)
        .then((response)=>{
            console.log(response)
        }).catch((error)=>console.log(error.response))
    }, []);
    

    return(
        <>
        <button onClick={onOpen} ml={5}>Edit History</button>

        
        <form action='' method='POST'>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                    <ModalContent maxW="40rem" h='40vh'>
                    <ModalHeader>Edit History</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Hello
                    </ModalBody>
                </ModalContent>
            </Modal>
        </form>
        
        
        </>
    )

}

export default EditReplyHistory