import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { BsBookmark, BsGrid3X3, BsHeart, BsSuitHeart } from 'react-icons/bs';

const ProfileTabs = () => {
    return (
        <Flex
            w={'full'}
            justifyContent={'center'}
            gap={{ base: 4, sm: 10 }}
            textTransform={'uppercase'}
            fontWeight={'bold'}
        >
            <Flex borderTop={'1px solid white'} alignItems={'center'} gap={1} p={3} cursor={'pointer'} >
                <Box fontSize={20}>
                    <BsGrid3X3 />
                </Box>
                <Text fontSize={12} display={{ base: 'none', sm: "block" }}>Posts</Text>
            </Flex>

            <Flex alignItems={'center'} gap={1} p={3} cursor={'pointer'} >
                <Box fontSize={20}>
                    <BsBookmark />
                </Box>
                <Text fontSize={12} display={{ base: 'none', sm: "block" }}>Saved</Text>
            </Flex>

            <Flex alignItems={'center'} gap={1} p={3} cursor={'pointer'} >
                <Box fontSize={20}>
                    <BsHeart />
                </Box>
                <Text fontSize={12} display={{ base: 'none', sm: "block" }}>Likes</Text>
            </Flex>
        </Flex>
    )
}

export default ProfileTabs
