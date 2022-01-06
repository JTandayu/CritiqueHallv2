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
import { storage } from '../../../firebase.js'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

function DeletePost(){


    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState(''); 

    const formHandler = (e) =>{
      e.preventDefault();
      const file = e.target[0].files[0];
      // console.log(file)
      uploadFiles(file); 
    }

    const uploadFiles = (file) => {
      // console.log(storage)

      if (!file) return;
      const storageRef = ref(storage, `/files/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on("state_changed", (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        setProgress(prog);
      }, (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then(url => console.log(url))
      }
      );

    }
    
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