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
    Switch,
    Text,
    Spinner
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
import { useRouter } from "next/router";
import {useToast} from '@chakra-ui/react'
import React from "react";
import { EditIcon } from '@chakra-ui/icons'
import { getCookie, setCookies } from 'cookies-next'

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
    const router = useRouter();
    const toast = useToast()
    const toastIdRef = React.useRef()

    const token = getCookie('token')
    const user_id = getCookie('encrypted_id')

    // console.log(data)

    // const [cookie] = useCookies()
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
    const [specialization, setSpecialization] = useState(data.specialization)

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [uploadProfileDone, setUploadProfileDone] = useState(false)
    const [uploadCoverDone, setUploadCoverDone] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false);
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
          'Token': token,
          'User-Id': user_id
        }
    }

    const cancelChange = () => {
        
        setProfileImageUrl(data.profile_photo)
        setCoverImageUrl(data.cover_photo)
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setDisplayName(data.display_name)
        setAboutMe(data.about_me)
        setSpecialization(data.specialization)
        setCurrentPassword('')
        setNewPassword('')
        setConfirmNewPassword('')
        setConfirmPassword('')
        onClose();
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

    
    const uploadFiles = () => {
    setLoading(true)
      // console.log(storage)

    //   if (!profileImage) return;
    //   if (!coverImage) return;
    if(profileImage.length !== 0){
    setLoading(true)
      const storageProfRef = ref(storage, `/profile_pics/${data.display_name}/${profileImage[0].name}`)
      const uploadProfile = uploadBytesResumable(storageProfRef, profileImage[0])

      if(profileImage[0].name.endsWith('.jpg') == true || profileImage[0].name.endsWith('.png') == true || profileImage[0].name.endsWith('.gif') == true){
        uploadProfile.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

            setProgress(prog);
        }, (err) => console.log(err),
        () => {
            getDownloadURL(uploadProfile.snapshot.ref)
            .then(url => {
            toastIdRef.current = toast({
                position: 'top',
                title: 'Profile photo uploaded successfully!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            toastIdRef.current = toast({
                position: 'top',
                title: `File: ${profileImage[0].name}`,
                status: 'info',
                duration: 3000,
                isClosable: true,
            })
            // console.log(url)
            setProfileImageUrl(url)
            setUploadProfileDone(true);
            setLoading(false)
            })
        }
        );
        }else{
            toastIdRef.current = toast({
                position: 'top',
                title: 'File type not supported.',
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
              setLoading(false)
              return;
        }
    }

    if(coverImage.length !== 0){
    setLoading(true)
      const storageCoverRef = ref(storage, `/cover_pics/${data.display_name}/${coverImage[0].name}`)
      const uploadCover = uploadBytesResumable(storageCoverRef, coverImage[0])
      if(coverImage[0].name.endsWith('.jpg') == true || coverImage[0].name.endsWith('.png') == true || coverImage[0].name.endsWith('.gif') == true){
      uploadCover.on("state_changed", (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        setProgress(prog);
      }, (err) => console.log(err),
      () => {
        getDownloadURL(uploadCover.snapshot.ref)
        .then(url => {
            toastIdRef.current = toast({
                position: 'top',
                title: 'Cover photo uploaded successfully!',
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
              toastIdRef.current = toast({
                position: 'top',
                title: `File: ${coverImage[0].name}`,
                status: 'info',
                duration: 3000,
                isClosable: true,
            })
            // console.log(url)
            setCoverImageUrl(url)
            setUploadCoverDone(true);
            setLoading(false)
        })
      }
      );}else{
            toastIdRef.current = toast({
            position: 'top',
            title: 'File type not supported.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
          setLoading(false)
          return;
      }
    }
    else{
        setUploadProfileDone(true);
        setUploadCoverDone(true);
        setLoading(false)
    }

    // 
    }

    const SubmitInfo = () =>{
        // console.log(profileImage)
        // e.preventDefault()
        uploadFiles()
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

    const SubmitPersonalInformation = async() =>{

        const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        if(firstName == '' || lastName == '' || displayName == '' || aboutMe == '' || specialization == ''){
            // document.getElementById('warning3').removeAttribute('hidden');
            // document.getElementById('warning1').hidden=true;
            // document.getElementById('warning2').hidden=true;
            toastIdRef.current = toast({ position: 'top', title: 'Please fill up all the fields.', status: 'error', duration: 3000, isClosable: true })
            return;
        }
        if(firstName.length > 50 || lastName.length > 50) {
            toastIdRef.current = toast({ position: 'top', title: 'First Name and Last Name must not exceed 50 characters.', status: 'error', duration: 3000, isClosable: true })
            return;
        }
        if(format.test(firstName)) {
            toastIdRef.current = toast({ position: 'top', title: 'First Name must contain alphanumeric characters.', status: 'error', duration: 3000, isClosable: true })
            return;
        }
        if(format.test(lastName)) {
            toastIdRef.current = toast({ position: 'top', title: 'Last Name must contain alphanumeric characters.', status: 'error', duration: 3000, isClosable: true })
            return;
        }
        if(displayName.length > 50) {
            toastIdRef.current = toast({ position: 'top', title: 'Display Name must not exceed 50 characters.', status: 'error', duration: 3000, isClosable: true })
            return;
        }
        if(aboutMe.length > 255) {
            toastIdRef.current = toast({ position: 'top', title: 'About Me must not exceed 255 characters.', status: 'error', duration: 3000, isClosable: true })
            return;
        }
        if(specialization.length > 50) {
            toastIdRef.current = toast({ position: 'top', title: 'Specialization must not exceed 50 characters.', status: 'error', duration: 3000, isClosable: true })
            return;
        }
        if (format.test(specialization)) {
            toastIdRef.current = toast({ position: 'top', title: 'Specialization must contain alphanumeric characters.', status: 'error', duration: 3000, isClosable: true })
            return;
        }
        if(confirmPassword == '') {
            toastIdRef.current = toast({ position: 'top', title: 'Please confirm your password before saving!', status: 'error', duration: 3000, isClosable: true })
            return;
        }

        let formData =  new FormData;
        formData.append('first_name', firstName)
        formData.append('last_name', lastName)
        formData.append('display_name', displayName)
        formData.append('about_me', aboutMe)
        formData.append('confirm_password', confirmPassword)
        formData.append('profile_photo', profileImageUrl)
        formData.append('cover_photo', coverImageUrl)
        formData.append('specialization', specialization)
        
        // console.log(coverImageUrl)
        axios.post(`${API_URL}/api/change_profile`, formData, config)
        .then((response) => {
            console.log(response.data)
            toastIdRef.current = toast({
                position: 'top',
                title: 'Profile changed successfully!',
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
              setCookies('display_name', displayName);
              onClose();
            router.reload();
        }).catch((error) => {
            // if(error.response.data.message == "<p>The About Me field cannot exceed 255 characters…>\n<p>The Confirm Password field is required.</p>\n" ){
            //     toastIdRef.current = toast({ position: 'top', title: 'About Me exceeds the limit (max 255). Please try again!', status: 'error', duration: 3000, isClosable: true })
            //     toastIdRef.current = toast({ position: 'top', title: 'Input your confirm password before saving!', status: 'error', duration: 3000, isClosable: true })
            // }else if(error.response.data.message == "<p>The About Me field cannot exceed 255 characters in length.</p>\n"){
            //     toastIdRef.current = toast({ position: 'top', title: 'About Me exceeds the limit (max 255). Please try again!', status: 'error', duration: 3000, isClosable: true })
            // }else if(error.response.data.message == "<p>The Confirm Password field is required.</p>\n"){
            //     toastIdRef.current = toast({ position: 'top', title: 'Input your confirm password before saving!', status: 'error', duration: 3000, isClosable: true })
            // }else if(error.response.data.message == "<p>The Display Name field cannot exceed 50 characters in length.</p>\n<p>The Confirm Password field is required.</p>\n"){
            //     toastIdRef.current = toast({ position: 'top', title: 'Display Name exceeds the limit (max 50). Please try again!', status: 'error', duration: 3000, isClosable: true })
            //     toastIdRef.current = toast({ position: 'top', title: 'Input your confirm password before saving!', status: 'error', duration: 3000, isClosable: true })
            // }else if(error.response.data.message == "<p>The Display Name field cannot exceed 50 characters in length.</p>\n<p>The About Me field cannot exceed 255 characters in length.</p>\n"){
            //     toastIdRef.current = toast({ position: 'top', title: 'Display Name exceeds the limit (max 50). Please try again!', status: 'error', duration: 3000, isClosable: true })
            //     toastIdRef.current = toast({ position: 'top', title: 'About Me exceeds the limit (max 255). Please try again!', status: 'error', duration: 3000, isClosable: true })
            // }else if(error.response.data.message == "<p>The Display Name field cannot exceed 50 characters in length.</p>\n"){
            //     toastIdRef.current = toast({ position: 'top', title: 'Display Name exceeds the limit (max 50). Please try again!', status: 'error', duration: 3000, isClosable: true })
            //     toastIdRef.current = toast({ position: 'top', title: 'About Me exceeds the limit (max 255). Please try again!', status: 'error', duration: 3000, isClosable: true })
            // }else if(error.response.data.message == "<p>No changes made</p>\n"){
            //     toastIdRef.current = toast({ position: 'top', title: 'No changes were made!', status: 'error', duration: 3000, isClosable: true })
             if(error.response.data.Error == "Wrong password"){
                toastIdRef.current = toast({ position: 'top', title: 'Incorrect password, please try again!', status: 'error', duration: 3000, isClosable: true })
             }
            // }else{
            //     toastIdRef.current = toast({ position: 'top', title: 'Error, Please check your inputs!', status: 'error', duration: 3000, isClosable: true })
            // }
            console.log(error)
            console.log(error.response)
        })
    }

    const submitPassword = async () =>{
        let formData =  new FormData;
        formData.append('current_password', currentPassword)
        formData.append('new_password', newPassword)
        formData.append('confirm_new_password', confirmNewPassword)

        if(newPassword !== confirmNewPassword){
            toastIdRef.current = toast({ position: 'top', title: 'Passwords do not match.', status: 'error', duration: 3000, isClosable: true })
            return;
        }else if(newPassword == "" || confirmNewPassword == "" || currentPassword == ""){
            toastIdRef.current = toast({ position: 'top', title: 'You have not entered a password yet.', status: 'error', duration: 3000, isClosable: true })
            return;
        }else if(newPassword.length < 8 || confirmNewPassword.length < 8){
            toastIdRef.current = toast({ position: 'top', title: 'New Password must be a minimum of 8 characters.', status: 'error', duration: 3000, isClosable: true })
            return;
        }

        axios.post(`${API_URL}/api/change_password`, formData, config)
        .then((response) => {
            console.log(response)
            toastIdRef.current = toast({
                position: 'top',
                title: 'Password changed successfully!',
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
              onClose();
              router.reload();
            }).catch((error) => {
            toastIdRef.current = toast({ position: 'top', title: 'Your current password is invalid, please try again!', status: 'error', duration: 3000, isClosable: true }),
            console.log(error)
        })
    }

    const openProfilePicture = async() => {
        document.getElementById('profile-picture-input').click();
    }

    const openCoverPicture = async() => {
        document.getElementById('cover-picture-input').click();
    }

    return(
        <>
        <Button fontFamily={'Raleway'} onClick={onOpen} bgColor={useColorModeValue('#29226E', '#7A6FAF')} color='white' _hover={{background: 'blue.400'}} position='static'>Settings</Button>


        <form action='' method='POST'>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent maxW="56rem">
                <ModalHeader fontFamily={'Raleway'} align='center' fontSize='3xl'>Settings</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex>
                        <Heading fontFamily={'Raleway'} size='md' mb={5}>Personal Information</Heading>
                        <Spacer />
                        {/* <Button>Edit</Button> */}
                    </Flex>
                    {/* <Divider mt={1}/> */}
                    <Flex p={7} flexDir={{lg: "row", base: "column"}}>
                        <Flex flexDir='column' align='center'>
                            <Heading fontFamily={'Raleway'} size='md' mb={5}>Profile Picture</Heading>
                            <Image rounded='full' src={data.profile_photo} w='7vw' h='7vw' objectFit="cover"></Image>
                            <Center mt={3}>
                                <input type='file' onChange={(e)=>setProfileImage(e.target.files)} id='profile-picture-input' hidden/>
                                <Button fontFamily={'Raleway'} bg='yellow.400' color='black' _hover={{background: 'yellow.500'}} onClick={openProfilePicture} ml={5}>Choose<EditIcon ml={2}/></Button>
                                {/* {console.log(profileImage)} */}
                            </Center>
                        </Flex>
                        <Spacer />
                        <Flex flexDir='column' align='center'>
                            <Heading fontFamily={'Raleway'} size='md' mb={3}>Cover Picture</Heading>
                            <Image src={data.cover_photo} w='14vw' h='7vw' borderRadius={10} objectFit="cover"></Image>
                            <Center mt={3}>
                                <input type='file' onChange={(e)=>setCoverImage(e.target.files)} id='cover-picture-input' hidden/>
                                <Button fontFamily={'Raleway'} bg='yellow.400' color='black' _hover={{background: 'yellow.500'}} onClick={openCoverPicture} ml={5}>Choose<EditIcon ml={2} /></Button>
                            </Center>
                        </Flex>
                    </Flex>

                    <Box w="full" mb={8}>
                        <Center>
                            {loading ? <Spinner /> : 
                            <Button fontFamily={'Raleway'} fontSize={{lg: 'xs', base: 'xs'}} bg='blue.400' color='white' _hover={{background: 'blue.700'}} align="right" onClick={uploadFiles}>Upload Picture/s</Button>}
                            <Text fontFamily={'Raleway'} fontSize="sm" color={useColorModeValue('gray', 'gray')} ml={3}>Please click upload after you choose a file.</Text>         
                        </Center>
                    </Box>
                    {/* <Flex mb={5}>
                        <FormLabel>Change Color Profile Background</FormLabel>
                        <Input type='text' w='5vw' bg="white" color='black' />
                    </Flex> */}
                    <Divider mb={5} mt={5}/>
                    <Flex mb={5} flexDir={{lg: "row", base: "column"}} align='center'>
                        <Flex flexDir={{lg: "row", md: "row",base: "column"}}>
                            <FormLabel fontFamily={'Raleway'} w={{lg: '7vw', base: "100%"}}>First Name</FormLabel>
                            <Input fontFamily={'Raleway'} borderColor={useColorModeValue('black', 'white')} type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} ml={{lg: '23px', base: 0}} />
                        </Flex>
                        <Spacer />
                        <Flex flexDir={{lg: "row", md: "row", base: "column"}}>
                            <FormLabel fontFamily={'Raleway'} w={{lg: '7vw', base: "100%"}}>Last Name</FormLabel>
                            <Input fontFamily={'Raleway'} borderColor={useColorModeValue('black', 'white')} type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </Flex>
                    </Flex>
                    <Flex mb={5} flexDir={{lg: "row", base: "column"}}>
                        <FormLabel fontFamily={'Raleway'}>Display Name</FormLabel>
                        <Input fontFamily={'Raleway'} borderColor={useColorModeValue('black', 'white')} type='text' w={{lg: '14vw', base: "100%"}} value={displayName} ml={{lg: '10px', base: 0}} onChange={(e) => setDisplayName(e.target.value)} />
                    </Flex>
                    <Flex mb={5} flexDir={{lg: "row", base: "column"}}>
                        <FormLabel fontFamily={'Raleway'} w={{lg: '7vw', base: "100%"}}>About Me</FormLabel>
                        <Textarea fontFamily={'Raleway'} placeholder='Maximum of 255 characters only.' borderColor={useColorModeValue('black', 'white')} type='text' w='100%' h='1vh' value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} />
                    </Flex>
                    <Flex mb={5} flexDir={{lg: "row", base: "column"}}>
                        <FormLabel fontFamily={'Raleway'}>Specialization</FormLabel>
                        <Input fontFamily={'Raleway'} borderColor={useColorModeValue('black', 'white')} type='text' w={{lg: '50vw', base: "100%"}} value={specialization} ml={{lg: '10px', base: 0}} onChange={(e) => setSpecialization(e.target.value)} />
                    </Flex>
                    <Flex mb={5} flexDir={{lg: "row", base: "column"}}>
                        <FormLabel fontFamily={'Raleway'} color={useColorModeValue('#1B1464', '#B2A3FF')}>Confirm password before saving</FormLabel>
                        <Input fontFamily={'Raleway'} borderColor={useColorModeValue('black', 'white')} type='password' w={{lg: '10vw', base: "100%"}} ml={{lg: '10px', base: 0}} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <Button fontFamily={'Raleway'} bgColor={useColorModeValue('#0C1F83', '#1D447E')} ml={{lg: 5, base: 0}} mt={{lg: 0, base: 5}} color={useColorModeValue('white', 'white')} _hover={{bgColor: useColorModeValue('#173cff', '#428eff')}} mr={{'2xl': 0, md: 0, base: 0}} onClick={SubmitPersonalInformation}>Save information changes</Button>
                    </Flex>
                    {/* <Flex>
                        <Spacer />
                        <Button fontFamily={'Raleway'} bgColor={useColorModeValue('#0C1F83', '#1D447E')} color={useColorModeValue('white', 'white')} _hover={{bgColor: useColorModeValue('#173cff', '#428eff')}} mr={{'2xl': 0, md: 0, base: 0}} onClick={SubmitPersonalInformation}>Save</Button>
                    </Flex> */}
                    <Divider mb={5} mt={5}/>
                    <Flex>
                        <Heading fontFamily={'Raleway'} size='md' mb={5}>Change Password</Heading>
                        <Spacer />
                        {/* <Button>Edit</Button> */}
                    </Flex>
                    <Center display='flex' flexDir='column' mb={5} w={{base: "100%"}}>
                        <Flex mb={3} flexDir={{lg: "row", base: "column"}}>
                            <FormLabel fontFamily={'Raleway'}>Current Password</FormLabel>
                            <Input fontFamily={'Raleway'} borderColor={useColorModeValue('black', 'white')} type='password' w={{lg: '10vw', base: "100%"}} ml='10px' onChange={(e) => setCurrentPassword(e.target.value)} />
                        </Flex>
                        <Flex mb={3} flexDir={{lg: "row", base: "column"}}>
                            <FormLabel fontFamily={'Raleway'} mr={8}>New Password</FormLabel>
                            <Input fontFamily={'Raleway'} borderColor={useColorModeValue('black', 'white')} type='password' w={{lg: '10vw', base: "100%"}} ml='10px' mr='1px' onChange={(e) => setNewPassword(e.target.value)}/>
                        </Flex>
                        <Flex flexDir={{lg: "row", base: "column"}}>
                            <FormLabel fontFamily={'Raleway'} mr={8}>Confirm New Password</FormLabel>
                            <Input fontFamily={'Raleway'} borderColor={useColorModeValue('black', 'white')} type='password' w={{lg: '10vw', base: "100%"}} ml='10px' mr='1px' onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                        </Flex>
                    </Center>
                    <Flex w={{lg: '75%', base: '85%'}}>
                        <Spacer />
                        <Button fontFamily={'Raleway'} bgColor={useColorModeValue('#0C1F83', '#1D447E')} color={useColorModeValue('white', 'white')} _hover={{bgColor: useColorModeValue('#173cff', '#428eff')}} mr={{'2xl': 0, lg: 0,  base: 0}} onClick={submitPassword}>Change Password</Button>
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
                    {/* <Button fontFamily={'Raleway'} bgColor={useColorModeValue('#C1272D', '#9E0B0F')} color={useColorModeValue('white', 'white')} _hover={{bgColor: useColorModeValue('#FF000A', '#470507')}}  onClick={cancelChange}>
                    Cancel
                    </Button> */}
                </ModalFooter>
            </ModalContent>
        </Modal>
        </form>
        
        
        </>
    )

}

export default EditProfile