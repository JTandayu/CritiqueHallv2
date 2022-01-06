import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormLabel,
    Flex,
    Spacer,
    Heading,
    Textarea,
  } from "@chakra-ui/react"
import { useDisclosure } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import styles from "@styles/Hall.module.css";
import { Box } from '@chakra-ui/react'
import { useState } from 'react';
import { Divider, Center } from "@chakra-ui/react";
import { Input } from '@chakra-ui/react'
import { Label } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { storage } from '../../../firebase.js'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'



const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
})


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


        <form action=" " method="POST">
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent maxW="60rem">
                <ModalHeader>Edit Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Flex mb={5}>
                    <Box w='24vw'>
                    <Flex mt='3vh'>
                        <FormLabel>Title</FormLabel>
                        <Input type='text' w='20vw' ml='11px' bg='white' color='black'  />
                    </Flex>

                    <FormLabel mt={2}>Description</FormLabel>
                    <Textarea type='text' w='23vw' h='20vh' color='black' bg='white' />
                    

                    <Center mt={10}>
                        <Button type="submit" colorScheme='blue' mr={2}>
                            Submit
                        </Button>

                        <Button variant='ghost' mr={2} onClick={onClose}>
                            Cancel
                        </Button>
                    </Center>

                    </Box>
                    

                    <Center height='50vh' >
                        <Divider orientation='vertical' borderColor='black'/>
                    </Center>
                

                    <Box ml='2vw' w='20vw' p={5}>
                        <Flex>
                            <Heading size='sm'>Attachments</Heading>
                            <Button bg='blue.400' color='white' ml={5} h='2em'>upload</Button>
                        </Flex>
                        <Flex bg='white' w='19vw' h='5vh' rounded='md' overflowX='auto' mt={3}>

                        </Flex>

                        <Heading size='sm' mt={5}>Attachments Preview</Heading>
                        <Flex bg='white' w='19vw' h='20vh' rounded='md' overflowX='auto' mt={3}>
                            
                        </Flex>
                    </Box>

                    </Flex >
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