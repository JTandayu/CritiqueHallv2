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
import { Button, Image } from '@chakra-ui/react'
import styles from "@styles/Hall.module.css";
import { Box } from '@chakra-ui/react'
import { useState, useEffect, SetStateAction, forceUpdate } from 'react';
import { Divider, Center, useColorModeValue } from "@chakra-ui/react";
import { Input } from '@chakra-ui/react'
import { Label } from '@chakra-ui/react'
import { Select, Text } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { storage } from '../../../firebase.js'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import React from "react";
import { getCookie } from 'cookies-next'




const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
})


// export async function getServerSideProps(){
//     const { API_URL } = process.env
//     const { API_KEY } = process.env

//     const res = await fetch(`${API_URL}/api/edit_post`)
//     const data = await res.json()

//     return {
//         props: {
//             data
//         }
//     }

// }

function BeforeRender({}){
    
}

function EditPost({data, url, fileNames}){
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { API_URL } = process.env
    const { API_KEY } = process.env
    const toast = useToast()
    const toastIdRef = React.useRef()

    // console.log(data.title)

    const [title, setTitle] = useState(data.title)
    const [description, setDescription] = useState(data.body)

    // const [cookies] = useCookies([]);
    const token = getCookie('token')
    const user_id = getCookie('encrypted_id')
    // const [data, setData] =  useState([])

    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState([])
    const [fileName, setFileName] = useState([])
    const [urls, setUrls] = useState([]); 
    const [fileNameList, setFileNameList] = useState([])
    const [urlList, setUrlList] = useState([])
    const [imageState, setImageState] = useState(0)
    // console.log(data)


    useEffect(() => {
        setUrls(url)
        setUrlList(url)
    }, [url])

    useEffect(() => {
        setFileName(fileNames)
        setFileNameList(fileNames)
    }, [fileNames])

    useEffect(() => {
        setTitle(data.title)
        setDescription(data.body)
    }, [data.body])

    // useEffect(() => {
    //     // setUrls(urlList)
    //     // setFileName(fileNameList)
    // }, [imageState])

    const uploadFiles = async () => {
        if(urls.length > 4){
                alert('Maximum of 5 files only. Please attach link of google drive file instead');
                return;
        }
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
    }

      const handleChange = e =>{
        for(let i = 0; i < e.target.files.length; i++){
            // console.log(e.target.files[i].size)
            if(e.target.files[i].size > 200000){
                alert("File size is higher than the limit.")
                console.log(image)
                return;
            }else{
                const newImage = e.target.files[i]
                newImage['id'] = Math.random()
                setImage((prevState) => [...prevState, newImage])
            }
            
        }
    }

    const deleteFile = async (filename, i) =>{
        fileName.splice(i, 1)
        image.splice(i, 1)
        urls.splice(i, 1)

        setFileName(fileName => fileName.filter(e => e !== i))
    }

    const closeModal = () =>{
        setTitle(data.title)
        setDescription(data.body)
        onClose()
    }

    const submitPost = async () =>{ 

        if(title == "" || description == ""){
            toastIdRef.current = toast({ position: 'top', title: 'Title and Description is required.', status: 'error', duration: 3000, isClosable: false })
            return;
        }else{
        let formData = new FormData(); 
        formData.append('title', title);
        formData.append('body', description);
        formData.append('hall_id', data.hall_id);
        formData.append('post_id', data.post_id)
        // formData.append('attachment1',urls[0]);
        // formData.append('attachment2',urls[1]);
        // formData.append('attachment3',urls[2]);
        // formData.append('attachment4',urls[3]);
        // formData.append('attachment5',urls[4]);

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

        axios.post(`${API_URL}/api/update_post`, formData, config)
        .then(response => {
          console.log(response.data);
        //   window.location.href = "/critique"
            onClose()
            router.reload()
        })
        .catch(error => {
            console.log(error);
            console.log(error.response)
            if(error.response.data.status === "Account Muted"){
                toastIdRef.current = toast({ position: 'top', title: 'Account muted!', status: 'error', duration: 3000, isClosable: false })
            }
            // window.location.href = "/login"
        });}
    }

    return(
        <>
        <Box onClick={onOpen} width='100%' justifyContent="flex-start" _hover={{bgColor: "none", cursor: "pointer"}}>Edit</Box>


        <form action=" " method="POST">
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent maxW="30rem">
                <ModalHeader fontFamily={'Raleway'}>Edit Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Flex mb={5}>
                    <Box w={{lg: '24vw', base: "100%"}}>
                    <Flex mt='3vh'>
                        <FormLabel fontFamily={'Raleway'}>Title</FormLabel>
                        <Input fontFamily={'Raleway'} borderColor={useColorModeValue('black', 'white')} type='text' w={{lg: '20vw', base: "100%"}} ml='11px' value={title} onChange={(e) => setTitle(e.target.value)}  />
                    </Flex>

                    <FormLabel mt={2} fontFamily={'Raleway'}>Description</FormLabel>
                        <Textarea fontFamily={'Raleway'} borderColor={useColorModeValue('black', 'white')} type='text' w={{lg: '23vw', base: "100%"}} h='20vh' value={description} onChange={(e) => setDescription(e.target.value)} />

                    <Center mt={10}>
                        <Button fontFamily={'Raleway'} bgColor={useColorModeValue('#2777C1','#0085FF')} color={useColorModeValue('#FFFFFF', '#FFFFFF')} _hover={{bgColor: useColorModeValue('#56AEFF', '#0B5090')}} type="submit" colorScheme='blue' mr={2} onClick={submitPost}>
                            Submit
                        </Button>

                        <Button fontFamily={'Raleway'} bgColor={useColorModeValue('#C1272D', '#9E0B0F')} color={useColorModeValue('white', 'white')} _hover={{bgColor: useColorModeValue('#FF000A', '#470507')}} variant='ghost' mr={2} onClick={closeModal}>
                            Cancel
                        </Button>
                    </Center>

                    </Box>
{/*                     

                    <Center height='50vh' >
                        <Divider orientation='vertical' borderColor='black'/>
                    </Center> */}
                

                    {/* <Box ml='2vw' w='20vw' p={5}>
                    <Flex flexDir={{lg: 'row', sm: 'column'}} w='30vw'>
                            <Heading size='sm' mr={3}>Attachments</Heading>
                            <input type='file' multiple onChange={handleChange} />
                            <Button onClick={uploadFiles}>Upload</Button>
                        </Flex>
                        <Flex bg='white' w={{lg: '19vw', sm: '100%'}} h='5vh' rounded='md' overflowX='auto' mt={3}>
                            {fileName.map((file, i) => (
                                <Flex ml={5}>
                                    <Text fontSize='sm' key={i}>{file}</Text>
                                    <Button onClick={() => {deleteFile(file, i)}} mx='auto' h={5} variant='ghost'>X</Button>
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
                    </Box> */}

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