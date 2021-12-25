import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
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
  

function EditHistory() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <>
        <button onClick={onOpen} ml={5}>History</button>

        <form action='' method='POST'>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent maxW="40rem" h='40vh'>
                <ModalHeader>Edit History</ModalHeader>
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

export default EditHistory