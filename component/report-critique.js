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


// export async function getServerSideProps(context) {
//     return {
//       props: {}, // will be passed to the page component as props
//     }
// }

function ReportCritique() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <>
        <button onClick={onOpen} className={styles.cpbutton}>Create Post</button>


        <form action='' method='POST'>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent>
                <ModalHeader>Report Critique</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Hello
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

export default ReportCritique