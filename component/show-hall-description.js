import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Heading,
  } from "@chakra-ui/react"
import { useDisclosure } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import styles from "@styles/Hall.module.css";

// export async function getStaticProps(context) {
//     const res = await fetch(`https://...`)
//     const history = await res.json()


//     return {
//       props: { history }, // will be passed to the page component as props
//     }
// } 
  

function ShowHallDescription({hall, color, fontColor}) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <>
        <Button onClick={onOpen} ml={5} bgColor={color} _hover={{bgColor: color}}>Read More</Button>

        <form action='' method='POST'>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent maxW="40rem" h='40vh' bgColor={color} color={fontColor}>
                <ModalHeader><Heading align='center' size='lg'>{hall}</Heading></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Hello
                </ModalBody>
            </ModalContent>
        </Modal>
        </form>
        
        
        </>
    )

}

export default ShowHallDescription