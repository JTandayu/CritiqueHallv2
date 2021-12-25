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
import { Select } from '@chakra-ui/react'

  

function CreatePost() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { API_URL } = process.env
    const { API_KEY } = process.env

    // const [title, setTitle] = useState('')
    // const [description, setPassword] = useState('')



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
                    <Flex mt='3vh'>
                        <FormLabel>Title</FormLabel>
                        <Input type='text' w='20vw' ml='11px' bg='white' />
                    </Flex>

                    <FormLabel mt={2}>Description</FormLabel>
                    <Textarea type='text' w='23vw' h='20vh' color='black' bg='white' />
                    <Flex mt={5}>
                        <FormLabel mt={2}>Post This to: </FormLabel>
                        <Select w='10vw'>
                            <option value='technology' bg='purple'>Technology</option>
                            <option value='business' bg='purple' >Business</option>
                            <option value='arts' bg='purple' >Arts</option>
                            <option value='lounge' bg='purple' >Lounge</option>
                        </Select>
                    
                    </Flex>
                    

                    <Center mt={10}>
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