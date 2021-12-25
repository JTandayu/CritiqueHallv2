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


// export async function getServerSideProps(context) {
//     return {
//       props: {}, // will be passed to the page component as props
//     }
// }


function ReportUser() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <>
        <button onClick={onOpen} className={styles.cpbutton}>Create Post</button>


        <form action='' method='POST'>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent maxW="50rem">
                <ModalHeader>Report User</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <form action="" method="POST">
                        <Flex mt='3vh'>
                            <FormLabel>Reportee</FormLabel>
                            <Text ml={20}>Lorem Ipsum</Text>
                            
                        </Flex>
                        <Flex mt='3vh'>
                            <FormLabel>Type of Offense</FormLabel>
                            <Flex flexDir='column' ml={8}>
                                <Checkbox size='md' mb={2}>
                                    Checkbox
                                </Checkbox>
                                <Checkbox size='md' mb={2}>
                                    Checkbox
                                </Checkbox>
                                <Checkbox size='md' mb={2}>
                                    Checkbox
                                </Checkbox>
                                <Checkbox size='md' mb={2}>
                                    Checkbox
                                </Checkbox>
                                <Checkbox size='md' mb={2}>
                                    Checkbox
                                </Checkbox>
                                <Checkbox size='md' mb={2}>
                                    Checkbox
                                </Checkbox>
                            </Flex>
                            

                            
                        </Flex>

                        <FormLabel>Description</FormLabel>
                        <Textarea w='30vw' bg='white' color='black' />
                        <Center mt={10} mb={10}>
                            <Button type='submit' colorScheme='blue' mr={3} >
                                Submit
                            </Button>
                            <Button variant='ghost' onClick={onClose}>
                                Cancel
                            </Button>
                        </Center>

                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                    </Button>
                    <Button variant='ghost'>Post</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </form>
        
        
        </>
    )

}

export default ReportPost