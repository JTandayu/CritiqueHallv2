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

const deleteCritique = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { API_URL } = process.env
    const { API_KEY } = process.env

    const deleteCritiqueItem = async () =>{

    }

    return (
        <>
            <form action='' method='POST'>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                    <ModalContent maxW="40rem" h='40vh'>
                    <ModalHeader>Delete Critique</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to delete?
                        <Flex>
                            <Button>Yes</Button>
                            <Button onClick={onClose}>No</Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
            </form>
            
        </>
    )
}

export default deleteCritique

