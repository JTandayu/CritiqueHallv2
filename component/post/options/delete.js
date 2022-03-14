import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast,
  } from "@chakra-ui/react"
import { useDisclosure, useColorModeValue } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import styles from "@styles/Hall.module.css";
import { Box } from '@chakra-ui/react'
import { useState } from 'react';
import { storage } from '../../../firebase.js'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import axios from "axios";
import {useCookies} from 'react-cookie'
import { useRouter } from "next/router";
import React from 'react';
import { getCookie } from 'cookies-next'

function DeletePost({id}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { API_URL } = process.env
    const { API_KEY } = process.env
    const router = useRouter();
    const toast = useToast()
    const toastIdRef = React.useRef()
    console.log


    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState(''); 
    // const [cookies] = useCookies([]);
    const token = getCookie('token')
    const user_id = getCookie('encrypted_id')

    const formHandler = (e) =>{
      e.preventDefault();
      const file = e.target[0].files[0];
      // console.log(file)
      uploadFiles(file); 
    }

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

    const deletePost = async () =>{
      axios.delete(`${API_URL}/api/delete_post/${id}`, config)
      .then((response) => {
        // console.log(response.data)
        toastIdRef.current = toast({ position: 'top', title: 'Post deleted successfully!', status: 'success', duration: 3000, isClosable: false })
        onClose()
      })
      .then(()=>{
        router.push("/critique")
      }).catch((error)=>{
        if(typeof error.response === 'undefined'){
          toastIdRef.current = toast({ position: 'top', title: 'Server error. Please try again later.', status: 'error', duration: 3000, isClosable: true })
        }
        else if(error.response.data.status === "Account Muted"){
          toastIdRef.current = toast({ position: 'top', title: 'Account muted!', status: 'error', duration: 3000, isClosable: false })
        }
        // toastIdRef.current = toast({ title: 'Delete post unsuccessful!', status: 'error', duration: 3000, isClosable: false })
        console.log(error)
      })
    }


    return(
      <>
      <Box onClick={onOpen} width='100%' justifyContent="flex-start" _hover={{bgColor: "none", cursor: "pointer"}}>Delete</Box>


      <form action='' method='POST'>
      <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
              <ModalContent>
              <ModalHeader fontFamily={'Raleway'}>Delete Post</ModalHeader>
              <ModalCloseButton />
              <ModalBody fontFamily={'Raleway'}>
                  Are you sure?
              </ModalBody>
              <ModalFooter>
                  <Button fontFamily={'Raleway'} bgColor={useColorModeValue('#2777C1','#0085FF')} color={useColorModeValue('#FFFFFF', '#FFFFFF')} _hover={{bgColor: useColorModeValue('#56AEFF', '#0B5090')}} colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                  </Button>
                  <Button fontFamily={'Raleway'} bgColor={useColorModeValue('#C1272D', '#9E0B0F')} color={useColorModeValue('white', 'white')} _hover={{bgColor: useColorModeValue('#FF000A', '#470507')}} variant='ghost' onClick={deletePost}>Delete</Button>
              </ModalFooter>
          </ModalContent>
      </Modal>
      </form>
      </>
    )
}

export default DeletePost