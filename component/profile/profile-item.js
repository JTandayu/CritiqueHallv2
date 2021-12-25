import { Box, Heading, Image } from "@chakra-ui/react"

export async function getStaticProps(){
    const { API_URL } = process.env
    const { API_KEY } = process.env

    const res = await fetch(`${API_URL}/api`)
    const data = res.json()

    console.log(data)

    return{
        props:{
            data
        }
    }
}


function ProfilePost({data}) {
    return(
        <>
        {data.map((data)=>
        <Box w='30vh' h='45vh'>
            <Heading size='md' as='h3'>{data.title}</Heading>
            <Image w='20vh' h='20vh' justifySelf='center' src="{data.image}" />
            <Text fontSize='sm'>{data.stars}</Text>
        </Box>
        )}
        
        </>
        
    )
}

export default ProfilePost