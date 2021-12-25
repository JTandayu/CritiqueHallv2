import { Avatar, Flex, Heading, IconButton, Text, Divider, Button, Box } from "@chakra-ui/react"
import { HamburgerIcon } from '@chakra-ui/icons'
import { useState } from "react"

function Sidebar(){
    const [navSize, changeNavSize] = useState('large')

    return(
        <>
        {/* <Flex
                p='5%'
                flexDir='column'
                alignItems='flex-start'
                as='nav'
            >
                <IconButton
                background='none'
                mt={5}
                _hover={{background: 'none'}}
                icon={<HamburgerIcon />}
                onClick={()=>{
                    if(navSize == 'small')
                        changeNavSize('large')
                    else
                        changeNavSize('small')
                }}
                >

                </IconButton>

            </Flex>

        <Flex
        pos="sticky"
        left='5'
        h='95vh'
        mt='2.5vh'
        boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.05)'
        w={navSize == 'small' ? '75px' : '200px'}
        flexDir='column'
        justifyContent='space-between'
        >
            
            <Flex  
            p='5%'
            flexDir='column'
            w='100%'
            alignItems='flex-start'
            mb={4}
            >
                <Divider display={navSize == 'small' ? 'none' : 'flex'} />
                <Flex>
                    <Avatar size='sm' />
                    <Flex flexDir='column' ml={4} display={navSize == 'small' ? 'none' : 'flex'}>
                        <Heading as='h3' size='sm'>UserName</Heading>
                        <Text color='gray'>User</Text>
                    </Flex>
                </Flex>

            </Flex>

        </Flex> */}

        <Button 
        onClick={()=>{
                    if(navSize == 'small')
                        changeNavSize('large')
                    else
                        changeNavSize('small')
                }}>   
        <HamburgerIcon />
        </Button>

        <Box right='0' w='10vh' h='100%' position='static' boxShadow='md' border='1px solid black'>
                
        </Box>
        </>
    )
}

export default Sidebar