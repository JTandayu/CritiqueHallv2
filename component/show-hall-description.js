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
  

function ShowHallDescription({hall_arts, hall_business, hall_technology, hall_lounge, color, fontColor}) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <>
        <Button size="lg" fontFamily={'Raleway'} onClick={onOpen} ml={5} bgColor={color} _hover={{bgColor: color}}>View</Button>

        <form action='' method='POST'>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent maxW="40rem" h='40vh' bgColor={color} color={fontColor}>
                <ModalHeader><Heading fontFamily={'Raleway'} align='center' size='lg'>{hall_arts}</Heading></ModalHeader>
                <ModalCloseButton />
                <ModalBody fontFamily={'Raleway'}>
                    Arts
                </ModalBody>
            </ModalContent>
        </Modal>
        </form>

        <form action='' method='POST'>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent maxW="40rem" h='40vh' bgColor={color} color={fontColor}>
                <ModalHeader><Heading fontFamily={'Raleway'} align='center' size='lg'>{hall_business}</Heading></ModalHeader>
                <ModalCloseButton />
                <ModalBody fontFamily={'Raleway'}>
                    Business
                </ModalBody>
            </ModalContent>
        </Modal>
        </form>

        <form action='' method='POST'>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent maxW="40rem" h='40vh' bgColor={color} color={fontColor}>
                <ModalHeader><Heading fontFamily={'Raleway'} align='center' size='lg'>{hall_technology}</Heading></ModalHeader>
                <ModalCloseButton />
                <ModalBody fontFamily={'Raleway'}>
                    Technology
                </ModalBody>
            </ModalContent>
        </Modal>
        </form>

        <form action='' method='POST'>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent maxW="40rem" h='40vh' bgColor={color} color={fontColor}>
                <ModalHeader><Heading fontFamily={'Raleway'} align='center' size='lg'>{hall_lounge}</Heading></ModalHeader>
                <ModalCloseButton />
                <ModalBody fontFamily={'Raleway'}>
                    Lounge
                </ModalBody>
            </ModalContent>
        </Modal>
        </form>
        
        
        </>
    )

}

export default ShowHallDescription