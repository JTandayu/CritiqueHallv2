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
import { useDisclosure } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import styles from "@styles/Hall.module.css";
import { Box } from '@chakra-ui/react'
import { useState } from 'react';
import { storage } from '../../../firebase.js'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import axios from "axios";
import {useCookies} from 'react-cookie'
import { useRouter } from "next/router";

function DeletePost({id}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { API_URL } = process.env
    const { API_KEY } = process.env
    const router = useRouter();
    const toast = useToast()
    console.log


    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState(''); 
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'id', 'encrypted_id']);

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
      'Token': cookies.token,
      'User-Id': cookies.encrypted_id
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
        console.log(response.data)
        toast("Post successfully deleted!")
        onClose()
      })
      .then(()=>{
        router.push("/critique")
      }).catch((error)=>{
        console.log(error.response)
      })
    }


    return(
      <>
      <button onClick={onOpen}>Delete</button>


      <form action='' method='POST'>
      <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
              <ModalContent>
              <ModalHeader>Delete Post</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                  Are you Sure?
              </ModalBody>
              <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                  </Button>
                  <Button variant='ghost' onClick={deletePost}>Delete</Button>
              </ModalFooter>
          </ModalContent>
      </Modal>
      </form>
      </>
    )
}

export default DeletePost