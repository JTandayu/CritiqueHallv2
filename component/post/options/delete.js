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

function DeletePost(){
    <>
    <button onClick={onOpen} className={styles.cpbutton}>Create Post</button>


    <form action='' method='POST'>
    <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
            <ModalContent maxW="60rem">
            <ModalHeader>Delete Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                Are you Sure?
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
                </Button>
                <Button variant='ghost'>Delete</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    </form>
    </>
}

export default DeletePost