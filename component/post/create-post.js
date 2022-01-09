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
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { useCookies, cookies } from 'react-cookie'
import axios from 'axios'
import { storage } from '../../firebase.js'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'


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
    const [attachment1, setAttachment1] = useState('')
    const [attachment2, setAttachment2] = useState('')
    const [attachment3, setAttachment3] = useState('')
    const [attachment4, setAttachment4] = useState('')
    const [attachment5, setAttachment5] = useState('')

    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState([])
    const [fileName, setFileName] = useState([])
    const [urls, setUrls] = useState([]); 

    const uploadFiles = () => {
        if(urls.length > 4){
                alert('Maximum of 5 files only. Please attach link of google drive file instead');
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

    const deleteFile = () =>{
        
    }



    const submitPost = async () =>{

        const token = cookies.token
        const id = cookies.id
        const enc_id =  cookies.encrypted_id

        for(let i = 0; i < urls.length; i++){
            if(i === 0){
                setAttachment1(urls[i])
            }else if(i === 1){
                setAttachment2(urls[i])
            }
            else if(i === 2){
                setAttachment3(urls[i])
            }
            else if(i === 3){
                setAttachment4(urls[i])
            }
            else if(i === 4){
                setAttachment5(urls[i])
            }
        }
        

        let formData = new FormData(); 
        formData.append('title', title);
        formData.append('body', description);
        formData.append('hall_id', hall_id);
        formData.append('attachment1',attachment1);
        formData.append('attachment2',attachment2);
        formData.append('attachment3',attachment3);
        formData.append('attachment4',attachment4);
        formData.append('attachment5',attachment5);

        console.log(attachment1)

        const config = {
            headers: {
            'content-type': 'multipart/form-data',
            'X-API-KEY': `${API_KEY}`,
            'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
            // 'Accept-Encoding': 'gzip, deflate, br',
            'Accept': 'application/json',
            'token': token,
            'user_id': enc_id
            }
        }

        axios.post(`${API_URL}/api/create_post`, formData, config)
        .then(response => {
          console.log(response.data);
        //   window.location.href = "/critique"
        })
        .catch(error => {
            console.log(error);
            console.log(error.response)
            // window.location.href = "/login"
        });
    }

    return(
        <>
        <button onClick={onOpen} className={styles.cpbutton}>Create Post</button>


        <form action='' method='POST'>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent maxW="70rem">
                <ModalHeader>Create Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    <Flex mb={5} flexDir={{lg: 'row', sm: 'column'}}>
                    <Box w={{lg: '24vw', sm: '100%'}}>
                    <Flex mt='3vh'>
                        <FormLabel>Title</FormLabel>
                        <Input type='text' w={{lg: '20vw', sm: '100%'}} ml='11px' bg='white' color='black' onChange={e => setTitle(e.target.value)}  />
                    </Flex>

                    <FormLabel mt={2}>Description</FormLabel>
                    <Textarea type='text' w={{lg: '23vw', sm: '100%'}} h='20vh' color='black' bg='white' onChange={e => setDescription(e.target.value)} />
                    <Flex mt={5}>
                        <FormLabel mt={2}>Post This to: </FormLabel>
                        <Select w={{lg: '10vw', sm: '50vw'}} bg='light' onChange={e => setHallID(e.target.value)}>
                            <option value='1'>Technology</option>
                            <option value='2'>Business</option>
                            <option value='3'>Arts</option>
                            <option value='4'>Lounge</option>
                        </Select>
                    
                    </Flex>
                    

                    <Center mt={10}>
                        <Button type="submit" colorScheme='blue' mr={2} onClick={submitPost}>
                            Submit
                        </Button>

                        <Button type="submit" variant='ghost' mr={2} onClick={onClose}>
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
                            <Heading size='sm' mr={3}>Attachments</Heading>
                            {/* <Button bg='blue.400' color='white' ml={5} h='2em'>upload</Button> */}
                            <input type='file' multiple onChange={handleChange} accept=".jpg, .png, .docx, .xls" />
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
                        <Flex bg='white' w={{lg: '20vw', sm: '100%'}} h='20vh' rounded='md' overflowX='auto' mt={3}>
                            {urls.map((url, i) => (
                                <Image src={url} key={i} w={{lg: '10vw', sm: '80vw'}} h='10vh' ml={5} />
                            ))} 
                        </Flex>
                        <Text fontSize='xs'>*5 Attachments Max</Text>
                        <Text fontSize='xs'>*image and doc format only accepted</Text>
                        <Text fontSize='xs'>*200kb file max size</Text>
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