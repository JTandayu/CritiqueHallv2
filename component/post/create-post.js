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
    Text,
    Image
  } from "@chakra-ui/react"
  import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
import { useDisclosure, useColorModeValue, useToast } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import styles from "@styles/Hall.module.css";
import { Box } from '@chakra-ui/react'
import { useState } from 'react';
import { Input } from '@chakra-ui/react'
import { Label } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { useCookies, cookies } from 'react-cookie'
import axios from 'axios'
import { storage } from '../../firebase.js'
import { getDownloadURL, ref, uploadBytesResumable, deleteObject  } from 'firebase/storage'
import React from "react";
import { getCookie } from 'cookies-next'


const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
})


export async function getStaticProps(){
    const { API_URL } = process.env
    const { API_KEY } = process.env
    // const toast = useToast()

    const res = await fetch(`${API_URL}/api/get_halls`, {
        method: 'GET',
        headers: {
            'content-type': 'multipart/form-data',
            'X-API-KEY': `${API_KEY}`,
            'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
            // 'Accept-Encoding': 'gzip, deflate, br',
            'Accept': 'application/json',
        }
    })

    const data = await res.json()
    console.log(data)

    return{
        props:{
            data: data.halls
        }
    }

}

function CreatePost({data}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { API_URL } = process.env
    const { API_KEY } = process.env

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [hall_id, setHallID] = useState('1')
    
    const toast = useToast()
    const toastIdRef = React.useRef()

    const [color, setColor] = useState('purple')
    const [cookies] = useCookies([]);
    const token = getCookie('token')
    const user_id = getCookie('encrypted_id')
    // const [attachment1, setAttachment1] = useState('')
    // const [attachment2, setAttachment2] = useState('')
    // const [attachment3, setAttachment3] = useState('')
    // const [attachment4, setAttachment4] = useState('')
    // const [attachment5, setAttachment5] = useState('')

    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState([])
    const [counter, setCounter] = useState(0)
    const [fileName, setFileName] = useState([])
    const [urls, setUrls] = useState([]); 
    // console.log(image.length)

    const uploadFiles = () => {
        if(urls.length > 4){
            toastIdRef.current = toast({title: 'Maximum of 5 files only. Please attach link of file instead'
                ,status: 'error', isClosable: true});
            return;
        }
        if (counter > 5){
            toastIdRef.current = toast({title: 'Maximum of 5 files only. Please attach link of file instead'
                ,status: 'error', isClosable: true});
            return null;
        }
        const promises = []
        if (!image) return;
        image.map((image) => {
            const storageRef = ref(storage, `/files/${cookies.display_name}/${image.name}`)
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
                    // console.log(urls)
                    setUrls((prevState) => [...prevState, urls])
                    setFileName((prevState) => [...prevState, image.name])
                    setImage([])

                })
            }
            );
        })

        Promise.all(promises);
        document.getElementById('image-input').value=null;
    }
   

    const handleChange = e =>{
        console.log(counter)
        console.log(e.target.files.length)

        if(e.target.files.length > 5 - counter){
            toastIdRef.current = toast({title: 'Maximum of 5 files only. Please attach link of file instead'
                    ,status: 'error', isClosable: true});
            return null;
        }else{
            for(let i = 0; i < e.target.files.length; i++){
                // console.log(e.target.files[i].size)
                if(e.target.files[i].size > 25000000){
                    toastIdRef.current = toast({
                        title: "File size is higher than the limit.",
                        status: 'error',
                        isClosable: true,
                      })
                    // console.log(image)
                    return;
                }
                else{
                    const newImage = e.target.files[i]
                    newImage['id'] = Math.random()
                    setImage((prevState) => [...prevState, newImage])
                    setCounter(prevCount => prevCount + 1)
                    
                }
                
            }
        }
        
        
    }

    const deleteFile = async (filename, i) =>{
            
            const desertRef = ref(storage, `/files/${cookies.display_name}/${filename}`)
            fileName.splice(i, 1)
            image.splice(i, 1)
            urls.splice(i, 1)

            setFileName(fileName => fileName.filter(e => e !== i))

            // console.log(desertRef)
            deleteObject(desertRef).then((response) => {
                // console.log(response.data)
                // alert("File deleted successfully")
                toastIdRef.current = toast({
                    title: "File deleted successfully",
                    status: 'success',
                    isClosable: true,
                  })
                return;
            }).catch((error) => {
                console.log(error)
            });
    }



    const submitPost = async () =>{

        let formData = new FormData(); 
        formData.append('title', title);
        formData.append('body', description);
        formData.append('hall_id', hall_id);
        formData.append('attachment1',urls[0]);
        formData.append('attachment2',urls[1]);
        formData.append('attachment3',urls[2]);
        formData.append('attachment4',urls[3]);
        formData.append('attachment5',urls[4]);
        // console.log(urls[1])

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

        axios.post(`${API_URL}/api/create_post`, formData, config)
        .then(response => {
          console.log(response.data);
          toastIdRef.current = toast({ title: 'Create post successful!', status: 'success', duration: 3000, isClosable: false })
          window.location.href = "/critique"
        })
        .catch(error => {
            // toastIdRef.current = toast({ title: 'Create post unsuccessful!', status: 'error', duration: 3000, isClosable: false })
            if(error.response.data.status === "Account Muted"){
                toastIdRef.current = toast({ title: 'Account Muted!', status: 'error', duration: 3000, isClosable: false })
            }
            console.log(error);
            console.log(error.response)
        });
    }

    const addDefaultSrc = (e) => {
        e.target.src = "/no-preview-available.png";
        e.target.onerror = null;
    }
    
    const closeCreate = () => {
        setFileName([])
        setImage([])
        setUrls([])
        setCounter(0)
        onClose()
    }

    const openInput = async() => {
        document.getElementById('image-input').click();
    }

    return(
        <>
        <button onClick={onOpen} className={useColorModeValue(styles.cpbutton, styles.cpbutton2)}>Create Post</button>


        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent maxW="70rem">
                <ModalHeader fontFamily={'Raleway'}>Create Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    <Flex mb={5} flexDir={{lg: 'row', sm: 'column'}}>
                    <Box w={{lg: '24vw', sm: '100%'}}>
                    <Flex fontFamily={'Raleway'} mt='3vh' display='flex'>
                        <FormLabel>Title<Text fontSize="sm" color={useColorModeValue('gray', 'gray')}>(required)</Text></FormLabel>
                        <Input borderColor={useColorModeValue('black', 'white')} type='text' w={{lg: '75%', sm: '100%'}} ml='11px' onChange={e => setTitle(e.target.value)}  />
                    </Flex>

                    <FormLabel fontFamily={'Raleway'} mt={2} display='flex'>Description<Text fontSize="sm" color={useColorModeValue('gray', 'gray')} ml={2}>(required)</Text></FormLabel>
                    <Textarea borderColor={useColorModeValue('black', 'white')} fontFamily={'Raleway'} type='text' w={{lg: '23vw', sm: '100%'}} h='20vh' onChange={e => setDescription(e.target.value)} />
                    <Flex mt={5}>
                        <FormLabel fontFamily={'Raleway'} mt={2}>Post This to: </FormLabel>
                        <Select  borderColor={useColorModeValue('black', 'white')} fontFamily={'Raleway'} w={{lg: '10vw', sm: '50vw'}} onChange={e => setHallID(e.target.value)}>
                            <option value='2'>Arts</option>
                            <option value='3'>Business</option>
                            <option value='1'>Technology</option>
                            <option value='4'>Lounge</option>
                        </Select>
                    
                    </Flex>
                    

                    <Center mt={10}>
                        <Button fontFamily={'Raleway'} bgColor={useColorModeValue('#2777C1','#0085FF')} color={useColorModeValue('#FFFFFF', '#FFFFFF')} _hover={{bgColor: useColorModeValue('#56AEFF', '#0B5090')}} mr={2} onClick={submitPost}>
                            Submit
                        </Button>

                        <Button fontFamily={'Raleway'} bgColor={useColorModeValue('#C1272D', '#9E0B0F')} color={useColorModeValue('white', 'white')} _hover={{bgColor: useColorModeValue('#FF000A', '#470507')}} variant='ghost' mr={2} onClick={closeCreate}>
                            Cancel
                        </Button>
                    </Center>

                    </Box>
                    

                    <Center height='50vh' display={{lg: 'block', sm: 'none'}}>
                        <Divider orientation='vertical' borderColor='black'/>
                    </Center>

                    <Divider display={{lg: 'none', sm: 'block'}} my={5} borderColor='black'/>
                

                    <Box ml='2vw' w={{lg: '20vw', sm: '100%'}} p={5}>
                        <Flex flexDir={{lg: 'row', sm: 'column'}} w='30vw'>
                            <Heading fontFamily={'Raleway'} size='sm' mr={3}>Attachments<Text fontSize="sm" color={useColorModeValue('gray', 'gray')}>(optional)</Text></Heading>
                            {/* <Button bg='blue.400' color='white' ml={5} h='2em'>upload</Button> */}
                            <input type='file' multiple onChange={handleChange} accept=".jpg, .png, .docx, .xls" id='image-input' hidden />
                            <Button fontFamily={'Raleway'} bg='yellow.400' color='black' _hover={{background: 'yellow.500'}} onClick={openInput} ml={5}>Choose Files</Button>
                            <Button fontFamily={'Raleway'} bg='blue.400' color='white' _hover={{background: 'blue.700'}} onClick={uploadFiles} ml={5}>Upload</Button>
                        </Flex>
                        <Flex bgColor={useColorModeValue('#F4F4F4', '#2E2E2E')} w={{lg: '20vw', sm: '100%'}} h='10vh' rounded='md' overflowX='auto' mt={3}
                        css={{
                            '&::-webkit-scrollbar': {
                            width: '4px',
                            height: '4px'
                            },
                            '&::-webkit-scrollbar-track': {
                            width: '6px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                            background: '#212121',
                            borderRadius: '24px',
                            },
                        }}>
                            {fileName.map((file, i) => (
                                <Flex ml={5} id={file} w="full">
                                    <Text fontSize='sm' key={i}>{file}</Text>
                                    <Button onClick={()=>{deleteFile(file, i)}} mx='auto' h={5} ml={1} variant='ghost'><Image src="/cross_icon.png" w="15px" h="15px" /></Button>
                                </Flex>
                            ))}
                        </Flex>

                        <Heading fontFamily={'Raleway'} size='sm' mt={5}>Attachments Preview:</Heading>
                        <Flex bgColor={useColorModeValue('#F4F4F4', '#2E2E2E')} w={{lg: '20vw', sm: '100%'}} h='13vh' rounded='md' overflowX='auto' css={{
                                '&::-webkit-scrollbar': {
                                width: '4px',
                                height: '4px'
                                },
                                '&::-webkit-scrollbar-track': {
                                width: '6px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                background: '#212121',
                                borderRadius: '24px',
                                },
                            }} mt={3}>

                            {urls.map((url, i) => (
                                <Image src={url} key={i} w={{lg: '10vw', sm: '80vw'}} h='10vh' ml={5} onError={addDefaultSrc} />
                            ))} 
                        </Flex>
                        <br />
                        <Text fontFamily={'Raleway'} fontSize='lg'>Due to storage limitations:</Text>
                        <Text fontFamily={'Raleway'} fontStyle={'italic'} fontSize='md'>- video and zip files cannot be uploaded</Text>
                        <Text fontFamily={'Raleway'} fontStyle={'italic'} fontSize='md'>- up to 5 attachments maximum only</Text>
                        <Text fontFamily={'Raleway'} fontStyle={'italic'} fontSize='md'>- each upload is limited to 25mb only</Text>
                        <Text fontFamily={'Raleway'} fontStyle={'italic'} fontSize='md'>- attachments cannot be edited once published!</Text>
                    </Box>

                    </Flex >
                </ModalBody>
            </ModalContent>
        </Modal>
        
        
        </>
    )

}

export default CreatePost