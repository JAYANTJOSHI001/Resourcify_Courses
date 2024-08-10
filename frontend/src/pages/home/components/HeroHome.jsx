import { Box, Button, Center, ChakraProvider, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { FaBoltLightning } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export default function HeroHome() {
  return (
    <Box my={{ base: "50px", md: "130px" }}>
      <ChakraProvider>
        <Center>
          <HStack
            bg="white"
            borderRadius="10px"
            p={{ base: "5px", md: "10px" }}
            flexDirection='row'
          >
            <Icon
              as={FaBoltLightning}
              bg="orange.100"
              p={{ base: "5px", md: "10px" }}
              m="10px"
              w={{ base: 8, md: 12 }}
              h={{ base: 8, md: 12 }}
              borderRadius="10px"
            />
            <HStack>
              <Text
                color="orange.300"
                fontSize={{ base: "20px", md: "40px" }}
                fontWeight="bold"
                textAlign="center"
              >
                Unlock
              </Text>
              <Text
                fontSize={{ base: "20px", md: "40px" }}
                pr='10px'
                fontWeight="bold"
                textAlign="center"
              >
                Your Creative Potential
              </Text>
            </HStack>
          </HStack>
        </Center>
        <Center my="25px">
          <Box>
            <Text fontSize={{ base: "15px", md: "25px" }} textAlign="center">
            with Online Courses Across All Disciplines.
            </Text>
          </Box>
        </Center>
        <Center my="25px">
          <Box>
            <Text fontSize={{ base: "12px", md: "15px" }} textAlign="center">
              Learn from Industry Experts and Enhance Your Skills.
            </Text>
          </Box>
        </Center>
        <Center my="25px">
          <HStack spacing="10px">
            <Button
              color="white"
              bg="orange.400"
              _hover={{ bg: "orange.500" }}
              m="10px"
            >
              <NavLink to="/signup">Explore Courses</NavLink>
            </Button>
            <Button
              color="black"
              bg="white"
              _hover={{ bg: "gray.100" }}
              m="10px"
            >
              <NavLink to="/pricing">View Pricing</NavLink>
            </Button>
          </HStack>
        </Center>
      </ChakraProvider>
    </Box>
  );
}
