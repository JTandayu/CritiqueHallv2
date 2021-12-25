// import { data } from "autoprefixer";

const { Box, Heading } = require("@chakra-ui/react");

export async function getStaticProps(){
    const { API_URL } = process.env
    const { API_KEY } = process.env

    const res =  await fetch(`${API_URL}/api`)
    const data = await res.json()

    return{
        props:{
            data
        }
    }
}

function HallIndicator(){

    return(
        <>
            <Box bg={data.color}>
                <Heading>{data.name}</Heading>
            </Box>
        </>
    )
}

export default HallIndicator