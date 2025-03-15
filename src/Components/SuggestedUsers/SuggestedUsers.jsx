import React from 'react'
import SuggestedUserHeader from './SuggestedUserHeader'
import SuggestedUser from './SuggestedUser'
import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react'

const suggestedUsers = () => {
    return (
        <>
            <VStack py={8} gap={4}>
                <SuggestedUserHeader />
                <Flex justifyContent={"space-between"} alignItems={"center"} w={'full'}>
                    <Text fontSize={12} fontWeight={'bold'} color={'gray.500'} >Suggested User</Text>
                    <Text fontSize={12} fontWeight={'bold'} _hover={{ color: 'gray.400' }}  >See All</Text>
                </Flex>
                <SuggestedUser name="Robin" followers={1329} avatar='/public/img2.png' />
                <SuggestedUser name="jonedoe" followers={1409} avatar='/public/img3.png' />
                <SuggestedUser name="jake" followers={1785} avatar='/public/img4.png' />

                <Box fontSize={12} mt={5} color={'gray.500'} alignSelf={'start'}>
                    ©2024 Built by {" "}
                    <Link href='https://www.youtube.com/@CodeSpectrum7739' >
                        Raj Joshi
                    </Link>
                </Box>

            </VStack>

        </>
    )
}

export default suggestedUsers
