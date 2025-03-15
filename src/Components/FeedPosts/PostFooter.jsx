import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../Assests/Constants';
import { color } from 'framer-motion';

const PostFooter = ({ username, isProfilePage }) => {
    const [liked, setliked] = useState(false);
    const [likes, setlikes] = useState(1000)

    const handleLike = () => {
        if (liked) {
            setliked(false);
            setlikes(likes - 1);
        }
        else {
            setliked(true);
            setlikes(likes + 1);
        }
    };

    return (
        <Box mb={10} marginTop={'auto'}>
            <Flex alignItems={'center'} gap={4} w={'full'} pt={0} mb={2} mt={'auto'} >
                <Box onClick={handleLike} cursor={'pointer'} fontSize={18}>
                    {!liked ? <NotificationsLogo /> : <UnlikeLogo />}
                </Box>
                <Box cursor={"pointer"} fontSize={18}>
                    <CommentLogo />
                </Box>
            </Flex>
            <Text fontSize={'sm'} fontWeight={600}>
                {likes} likes
            </Text>

            {!isProfilePage && (
                <>
                    <Text fontSize={'sm'} fontWeight={700}>
                        {username}{" "}
                        <Text as={'span'} fontWeight={400}>
                            feeling Good vibes!
                        </Text>
                    </Text>
                    <Text fontSize={12} color={'gray'}>
                        View all 1,000 Comments
                    </Text></>
            )}

            <Flex
                alignItems={'center'}
                justifyContent={'space-between'}
                gap={5}
                w={'full'}
            >
                <InputGroup>
                    <Input variant={'flushed'} placeholder={'Add a comment....'} fontSize={14} />
                    <InputRightElement>
                        <Button
                            fontSize={14}
                            color={'blue.500'}
                            fontWeight={600}
                            cursor={'pointer'}
                            _hover={{ color: 'white' }}
                            bg={'transparent'}
                        >
                            Post
                        </Button>
                    </InputRightElement>
                </InputGroup>

            </Flex>

        </Box>
    )
}

export default PostFooter
