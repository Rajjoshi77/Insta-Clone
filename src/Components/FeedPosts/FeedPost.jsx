import React from 'react'
import PostHeader from './PostHeader'
import { Box, Image } from '@chakra-ui/react'
import PostFooter from './PostFooter'

const FeedPost = ({ img, username, avatar }) => {
    return (
        <>
            <PostHeader username={username} avatar={avatar} />
            <Box mb={3} borderRadius={4} overflow={'hidden'}>
                <Image src={img} alt={username} />
            </Box>
            <PostFooter username={username} />
        </>
    )
}

export default FeedPost
