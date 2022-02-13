import { Box, Flex, Text, Spacer, Heading, SimpleGrid } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'

    
export default function Footer(){
    return(
        <>
        <Box w="100%" h="25vh" bgColor="#E7E7E7" p={7} display="flex">
            <Box w="50%">
                <Heading size="xl" fontFamily={'Raleway'} color="#C1272D">Our Story</Heading>
                <Text fontFamily={'Raleway'} mt={5} pr={16}>This project began last October and was made possible by four 4th year friends from Web Developmnet. We understood the hardships brought about by the new normal, that is why Critique Hall was developed to serve as a place for students to not only connect but also learn from each other.</Text>
                <Text fontFamily={'Raleway'} display="flex">For Inquiries, send an email to <Text fontFamily={'Raleway'} color="#1BA3C1" ml={1}>critiquehall@gmail.com</Text></Text>
            </Box>
            <Spacer />
            <Box w="50%">
                <Heading size="xl" fontFamily={'Raleway'} color="#C1272D">The Researchers</Heading>
                <Box w="full" mt={5}>
                    <SimpleGrid columns={2} spacing={5}>
                        <Box w="30em" px={3}>
                            <Flex>
                                <Text fontFamily={'Raleway'} color="#29226E">Azariah Danizar G. Concepcion</Text>
                                <Text fontFamily={'Raleway'} ml={2}>Back-end Dev</Text>
                            </Flex>
                            <Text fontFamily={'Raleway'}>(+63) 949 846 0846</Text>
                        </Box>
                        <Box w="30em" px={3}>
                            <Flex>
                                <Text fontFamily={'Raleway'} color="#29226E">Richie Gene R. Tan</Text>
                                <Text fontFamily={'Raleway'} ml={2}>UI/UX Designer</Text>
                            </Flex>
                            <Text fontFamily={'Raleway'}>(+63) 916 424 9531</Text>
                        </Box>
                        <Box w="30em" px={3}>
                            <Flex>
                                <Text fontFamily={'Raleway'} color="#29226E">Jomari L. Matias</Text>
                                <Text fontFamily={'Raleway'} ml={2}>Project Documentarian</Text>
                            </Flex>
                            <Text fontFamily={'Raleway'}>(+63) 998 084 4162</Text>
                        </Box>
                        <Box w="30em" px={3}>
                            <Flex>
                                <Text fontFamily={'Raleway'} color="#29226E">Jose Luis P. Tandayu</Text>
                                <Text fontFamily={'Raleway'} ml={2}>Front-end Dev</Text>
                            </Flex>
                            <Text fontFamily={'Raleway'}>(+63) 916 418 7235</Text>
                        </Box>
                    </SimpleGrid>
                </Box>
            </Box>
        </Box>
        </>
    )
}


                    
                