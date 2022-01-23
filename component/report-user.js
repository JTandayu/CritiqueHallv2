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
  } from "@chakra-ui/react"
import { useDisclosure } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import styles from "@styles/Hall.module.css";
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import {useCookies} from 'react-cookie'
import { useEffect, useState } from "react";
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import axios from "axios";


// export async function getServerSideProps(context) {
//     return {
//       props: {}, // will be passed to the page component as props
//     }
// }


function ReportUser({data}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { API_URL } = process.env
    const { API_KEY } = process.env

    const [cookie, setCookie] = useCookies('token', 'id', 'encrypted_id', 'display_name')
    const [offense, setOffense] = useState('Inappropriate Username')
    const [message, setMessage] = useState('')
    // console.log(data.encrypted_id)

    const config = {
        headers: { 
          'content-type': 'multipart/form-data',
          'X-API-KEY': `${API_KEY}`,
          'Authorization': 'Basic Y2Fwc3RvbmUyMDIxOjEyMzQ=',
          // 'Accept-Encoding': 'gzip, deflate, br',
          'Accept': 'application/json',
          'token': cookie.token,
          'user_id': cookie.encrypted_id
        }
    }

    const submitReport = () =>{
        let formData = new FormData;
        formData.append("user_id", data.encrypted_id)
        // formData.append("post_id", null)
        // formData.append("critique_id", null)
        // formData.append("reply_id", null)
        formData.append("message", message)
        formData.append("offense_type", offense)
        console.log(offense)

        axios.post(`${API_URL}/api/submit_report`, formData, config)
        .then((response)=>{
            console.log(response.data)
        })
        .catch((error)=>{
            console.log(error.response)
        })
    }
    

    return(
        <>
        <button onClick={onOpen}>Report</button>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent maxW="40rem">
                <ModalHeader>Report User</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                        <Flex mt='3vh'>
                            <FormLabel>Reportee</FormLabel>
                            <Text ml={20}>{cookie.display_name}</Text>
                        </Flex>
                        <Flex mt='3vh'>
                            <FormLabel>Type of Offense</FormLabel>
                            {/* <Flex flexDir='column' ml={8}>
                                <Checkbox size='md' mb={2}>
                                    Inappropriate Post
                                </Checkbox>
                                <Checkbox size='md' mb={2}>
                                    Inappropriate Critique
                                </Checkbox>
                                <Checkbox size='md' mb={2}>
                                    Inappropriate Username
                                </Checkbox>
                                <Checkbox size='md' mb={2}>
                                    Spamming
                                </Checkbox>
                                <Checkbox size='md' mb={2}>
                                    Other
                                </Checkbox>
                            </Flex> */}
                            <RadioGroup name="offense" onChange={setOffense} value={offense}  ml={8}>
                                <Stack direction='column'>
                                    <Radio value='Inappropriate Username' mb={2}>Inappropriate Username</Radio>
                                    <Radio value='Inappropriate Post' mb={2}>Inappropriate Post</Radio>
                                    <Radio value='Inappropriate Critique' mb={2}>Inappropriate Critique</Radio>
                                    <Radio value='Spamming' mb={2}>Spamming</Radio>
                                    <Radio value='Other' mb={2}>Other</Radio>
                                </Stack>
                            </RadioGroup>
                        </Flex>

                        <FormLabel>Description</FormLabel>
                        <Textarea w='30vw' bg='white' placeholder='Your detail report...' color='black' onChange={(e)=>setMessage(e.target.value)}/>
                        <Center mt={10} mb={10}>
                            <Button colorScheme='blue' mr={3} onClick={submitReport} >
                                Submit
                            </Button>
                            <Button variant='ghost' onClick={onClose}>
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

export default ReportUser