import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Flex,
    FormLabel,
    Input,
    Text,
    Textarea,
    Center,
    Spacer,
    Image,
  } from "@chakra-ui/react"
import { useDisclosure } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import styles from "@styles/Hall.module.css";
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import {useCookies} from 'react-cookie'
import { useEffect, useState } from "react";
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import axios from "axios";
import { WarningIcon } from "@chakra-ui/icons";
import {useToast, useColorModeValue} from '@chakra-ui/react'
import React from "react";
import { getCookie } from 'cookies-next'



// export async function getServerSideProps(context) {
//     return {
//       props: {}, // will be passed to the page component as props
//     }
// }


function ReportReply({data, id}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { API_URL } = process.env
    const { API_KEY } = process.env

    // const [cookie] = useCookies()
    const [offense, setOffense] = useState('Inappropriate Username')
    const [message, setMessage] = useState('')
    const toast = useToast()
    const toastIdRef = React.useRef()
    const token = getCookie('token')
    const user_id = getCookie('encrypted_id')
    const display_name = getCookie('display_name')
    // console.log(data.encrypted_id)

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

    const submitReport = () =>{
        if(message == ''){
            toastIdRef.current = toast({
                position: 'top',
                title: 'Description is required.',
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
            return;
        }else{
        let formData = new FormData;
        // formData.append("user_id", data.encrypted_id)
        // formData.append("post_id", null)
        // formData.append("critique_id", null)
        formData.append("reply_id", id)
        formData.append("message", message)
        // formData.append("offense_type", offense)
        // console.log(offense)

        axios.post(`${API_URL}/api/submit_report`, formData, config)
        .then((response)=>{
            // console.log(response)
            toastIdRef.current = toast({
                position: 'top',
                title: 'Report submitted successfully!',
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
              onClose()
        })
        .catch((error)=>{
            console.log(error)
            if(typeof error.response === 'undefined'){
                toastIdRef.current = toast({ position: 'top', title: 'Server error. Please try again later.', status: 'error', duration: 3000, isClosable: true })
              }
        })}
    }
    

    return(
        <>
        <Button fontFamily={'Raleway'} width='100%' justifyContent="flex-start" _hover={{bgColor: "none", cursor: "pointer"}} onClick={onOpen}>Report Reply</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent maxW="40rem">
                <ModalHeader fontFamily={'Raleway'}>Report Reply</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                        {/* <Flex mt='3vh'>
                            <FormLabel fontFamily={'Raleway'}>Reportee</FormLabel>
                            <Text fontFamily={'Raleway'} ml={20}>{display_name}</Text>
                        </Flex> */}
                        {/* <Flex mt='3vh'>
                            <FormLabel fontFamily={'Raleway'}>Type of Offense</FormLabel>
                            <RadioGroup name="offense" onChange={setOffense} value={offense}  ml={8}>
                                <Stack fontFamily={'Raleway'} direction='column'>
                                    <Radio value='Inappropriate Username' mb={2}>Inappropriate Username</Radio>
                                    <Radio value='Inappropriate Post' mb={2}>Inappropriate Post</Radio>
                                    <Radio value='Inappropriate Critique' mb={2}>Inappropriate Critique</Radio>
                                    <Radio value='Spamming' mb={2}>Spamming</Radio>
                                    <Radio value='Other' mb={2}>Other</Radio>
                                </Stack>
                            </RadioGroup>
                        </Flex> */}

                        <FormLabel fontFamily={'Raleway'}>Description</FormLabel>
                        <Textarea borderColor={useColorModeValue('black', 'white')} fontFamily={'Raleway'} w='30vw' placeholder='Your detail report...' onChange={(e)=>setMessage(e.target.value)}/>
                        <Center mt={10} mb={10}>
                            <Button  fontFamily={'Raleway'} bgColor={useColorModeValue('#2777C1','#0085FF')} color={useColorModeValue('#FFFFFF', '#FFFFFF')} _hover={{bgColor: useColorModeValue('#56AEFF', '#0B5090')}} colorScheme='blue' mr={3} onClick={submitReport} >
                                Submit
                            </Button>
                            <Button fontFamily={'Raleway'} bgColor={useColorModeValue('#C1272D', '#9E0B0F')} color={useColorModeValue('white', 'white')} _hover={{bgColor: useColorModeValue('#FF000A', '#470507')}} variant='ghost' onClick={onClose}>
                                Cancel
                            </Button>
                        </Center>
                </ModalBody>

                {/* <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                    </Button>
                    <Button variant='ghost'>Post</Button>
                </ModalFooter> */}
            </ModalContent>
        </Modal>
        
        
        </>
    )

}

export default ReportReply