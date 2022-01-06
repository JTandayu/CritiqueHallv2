import React from 'react'
import Link from 'next/link'
import {Box, Text} from '@chakra-ui/react'

export const Posts = ({posts, loading}) => {
    if(loading){
        return <h2>Loading...</h2>
    }
    console.log(posts)

    return (
        <div>
            {posts.map( post =>(
                <Link href='/post/[id]'  as={`/post/${post.post_id}`}>
                    <a>
                    <Box w="100%" display={{lg: 'flex', sm: 'block'}} key={posts.post_id} mt='2ch' borderColor='white' border='1px solid'>
                        <Box p="3" w="100%" bg="light">
                            <Text>{post.hall_id.name}</Text>
                        </Box>
                        <Box p="3" w="100%" bg="light">
                            Image
                        </Box>
                        <Box p="3" w="100%" bg="light">
                            <Text>{post.title}</Text>
                        </Box>
                        <Box p="3" w="100%" bg="light">
                            Posted by: {post.display_name}
                        </Box>
                        <Box p="3" w="100%" bg="light" display='flex'>
                            <Box w="100%" bg="light">
                                {post.created_at}
                            </Box>
                            <Box w="100%" bg="light">
                                Options
                            </Box>      
                        </Box>                 
                    </Box>
                    </a>
                </Link>

            ))}
            
        </div>
    )
}
