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
import { useState, useEffect } from 'react'
import { storage } from '../firebase.js'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import {useCookies} from 'react-cookie'
import axios from "axios";

// export async function getServerSideProps(context) {
//     const res = await fetch(`https://...`)
//     const user = await res.json()


//     return {
//       props: { user }, // will be passed to the page component as props
//     }
// } 

function EditProfile({data}) {
    const { API_URL } = process.env
    const { API_KEY } = process.env

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode, toggleColorMode } = useColorMode()
    colorMode === 'light' ? 'Dark' : 'Light'

    // console.log(data)

    const [cookie, setCookie] = useCookies('token', 'id', 'encrypted_id', 'display_name')
    const [profileImage, setProfileImage] = useState([])
    const [coverImage, setCoverImage] = useState([])
    const [profileImageUrl, setProfileImageUrl] = useState(data.profile_photo)
    const [coverImageUrl, setCoverImageUrl] = useState(data.cover_photo)
    
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState(''); 
    const [firstName, setFirstName] = useState(data.first_name)
    const [lastName, setLastName] = useState(data.last_name)
    const [displayName, setDisplayName] = useState(data.display_name)
    const [aboutMe, setAboutMe] = useState(data.about_me)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    // console.log(profileImageUrl)
    
    // useEffect(() => {
    //     // setFirstName(data.first_name)
    //     // setLastName(data.last_name)
    //     // setDisplayName(data.display_name)
    //     // setAboutMe(data.about_me)
    //     // this.setState([...data])
    // }, []);

    // componentWillMount() {
    //     this.setState({
    //       players: this.props.initialPlayers
    //     })
    // }
    

    const config = {
        headers: { 
          'content-type': 'multipart/form-data',
          'X-API-KEY': `${API_KEY}`,
          'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
          // 'Accept-Encoding': 'gzip, deflate, br',
          'Accept': 'application/json',
          'Token': cookie.token,
          'User-Id': cookie.encrypted_id
        }
    }

    // console.log(data);

    // const [darkState, setDarkState] = useState();

    // const formHandler = (e) =>{
    //   e.preventDefault();
    //   const file = e.target[0].files[0];
    //   // console.log(file)
    //   uploadFiles(file); 
    // }

    // const setDarkMode = (value) =>{
    //     toggleColorMode(value)
    //     setDarkState(value)
    // }

    const uploadFiles = async() => {
      // console.log(storage)

    //   if (!profileImage) return;
    //   if (!coverImage) return;
    if(profileImage.length !== 0){
      const storageProfRef = ref(storage, `/profile_pics/${data.display_name}/${profileImage[0].name}`)
      const uploadProfile = uploadBytesResumable(storageProfRef, profileImage[0])
      uploadProfile.on("state_changed", (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        setProgress(prog);
      }, (err) => console.log(err),
      () => {
        getDownloadURL(uploadProfile.snapshot.ref)
        .then(url => {
        console.log(url)
        setProfileImageUrl(url)
        
        })
      }
      );
    }

    if(coverImage.length !== 0){
      const storageCoverRef = ref(storage, `/cover_pics/${data.display_name}/${coverImage[0].name}`)
      const uploadCover = uploadBytesResumable(storageCoverRef, coverImage[0])
      uploadCover.on("state_changed", (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        setProgress(prog);
      }, (err) => console.log(err),
      () => {
        getDownloadURL(uploadCover.snapshot.ref)
        .then(url => {
            console.log(url)
            setCoverImageUrl(url)
        })
      }
      );
    }

    // 
    }

    const SubmitInfo = async () =>{
        // console.log(profileImage)
        uploadFiles().then(()=>{SubmitPersonalInformation()})
    }

    const handleChange = e =>{
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

    const SubmitPersonalInformation = async () =>{

        let formData =  new FormData;
        formData.append('first_name', firstName)
        formData.append('last_name', lastName)
        formData.append('display_name', displayName)
        formData.append('about_me', aboutMe)
        formData.append('confirm_password', confirmPassword)
        formData.append('profile_photo', profileImageUrl)
        formData.append('cover_photo', coverImageUrl)
        
        console.log(coverImageUrl)
        axios.post(`${API_URL}/api/change_profile`, formData, config)
        .then((response) => (
            console.log(response)
        )).catch((error) => (
            console.log(error.response)
        ))
    }

    const submitPassword = async () =>{
        let formData =  new FormData;
        formData.append('current_password', currentPassword)
        formData.append('new_password', newPassword)

        axios.post(`${API_URL}/api/change_password`, formData, config)
        .then((response) => (
            console.log(response)
        )).catch((error) => (
            console.log(error.response)
        ))
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
                        {/* <Button>Edit</Button> */}
                    </Flex>
                    <Flex p={7}>
                        <Flex flexDir='column' align='center'>
                            <Heading size='md' mb={5}>Profile Picture</Heading>
                            <Image rounded='full' src={data.profile_photo} w='7vw' h='7vw'></Image>
                            <Center mt={3}>
                                <input type='file' onChange={(e)=>setProfileImage(e.target.files)}/>
                                {console.log(profileImage)}
                            </Center>
                        </Flex>
                        <Spacer />
                        <Flex flexDir='column' align='center'>
                            <Heading size='md' mb={3}>Cover Picture</Heading>
                            <Image src={data.cover_photo} w='14vw' h='7vw'></Image>
                            <Center mt={3}>
                                <input type='file' onChange={(e)=>setCoverImage(e.target.files)}/>
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
                            <Input type='text' bg="white" value={firstName} onChange={(e) => setFirstName(e.target.value)} color='black' ml='23px' />
                        </Flex>
                        <Spacer />
                        <Flex>
                            <FormLabel w='7vw'>Last Name</FormLabel>
                            <Input type='text' bg="white" value={lastName} color='black' onChange={(e) => setLastName(e.target.value)} />
                        </Flex>
                    </Flex>
                    <Flex mb={5}>
                        <FormLabel>Display Name</FormLabel>
                        <Input type='text' w='10vw' value={displayName} bg="white" color='black' ml='10px' onChange={(e) => setDisplayName(e.target.value)} />
                    </Flex>
                    <Flex mb={5}>
                        <FormLabel w='7vw'>About Me</FormLabel>
                        <Textarea type='text' w='100%' h='15vh' value={aboutMe} bg="white" color='black' onChange={(e) => setAboutMe(e.target.value)} />
                    </Flex>
                    <Flex mb={5}>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input type='password' w='10vw' bg="white" color='black' ml='10px' onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Flex>
                    <Flex>
                        <Spacer />
                        <Button colorScheme='blue' mr={3} onClick={SubmitInfo}>Save</Button>
                    </Flex>
                    <Divider mb={5} mt={5}/>
                    <Flex>
                        <Heading size='md' mb={5}>Privacy and Security</Heading>
                        <Spacer />
                        {/* <Button>Edit</Button> */}
                    </Flex>
                    <Center display='flex' flexDir='column' mb={5}>
                        <Flex mb={3}>
                            <FormLabel>Current Password</FormLabel>
                            <Input type='password' w='10vw' bg="white" color='black' ml='10px' onChange={(e) => setCurrentPassword(e.target.value)} />
                        </Flex>
                        <Flex >
                            <FormLabel mr={8}>New Password</FormLabel>
                            <Input type='password' w='10vw' bg="white" color='black' ml='10px' mr='1px' onChange={(e) => setNewPassword(e.target.value)}/>
                        </Flex>
                    </Center>
                    <Flex w='100%'>
                        <Spacer />
                        <Button colorScheme='blue' mr={3} onClick={submitPassword}>Save</Button>
                    </Flex>
                    {/* <Divider mb={5} mt={5} /> */}

                    {/* <Heading size='md' mb={5}>Preferences</Heading>
                    <Center display='flex' mb={5}>
                            <FormLabel>Dark Mode</FormLabel>
                            <Switch onChange={toggleColorMode}/>
                    </Center> */}
                    {/* <Center display='flex' mb={10}>
                            <FormLabel>Enable Updates</FormLabel>
                            <Switch onChange={toggleColorMode}/>
                    </Center> */}
                    {/* <Divider mb={5} /> */}
                </ModalBody>

                <ModalFooter>
                    {/* <Button colorScheme='blue' mr={3}>Save</Button> */}
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