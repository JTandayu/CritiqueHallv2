import Head from 'next/head'
import Image from 'next/image'
import { css, cx } from '@emotion/react'
import { motion } from "framer-motion"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react"
import { Divider } from '@chakra-ui/react'


function EditProfile(){

    return(
        <>

        <button onClick={onOpen}>Edit Profile</button>


        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent>
                <ModalHeader>Edit Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Hello
                    <Divider />
                    Hi
                    <Divider />
                    Good Morning
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                    </Button>
                    <Button variant='ghost'>Save</Button>
                </ModalFooter>
            </ModalContent>
            </Modal>
        
        </>
    )


}

export default EditProfile