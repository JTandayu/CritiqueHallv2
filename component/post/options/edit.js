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
import { Select, Text } from '@chakra-ui/react'
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
    const [image, setImage] = useState([])
    const [fileName, setFileName] = useState([])
    const [urls, setUrls] = useState([]);  

    const formHandler = (e) =>{
      e.preventDefault();
      const file = e.target[0].files[0];
      // console.log(file)
      uploadFiles(file); 
    }

    const uploadFiles = () => {
        const promises = []
        if (!image) return;
          image.map((image) => {
              const storageRef = ref(storage, `/files/${image.name}`)
              setFileName((prevState) => [...prevState, image.name])
              const uploadTask = uploadBytesResumable(storageRef, image)
              promises.push(uploadTask) 
              uploadTask.on("state_changed", (snapshot) => {
                  const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  
                  setProgress(prog);
              }, (err) => console.log(err),
              async () => {
                  await
                  getDownloadURL(uploadTask.snapshot.ref)
                  .then(urls => {
                      console.log(urls)
                      setUrls((prevState) => [...prevState, urls])
                      
                      setImage([])
                  })
              }
              );
          })
  
          Promise.all(promises);
          console.log(urls)
      }

    const handleChange = e =>{
        
        for(let i = 0; i < e.target.files.length; i++){
            // if(e.target.files[i].size > 200){

            // }
            console.log(e.target.files[i].size)
            const newImage = e.target.files[i]
            newImage['id'] = Math.random()
            setImage((prevState) => [...prevState, newImage])
        }
    }

    const deleteFile = () =>{

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
                <ModalContent maxW="70rem">
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
                    <Flex flexDir={{lg: 'row', sm: 'column'}} w='30vw'>
                            <Heading size='sm' mr={3}>Attachments</Heading>
                            {/* <Button bg='blue.400' color='white' ml={5} h='2em'>upload</Button> */}
                            <input type='file' multiple onChange={handleChange} />
                            <Button onClick={uploadFiles}>Upload</Button>
                        </Flex>
                        <Flex bg='white' w={{lg: '19vw', sm: '100%'}} h='5vh' rounded='md' overflowX='auto' mt={3}>
                            {fileName.map((file, i) => (
                                <Flex ml={5}>
                                    <Text fontSize='sm' key={i}>{file}</Text>
                                    <Button onClick={deleteFile} mx='auto' h={5} variant='ghost'>X</Button>
                                </Flex>
                            ))}
                        </Flex>

                        <Heading size='sm' mt={5}>Attachments Preview</Heading>
                        <Flex bg='white' w='19vw' h='20vh' rounded='md' overflowX='auto' mt={3}>
                            {urls.map((url, i) => (
                                <Image src={url} key={i} w={{lg: '10vw', sm: '80vw'}} h='10vh' ml={5} />
                            ))} 
                        </Flex>
                        <Text fontSize='xs'>*5 Attachments Max</Text>
                        <Text fontSize='xs'>*image and doc format only accepted</Text>
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