import {
  Flex,
  Box,
  HStack,
  Button,
  Spacer,
  Heading,
  Image, 
  Text,
  Icon,
  List,
  ListItem,
  ListIcon,
  Center,
  Stack,
  VStack,
  chakra
} from '@chakra-ui/react';
import { 
  EmailIcon,
  PhoneIcon,
  AtSignIcon,
} from "@chakra-ui/icons";
import { FaFacebook , FaTwitterSquare, FaLinkedin } from "react-icons/fa";

export default function Navbar(){
  return (
    <Box bg="white" py={{ base: "10px", md: "20px" }} px={{ base: "20px", md: "100px" }}>
        <Flex direction={{ base: "column", md: "row" }} align="start" justify="space-between">
          <Box mb={{ base: "20px", md: "0" }}>
            <Image src="../../public/img/Resourcify.png" alt="Logo" maxWidth="150px" pb="20px" />
            <List spacing={4}>
              <ListItem>
                <ListIcon as={EmailIcon} color='black' />
                resourcifycourses@gmail.com
              </ListItem>
              <ListItem>
                <ListIcon as={PhoneIcon} color='black' />
                +91-9888237022
              </ListItem>
              <ListItem>
                <ListIcon as={AtSignIcon} color='black' />
                Ludhiana, Punjab, India
              </ListItem>
            </List>
          </Box>
          <Box p={{ base: "0", md: "20px" }}>
            <List spacing={4}>
                <ListItem>
                  <Text fontWeight="bold" fontFamily="sans-serif">Home</Text>
                </ListItem>
                <ListItem>
                  <Text fontFamily="sans-serif">Benefits</Text>
                </ListItem>
                <ListItem>
                  <Text fontFamily="sans-serif">Our Courses</Text>
                </ListItem>
                <ListItem>
                  <Text fontFamily="sans-serif">Our Testimonials</Text>
                </ListItem>
                <ListItem>
                  <Text fontFamily="sans-serif">Our FAQ</Text>
                </ListItem>
            </List>
          </Box>
          <Box p={{ base: "0", md: "20px" }}>
            <List spacing={4}>
                <ListItem>
                  <Text fontWeight="bold" fontFamily="sans-serif">About Us</Text>
                </ListItem>
                <ListItem>
                  <Text fontFamily="sans-serif">Company</Text>
                </ListItem>
                <ListItem>
                  <Text fontFamily="sans-serif">Achievements</Text>
                </ListItem>
                <ListItem>
                  <Text fontFamily="sans-serif">Our Goals</Text>
                </ListItem>
            </List>
          </Box>
          <Box p={{ base: "0", md: "20px" }}>
            <List spacing={4}>
                <ListItem>
                  <Text fontWeight="bold" fontFamily="sans-serif">Social Profiles</Text>
                </ListItem>
                <ListItem>
                  <HStack spacing={4}>
                    <Icon as={FaFacebook} w={8} h={8} p="5px" />
                    <Icon as={FaTwitterSquare} w={8} h={8} p="5px" />
                    <Icon as={FaLinkedin} w={8} h={8} p="5px" />
                  </HStack>
                </ListItem>
            </List>
          </Box>
        </Flex>
        <Center mt={{ base: "20px", md: "40px" }}>
          <Text>All rights are reserved to ResourcifyCourses</Text>
        </Center>
    </Box>
  );
}
