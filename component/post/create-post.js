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
import { useDisclosure, useColorModeValue } from '@chakra-ui/react'
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
    
    const [color, setColor] = useState('purple')
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'id', 'encrypted_id', 'display_name']);
    // const [attachment1, setAttachment1] = useState('')
    // const [attachment2, setAttachment2] = useState('')
    // const [attachment3, setAttachment3] = useState('')
    // const [attachment4, setAttachment4] = useState('')
    // const [attachment5, setAttachment5] = useState('')

    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState([])
    const [fileName, setFileName] = useState([])
    const [urls, setUrls] = useState([]); 

    const uploadFiles = () => {
        if(urls.length > 4){
            toast({title: 'Maximum of 5 files only. Please attach link of google drive file instead'
                ,status: 'error', isClosable: true});
            return;
        }
        const promises = []
        if (!image) return;
        image.map((image) => {
            const storageRef = ref(storage, `/files/${cookies.display_name}/${image.name}`)
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
                    // console.log(urls)
                    setUrls((prevState) => [...prevState, urls])
                    setImage([])
                })
            }
            );
        })

        Promise.all(promises);
        document.getElementById('image-input').value=null;
    }
   

    const handleChange = e =>{
        for(let i = 0; i < e.target.files.length; i++){
            // console.log(e.target.files[i].size)
            if(e.target.files[i].size > 25000000){
                alert("File size is higher than the limit.")
                // console.log(image)
                return;
            }else{
                const newImage = e.target.files[i]
                newImage['id'] = Math.random()
                setImage((prevState) => [...prevState, newImage])
                
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
                alert("File deleted successfully")
                return;
            }).catch((error) => {
                console.log(error)
            });
    }



    const submitPost = async () =>{
        const token = cookies.token
        const id = cookies.id
        const enc_id =  cookies.encrypted_id

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
            'User-Id': enc_id
            }
        }

        axios.post(`${API_URL}/api/create_post`, formData, config)
        .then(response => {
          console.log(response.data);
          window.location.href = "/critique"
        })
        .catch(error => {
            console.log(error);
            console.log(error.response)
        });
    }

    return(
        <>
        <button onClick={onOpen} className={styles.cpbutton}>Create Post</button>


        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent maxW="70rem">
                <ModalHeader fontFamily={'Raleway'}>Create Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    <Flex mb={5} flexDir={{lg: 'row', sm: 'column'}}>
                    <Box w={{lg: '24vw', sm: '100%'}}>
                    <Flex fontFamily={'Raleway'} mt='3vh'>
                        <FormLabel>Title</FormLabel>
                        <Input type='text' w={{lg: '20vw', sm: '100%'}} ml='11px' onChange={e => setTitle(e.target.value)}  />
                    </Flex>

                    <FormLabel fontFamily={'Raleway'} mt={2}>Description</FormLabel>
                    <Textarea fontFamily={'Raleway'} type='text' w={{lg: '23vw', sm: '100%'}} h='20vh' onChange={e => setDescription(e.target.value)} />
                    <Flex mt={5}>
                        <FormLabel fontFamily={'Raleway'} mt={2}>Post This to: </FormLabel>
                        <Select w={{lg: '10vw', sm: '50vw'}} onChange={e => setHallID(e.target.value)}>
                            <option value='1'>Technology</option>
                            <option value='2'>Arts</option>
                            <option value='3'>Business</option>
                            <option value='4'>Lounge</option>
                        </Select>
                    
                    </Flex>
                    

                    <Center mt={10}>
                        <Button fontFamily={'Raleway'} colorScheme='blue' mr={2} onClick={submitPost}>
                            Submit
                        </Button>

                        <Button fontFamily={'Raleway'} variant='ghost' mr={2} onClick={onClose}>
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
                            <Heading fontFamily={'Raleway'} size='sm' mr={3}>Attachments</Heading>
                            {/* <Button bg='blue.400' color='white' ml={5} h='2em'>upload</Button> */}
                            <input type='file' multiple onChange={handleChange} accept=".jpg, .png, .docx, .xls" id='image-input' />
                            <Button onClick={uploadFiles}>Upload</Button>
                        </Flex>
                        <Flex bgColor={useColorModeValue('#F4F4F4', '#2E2E2E')} w={{lg: '19vw', sm: '100%'}} h='7vh' rounded='md' overflowX='auto' mt={3}>
                            {fileName.map((file, i) => (
                                <Flex ml={5} id={file}>
                                    <Text fontSize='sm' key={i}>{file}</Text>
                                    <Button onClick={()=>{deleteFile(file, i)}} mx='auto' h={5} ml={1} variant='ghost'>X</Button>
                                </Flex>
                            ))}
                        </Flex>

                        <Heading fontFamily={'Raleway'} size='sm' mt={5}>Attachments Preview</Heading>
                        <Flex bgColor={useColorModeValue('#F4F4F4', '#2E2E2E')} w={{lg: '20vw', sm: '100%'}} h='20vh' rounded='md' overflowX='auto' mt={3}>
                            {urls.map((url, i) => (
                                <Image src={url} key={i} w={{lg: '10vw', sm: '80vw'}} h='10vh' ml={5} />
                            ))} 
                        </Flex>
                        <br />
                        <Text fontFamily={'Raleway'} fontStyle={'italic'} fontSize='sm'>- 5 Attachments Max</Text>
                        <Text fontFamily={'Raleway'} fontStyle={'italic'} fontSize='sm'>- Image and Document Format Only Accepted</Text>
                        <Text fontFamily={'Raleway'} fontStyle={'italic'} fontSize='sm'>- 200KB File Max Size</Text>
                    </Box>

                    </Flex >
                </ModalBody>
            </ModalContent>
        </Modal>
        
        
        </>
    )

}

export default CreatePost