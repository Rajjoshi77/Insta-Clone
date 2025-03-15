import { Avatar, AvatarGroup, Button, Flex, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import useUserProfileStore from '../../store/userProfileStore'
import useAuthStore from '../../store/authstore';
import EditProfile from './EditProfile';
import useFollowUser from '../../hooks/useFollowUser';

const ProfileHeader = () => {
    const { userProfile } = useUserProfileStore();
    const authuser = useAuthStore((state) => state.user);
    const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(userProfile?.uid);
    const visitingOwnProfileAndAuth = authuser && authuser.userName == userProfile.userName;
    const visitingAnotherProfileAndAuth = authuser && authuser.userName !== userProfile.userName;
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: 'column', sm: 'row' }}>
            <AvatarGroup
                size={{ base: "xl", sm: "2xl" }}
                justifySelf={'center'}
                alignSelf={'flex-start'}
                mx={'auto'}
            >
                <Avatar name='Raj joshi' src={userProfile.profilePicURL} alt="profile pic" />
            </AvatarGroup>

            <VStack gap={2} alignItems={'start'} mx={'auto'} flex={1}>
                <Flex
                    gap={4}
                    direction={{ base: "column", sm: 'row' }}
                    justifyContent={{ base: "center", sm: "flex-start" }}
                    alignItems={'center'}
                    w={'full'}
                >
                    <Text fontSize={{ base: 'sm', md: 'lg' }}>{userProfile.userName}</Text>
                    {visitingOwnProfileAndAuth && (
                        <>
                            <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
                                <Button bg={'gray.600'} color={'white'} _hover={{ bg: "gray.900" }} size={{ base: "xs", md: "sm" }} onClick={onOpen}>
                                    Edit Profile
                                </Button>
                            </Flex>
                            <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
                                <Button bg={'gray.600'} color={'white'} _hover={{ bg: "gray.900" }} size={{ base: "xs", md: "sm" }}>
                                    View Archive
                                </Button>
                            </Flex>
                            <svg aria-label="Options" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" pointer="cursor"><title>Options</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" ></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>

                        </>
                    )}


                    {visitingAnotherProfileAndAuth && (
                        <>
                            <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
                                <Button bg={'blue.600'} color={'white'} _hover={{ bg: "gray.900" }} size={{ base: "xs", md: "sm" }} onClick={handleFollowUser} isLoading={isUpdating} >
                                    {isFollowing ? "Unfollow" : "Follow"}
                                </Button>
                            </Flex>

                        </>
                    )}
                </Flex>
                <Flex
                    alignItems={'center'}
                    gap={{ base: 2, md: 4 }}
                >
                    <Text fontSize={{ base: 'xs', md: 'sm' }}>
                        <Text as='span' fontWeight={'bold'} mr={1}>{userProfile.posts.length}</Text>
                        posts
                    </Text>

                    <Text fontSize={{ base: 'xs', md: 'sm' }}>
                        <Text as='span' fontWeight={'bold'} mr={1}>{userProfile.followers.length}</Text>
                        followers
                    </Text>

                    <Text fontSize={{ base: 'xs', md: 'sm' }}>
                        <Text as='span' fontWeight={'bold'} mr={1}>{userProfile.following.length}</Text>
                        following
                    </Text>
                </Flex>
                <Flex alignItems={'center'} gap={4}>
                    <Text fontSize={'sm'} fontWeight={'bold'} >
                        {userProfile.fullName}
                    </Text>
                </Flex>
                <Text fontSize={'sm'} >
                    {userProfile.bio}
                </Text>
            </VStack>
            {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
        </Flex>
    )
}

export default ProfileHeader
