import { Avatar, Box, Button, Center, Divider, Flex, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { FaComment } from 'react-icons/fa'
import Comment from '../Comment/Comment'
import PostFooter from '../FeedPosts/PostFooter'


const ProfilePost = ({ img }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>

            <GridItem
                cursor={'pointer'}
                borderRadius={4}
                overflow={'hidden'}
                border={'1px solid '}
                borderColor={'whileAlpha.300'}
                position={'relative'}
                aspectRatio={1 / 1}
                onClick={onOpen}
            >
                <Flex
                    opacity={0}
                    _hover={{ opacity: 1 }}
                    position={'absolute'}
                    top={0}
                    bottom={0}
                    right={0}
                    left={0}
                    bg={'blackAlpha.700'}
                    transition={"all 0.3s ease"}
                    zIndex={1}
                    justifyContent={'center'}
                >
                    <Flex alignItems={'center'} justifyContent={'center'} gap={50} >
                        <Flex>
                            <AiFillHeart size={20} />
                            <Text fontWeight={'bold'} ml={2}>7</Text>
                        </Flex>
                        <Flex >
                            <FaComment size={20} />
                            <Text fontWeight={'bold'} ml={2}>2</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Image src={img} alt='posts' w={'100%'} h={"100%"} objectFit={'cover'} />
            </GridItem>

            <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: '3xl', md: '5xl' }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody bg={'black'} p={5}>
                        <Flex gap={4} w={{ base: '90%', sm: '70%', md: 'full' }} mx={'auto'}>
                            <Box borderRadius={4} overflow={'hidden'} border={'1px solid'} borderColor={'whiteAlpha.300'} flex={1.5}>
                                <Image src={img} alt='Profile pic' />
                            </Box>
                            <Flex flex={1} flexDir={'column'} px={10} display={{ base: 'none', md: 'flex' }}>
                                <Flex alignItems={'center'} justifyContent={'space-between'}>
                                    <Flex alignItems={'center'} gap={4}>
                                        <Avatar src='/public/profilepic.png' size={'sm'} name='Raj joshi' />
                                        <Text fontSize={12} fontWeight={'bold'}>
                                            Raj joshi
                                        </Text>
                                    </Flex>
                                    <Box _hover={{ bg: 'whiteAlpha.300', color: 'red.600' }} borderRadius={4}>
                                        <MdDelete size={20} cursor={'pointer'} />
                                    </Box>
                                </Flex>
                                <Divider my={4} bg={'gray.500'} />
                                <VStack w={'full'} alignItems={'start'} maxH={"350px"} overflowY={'auto'} >
                                    <Comment
                                        createAt={'13 hours ago'}
                                        username={"julia"}
                                        profilepic={"/public/img1.png"}
                                        text={'Nice Pic'}
                                    />

                                    <Comment
                                        createAt={'1 day ago'}
                                        username={"Robin"}
                                        profilepic={"/public/img2.png"}
                                        text={'Very nice'}
                                    />
                                    <Comment
                                        createAt={'2 weeks ago'}
                                        username={"jonedoe"}
                                        profilepic={"/public/img3.png"}
                                        text={'Fire'}
                                    />
                                </VStack>
                                <Divider my={4} bg={'gray.500'} />
                                <PostFooter isProfilePage={true} />
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal >
        </>
    )

}

export default ProfilePost;
