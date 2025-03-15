import { Avatar, Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import useLogout from '../../hooks/useLogOut';
import useAuthStore from '../../store/authstore';
import { Link } from 'react-router-dom';

const SuggestedUserHeader = () => {
    const { handleLogout, isloggingOut } = useLogout();
    const authuser = useAuthStore((state) => state.user);

    if (!authuser) return null;

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={'center'} gap={2}>
                <Link to={`/${authuser.userName}`}>
                    <Avatar size={'lg'} src={authuser.profilePicURL || "https://via.placeholder.com/150"} />
                </Link>
                <Link to={`/${authuser.userName}`}>
                    <Text fontSize={12} fontWeight={'bold'}>{authuser.userName}</Text>
                </Link>
            </Flex>

            <Button
                size={'xs'}
                background={'transparent'}
                _hover={{ background: "transparent" }}
                fontSize={14}
                fontWeight={'medium'}
                color={'blue.400'}
                onClick={handleLogout}
                isLoading={isloggingOut}
                cursor={'pointer'}
            >
                Log out
            </Button>
        </Flex>
    );
};

export default SuggestedUserHeader;
