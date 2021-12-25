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
import { Input } from '@chakra-ui/react'
import { Label } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'

  

function CreatePost() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { API_URL } = process.env
    const { API_KEY } = process.env

    const [title, setTitle] = useState('')
    const [description, setPassword] = useState('')

    // const submitLogin = async () =>{
    //   const response =  await fetch(`${API_URL}/api/create_post`,  {
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
        <button onClick={onOpen} className={styles.cpbutton}>Create Post</button>


        <form action='' method='POST'>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent maxW="60rem">
                <ModalHeader>Create Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    <Flex mb={5}>
                    <Box w='24vw'>
                    <FormLabel>Title</FormLabel>
                    <Input type='text' w='23vw' bg='white' />

                    <FormLabel mt={2}>Description</FormLabel>
                    <Textarea type='text' w='23vw' h='20vh' color='black' bg='white' />

                    <FormLabel mt={2}>File Upload</FormLabel>

                    <input type='file' w='5vw' border='none' mt='2'  />

                    <Center mt={5}>
                        <Button type="submit" colorScheme='blue' mr={2}>
                            Submit
                        </Button>

                        <Button type="submit" variant='ghost' mr={2} onClick={onClose}>
                            Cancel
                        </Button>
                    </Center>

                    </Box>
                    

                    <Center height='50vh' >
                        <Divider orientation='vertical' borderColor='black'/>
                    </Center>
                

                    <Box ml='2vw' w='19vw'  boxShadow='md' p={5}>
                        <Heading size='sm'>Attachments Preview</Heading>
                    </Box>

                    </Flex >
                    {/* <Button variant='ghost'>Post</Button>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Cancel
                    </Button> */}
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

export default CreatePost