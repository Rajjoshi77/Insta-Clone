import { Box, Container, Flex, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import FeedPost from './FeedPost'

const FeedPosts = () => {
  const [isloading, setIsLoding] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoding(false)
    }, 2000);
  }, [])
  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {isloading && [0, 1, 2, 3].map((_, idx) => (
        <VStack key={idx} gap={4} alignItems={'flex-start'} mb={10}>
          <Flex gap={2}>
            <SkeletonCircle size={10} />
            <VStack gap={2} alignItems={'flex-start'}>
              <Skeleton height={"10px"} w={'200px'} />
              <Skeleton height={"10px"} w={'200px'} />
            </VStack>
          </Flex>
          <Skeleton w={'full'}>
            <Box h={'500px'}> Content Wrapped</Box>
          </Skeleton>
        </VStack>
      ))}
      {!isloading && (
        <>
          <FeedPost username='Julia' img="/public/img1.png" avatar="/public/img1.png" />
          <FeedPost username='Robin' img="/public/img2.png" avatar="/public/img2.png" />
          <FeedPost username='jonedoe' img="/public/img3.png" avatar="/public/img3.png" />
          <FeedPost username='jake' img="/public/img4.png" avatar="/public/img4.png" />
        </>
      )}
    </Container>
  )
}

export default FeedPosts
