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
import { Box } from '@chakra-ui/react'
import { useState } from 'react';
import { Divider, Center } from "@chakra-ui/react";


export async function getServerSideProps(){
    const { API_URL } = process.env
    const { API_KEY } = process.env

    const res = await fetch(`${API_URL}/api/edit_post`)
    const data = await res.json()

    return {
        props: {
            data
        }
    }

}

function EditPost(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { API_URL } = process.env
    const { API_KEY } = process.env

    const [title, setTitle] = useState('')
    const [description, setPassword] = useState('')



    // const submitLogin = async () =>{
    //   const response =  await fetch(`${API_URL}/api/edit_post`,  {
    //     method: 'POST',
    //     body: JSON.stringify({title, description}),
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'X-API-KEY': `${API_KEY}`
    //     },
    //   })
    //   const data = await response.json()
    //   console.log(data)
    // }

    return(
        <>
        <button onClick={onOpen}>Edit</button>


        <form action='' method='POST'>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent maxW="60rem">
                <ModalHeader>Create Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Hey
                    <Button variant='ghost'>Save</Button>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Cancel
                    </Button>
                    <Center height='50vh' >
                        <Divider orientation='vertical' borderColor='black'/>
                    </Center>
                </ModalBody>
                {/* <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                    </Button>
                </ModalFooter> */}
            </ModalContent>
        </Modal>
        </form>
        </>
    )
}

export default EditPost