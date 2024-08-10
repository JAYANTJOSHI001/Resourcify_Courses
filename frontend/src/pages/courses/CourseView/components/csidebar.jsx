import React from 'react';
import { Box, VStack, HStack, Icon, Image, useDisclosure, Button } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoIosCompass } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useBreakpointValue} from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

export default function CSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sidebarWidth = useBreakpointValue({ base: "full", md: "200px" });
  const iconSize = useBreakpointValue({ base: "20px", md: "24px" });
  const direction = useBreakpointValue({ base: "row", md: "column" });
  const navigate=useNavigate();


  const [userDetails, setUserDetails] = useState(null);
  let d= useParams().uid;
  const username= d;

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/auth//users/id/${username}`);
            console.log(response);
            if (response.status === 200) {
                const userDetails = response.data;
                console.log('User details fetched successfully:', userDetails);
                // Set the user details in the state
                setUserDetails(userDetails);
            } else {
                console.error('Failed to fetch user details:', response.data.message);
                setError(response.data.message); // Set the error message from the response
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                setError(error.response.data.message);
            }
        }
    };

    const useid= userDetails?.username;

    useEffect(() => {
        fetchUserDetails(username);
    }, [username]);

    const handleExplore = () => {
      navigate(`/${useid}/student-browse`);
  };

    const handleDashboard = () => {
        navigate(`/dashboard/${useid}`);
    };



  return (
    <Box h='auto'>
      <Box h='100%'>
        <Box display={{ base: "block", md: "none" }} h='100%' p="4">
          <Button onClick={isOpen ? onClose : onOpen}>
            {isOpen ? <CloseIcon /> : <HamburgerIcon />}
          </Button>
        </Box>
        
        <Box
          w={{ base: sidebarWidth, md: "200px" }}
          bg="gray.100"
          p="4"
          h={{ base: "auto", md: "100%" }}
          position={{ base: "fixed", md: "relative" }}
          bottom={{ base: 0, md: "auto" }}
          zIndex={1}
          display={{ base: isOpen ? "block" : "none", md: "block" }}
        >
          <VStack align="start" direction={direction} spacing={{ base: 2, md: 4 }}>
            <Image src="../../../../../public/img/Resourcify.png" alt="Logo" maxW={{ base: "100px", md: "150px" }} />
            <HStack
              _hover={{ bg: '#E5B673', borderRight: { md: "5px solid #D88511" }, color: "gray.100" }}
              width="full"
              p="10px"
              fontWeight="bold"
              spacing={4}
            >
              <Icon as={MdSpaceDashboard} boxSize={iconSize} />
              <NavLink cursor="pointer" onClick={handleDashboard}>Dashboard</NavLink>
            </HStack>
            <HStack
              _hover={{ bg: '#E5B673', borderRight: { md: "5px solid #D88511" }, color: "gray.100" }}
              width="full"
              p="10px"
              fontWeight="bold"
              spacing={4}
            >
              <Icon as={IoIosCompass} boxSize={iconSize} />
              <NavLink cursor="pointer" onClick={handleExplore}>Analytics</NavLink>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}
