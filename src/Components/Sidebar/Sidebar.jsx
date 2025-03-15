import { Avatar, Box, Button, Center, Flex, Icon, Link, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { CreatePostLogo, InstagramLogo, InstagramMobileLogo, NotificationsLogo, SearchLogo } from '../../Assests/Constants'
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import useLogout from '../../hooks/useLogOut';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Auth } from '../../firebase/firebase';
import useAuthStore from '../../store/authstore';
// import { link, text } from 'framer-motion/client';
// import HomePages from '../../pages/HomePages/HomePages';l

const Sidebar = () => {
  const authuser = useAuthStore((state) => state.user);
  const sidebarItems = [
    {
      icon: <AiFillHome size={25} />,
      text: "Home",
      link: "/",
    },
    {
      icon: <SearchLogo />,
      text: "Search",
    },
    {
      icon: <NotificationsLogo />,
      text: "Notification",
    },
    {
      icon: <CreatePostLogo />,
      text: "Create",
    },
    {
      icon: <Avatar size={"sm"} name="Raj Joshi" src="/public/profilepic.png" />,
      text: "Profile",
      link: authuser ? `/${authuser?.userName}` : "/auth"
    },
  ];

  const { handleLogout, isloggingOut } = useLogout();

  return (
    <div>
      <Box
        h={"100vh"}
        borderRight={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"sticky"}
        top={0}
        left={0}
        px={{ base: 2, md: 4 }}
        py={8}
      >
        <Flex direction={"column"} gap={10} w={"full"} h={"full"}>
          {/* Logo */}
          <Link to="/" as={RouterLink} pl={2} display={{ base: "none", md: "block" }} cursor={"pointer"}>
            <InstagramLogo />
          </Link>
          <Link
            to="/"
            as={RouterLink}
            pl={2}
            display={{ base: "block", md: "none" }}
            cursor={"pointer"}
            borderRadius={6}
            _hover={{
              bg: "whiteAlpha.300",
            }}
            w={10}
          >
            <InstagramMobileLogo />
          </Link>

          {/* Sidebar Items */}
          <Flex direction={"column"} gap={"5"} cursor={"pointer"}>
            {sidebarItems.map((item, index) => (
              <Tooltip key={index} hasArrow label={item.text} placement={"right"} ml={1} openDelay={500}>
                <Link
                  display={"flex"}
                  to={item.link || "#"}
                  as={RouterLink}
                  alignItems={"center"}
                  gap={4}
                  _hover={{ bg: "whiteAlpha.400" }}
                  borderRadius={6}
                  p={2}
                  w={{ base: 10, md: "full" }}
                  justifyContent={{ base: "center", md: "flex-start" }}
                >
                  {item.icon}
                  <Box display={{ base: "none", md: "block" }}>{item.text}</Box>
                </Link>
              </Tooltip>
            ))}
          </Flex>

          {/* Logout Button */}
          <Tooltip hasArrow label={"Logout"} placement={"right"} ml={1} openDelay={500}>
            <Flex
              as="button"
              onClick={handleLogout}
              alignItems={"center"}
              gap={4}
              _hover={{ bg: "whiteAlpha.400" }}
              borderRadius={6}
              p={2}
              mt={"auto"}
              w={{ base: 10, md: "full" }}
              justifyContent={{ base: "center", md: "flex-start" }}
            >
              <BiLogOut size={25} />
              <Button
                variant={"ghost"}
                _hover={{ bg: "transparent" }}
                isLoading={isloggingOut}
                display={{ base: "none", md: "block" }}
              >
                Logout
              </Button>
            </Flex>
          </Tooltip>
        </Flex>
      </Box>
    </div>
  );
};

export default Sidebar;
