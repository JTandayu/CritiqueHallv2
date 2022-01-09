import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Flex,
    Image,
    Center,
    Spacer,
    Divider,
    Heading,
    Input,
    Textarea,
    Box,
    Switch
  } from "@chakra-ui/react"
import { useDisclosure } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import styles from "@styles/Hall.module.css";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import { useColorMode, useColorModeValue } from '@chakra-ui/react'
import { useState } from 'react'
import { storage } from '../firebase.js'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

// export async function getServerSideProps(context) {
//     const res = await fetch(`https://...`)
//     const user = await res.json()


//     return {
//       props: { user }, // will be passed to the page component as props
//     }
// } 

function EditProfile({data}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode, toggleColorMode } = useColorMode()
    colorMode === 'light' ? 'Dark' : 'Light'

    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState(''); 
    // console.log(data);

    // const [darkState, setDarkState] = useState();

    const formHandler = (e) =>{
      e.preventDefault();
      const file = e.target[0].files[0];
      // console.log(file)
      uploadFiles(file); 
    }

    // const setDarkMode = (value) =>{
    //     toggleColorMode(value)
    //     setDarkState(value)
    // }

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

    return(
        <>
        <Button onClick={onOpen} bg='blue.400' color='white' _hover={{background: 'blue.400'}} position='static'>Settings</Button>


        <form action='' method='POST'>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent maxW="56rem">
                <ModalHeader align='center' fontSize='3xl'>Settings</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex>
                        <Heading size='md' mb={5}>Personal Information</Heading>
                        <Spacer />
                        <Button>Edit</Button>
                    </Flex>
                    <Flex p={7}>
                        <Flex flexDir='column' align='center'>
                            <Heading size='md' mb={5}>Profile Picture</Heading>
                            <Image src='https://www.clipartmax.com/png/middle/119-1198197_anonymous-person-svg-png-icon-free-download-anonymous-icon-png.png' w='7vw' h='7vw'></Image>
                            <Center mt={3}>
                                <input type='file'  />
                            </Center>
                        </Flex>
                        <Spacer />
                        <Flex flexDir='column' align='center'>
                            <Heading size='md' mb={3}>Cover Picture</Heading>
                            <Image src='https://i.stack.imgur.com/SvWWN.png' w='14vw' h='7vw'></Image>
                            <Center mt={3}>
                                <input type='file'  />
                            </Center>
                        </Flex>
                    </Flex>
                    {/* <Flex mb={5}>
                        <FormLabel>Change Color Profile Background</FormLabel>
                        <Input type='text' w='5vw' bg="white" color='black' />
                    </Flex> */}
                    <Flex mb={5} >
                        <Flex>
                            <FormLabel w='7vw'>First Name</FormLabel>
                            <Input type='text' bg="white" value={data.first_name} color='black' ml='23px' />
                        </Flex>
                        <Spacer />
                        <Flex>
                            <FormLabel w='7vw'>Last Name</FormLabel>
                            <Input type='text' bg="white" value={data.last_name} color='black' />
                        </Flex>
                    </Flex>
                    <Flex mb={5}>
                        <FormLabel>Display Name</FormLabel>
                        <Input type='text' w='10vw' value={data.display_name} bg="white" color='black' ml='10px' />
                    </Flex>
                    <Flex mb={5}>
                        <FormLabel w='7vw'>About Me</FormLabel>
                        <Textarea type='text' w='100%' h='15vh' value={data.about_me} bg="white" color='black' />
                    </Flex>
                    <Divider mb={5} />
                    <Flex>
                        <Heading size='md' mb={5}>Privacy and Security</Heading>
                        <Spacer />
                        <Button>Edit</Button>
                    </Flex>
                    <Center display='flex' flexDir='column' mb={5}>
                        <Flex mb={3}>
                            <FormLabel>Current Password</FormLabel>
                            <Input type='text' w='10vw' bg="white" color='black' ml='10px' />
                        </Flex>
                        <Flex >
                            <FormLabel mr={8}>New Password</FormLabel>
                            <Input type='text' w='10vw' bg="white" color='black' ml='10px' mr='1px' />
                        </Flex>
                    </Center>

                    <Divider mb={5} />

                    <Heading size='md' mb={5}>Preferences</Heading>
                    <Center display='flex' mb={10}>
                            <FormLabel>Dark Mode</FormLabel>
                            <Switch onChange={toggleColorMode}/>
                    </Center>
                    <Divider mb={5} />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3}>Save</Button>
                    <Button colorScheme='red'  onClick={onClose}>
                    Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </form>
        
        
        </>
    )

}

export default EditProfile