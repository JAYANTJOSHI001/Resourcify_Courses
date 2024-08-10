import React from 'react';
import { Box, Flex, Text, Button, VStack, HStack, Icon } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { GoDotFill } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  
  const navigate=useNavigate();

  const handleClick= ()=> {
    navigate("/pricing");
  };

  return (
    <Box bg="gray.100" p={10} minH="100vh">
      <Text fontSize="4xl" color='orange.300' fontWeight='bolder' textAlign="center" mb={10}>
        Pricing
      </Text>
      <Flex 
        justify="center" 
        align="center" 
        flexWrap="wrap"
      >
        <Box
          w={{ base: "100%", md: "600px" }}
          h={{ base: 'auto', md:"auto"}}
          bg="#FEC00F"
          p={6}
          borderRadius="md"
          shadow="md"
          m={4}
          textAlign="center"
        >
          <HStack justifyContent='space-between'>
            <Text fontSize="2xl" fontWeight="bolder" color='white'>
              Learner
            </Text>
            <Text  fontSize='l' fontWeight=";ight" color='white'>
              $00.00/Mon
            </Text>
          </HStack>
          <Text fontSize="sm" align='right' color="#FED04B" mb={4}>
            7-Day Free Trial
          </Text>
          <VStack align="start" mb={6}>
            <HStack>
              <Icon as={CheckIcon} color="green.500" />
              <Text color='white'>Access to all courses</Text>
            </HStack>
            <HStack>
              <Icon as={CheckIcon} color="green.500" />
              <Text color='white'>Access to all course materials</Text>
            </HStack>
            <HStack>
              <Icon as={CheckIcon} color="green.500" />
              <Text color='white'>Enroll in multiple courses at once</Text>
            </HStack>
            <HStack>
              <Icon as={CheckIcon} color="green.500" />
              <Text color='white'>Access to certificate after completing courses</Text>
            </HStack>
            <HStack>
              <Icon as={CheckIcon} color="green.500" />
              <Text color='white'>Access to student community</Text>
            </HStack>
          </VStack>
          <Button bg='black' variant="solid" w='100%' color='white' _hover={{bg : 'white', color : 'black'}} onClick={handleClick}>
            CURRENT PLAN
          </Button>
        </Box>
        
        <Box
          w={{ base: "100%", md: "600px" }}
          h={{ base: 'auto', md:"auto"}}
          bg="gray.100"
          border="3px solid #FEC35B"
          p={6}
          borderRadius="md"
          color="black"
          shadow="md"
          m={4}
          textAlign="center"
        >
          <HStack justifyContent='space-between'>
            <Text fontSize="2xl" fontWeight="bolder" >
              Educator Rookie
            </Text>
            <Text  fontSize='l'  fontWeight="bold" color="#FEC35B">
              $04.99/Course
            </Text>
          </HStack>
          <Text fontSize="sm" align='right' mb={4}>
            7-Day Free Trial
          </Text>
          <VStack align="start" mb={6}>
            <HStack>
              <Icon as={GoDotFill} color="red.100" />
              <Text >Access to make multiple courses</Text>
            </HStack>
            <HStack>
              <Icon as={GoDotFill} color="red.100" />
              <Text >Add customize certificate for enrollers</Text>
            </HStack>
            <HStack>
              <Icon as={CheckIcon} color="green.500" />
              <Text>Provide study materials</Text>
            </HStack>
            <HStack>
              <Icon as={GoDotFill} color="red.100" />
              <Text >Access to student community</Text>
            </HStack>
            <HStack>
              <Icon as={CheckIcon} color="green.500" />
              <Text>Access to creator community</Text>
            </HStack>
          </VStack>
          <Button bg='black' variant="solid" w='100%' color='white' _hover={{bg : 'white', color : 'black'}} onClick={handleClick}>
            VIEW PLAN
          </Button>
        </Box>
        <Box
          w={{ base: "100%", md: "600px" }}
          h={{ base: 'auto', md:"auto"}}
          bg="gray.100"
          border="3px solid #FEC35B"
          p={6}
          borderRadius="md"
          color="black"
          shadow="md"
          m={4}
          textAlign="center"
        >
          <HStack justifyContent='space-between'>
            <Text fontSize="2xl" fontWeight="bolder">
              Educator Intermediate
            </Text>
            <Text  fontSize='l' fontWeight="bold" color="#FEC35B">
              $9.99/Week
            </Text>
          </HStack>
          <Text fontSize="sm" align='right' mb={4}>
            7-Day Free Trial
          </Text>
          <VStack align="start" mb={6}>
            <HStack>
              <Icon as={CheckIcon} color="green.500" />
              <Text>Access to make multiple courses</Text>
            </HStack>
            <HStack>
              <Icon as={CheckIcon} color="green.500" />
              <Text>Add customize certificate for enrollers</Text>
            </HStack>
            <HStack>
              <Icon as={CheckIcon} color="green.500" />
              <Text>Provide study materials</Text>
            </HStack>
            <HStack>
              <Icon as={GoDotFill} color="red.200" />
              <Text>Access to student community</Text>
            </HStack>
            <HStack>
              <Icon as={CheckIcon} color="green.500" />
              <Text>Access to creator community</Text>
            </HStack>
          </VStack>
          <Button bg='black' variant="solid" w='100%' color='white' _hover={{bg : 'white', color : 'black'}} onClick={handleClick}>
            VIEW PLAN
          </Button>
        </Box>
        <Box
          w={{ base: "100%", md: "600px" }}
          h={{ base: 'auto', md:"auto"}}
          bg="gray.100"
          border="3px solid #FEC35B"
          p={6}
          borderRadius="md"
          color="black"
          shadow="md"
          m={4}
          textAlign="center"
        >
          <HStack justifyContent='space-between'>
            <Text fontSize="2xl" fontWeight="bolder">
              Educator Pro
            </Text>
            <Text  fontSize='l' fontWeight="bold" color="#FEC35B">
              $24.99/Month
            </Text>
          </HStack>
          <Text fontSize="sm" align='right' mb={4}>
            7-Day Free Trial
          </Text>
          <VStack align="start" mb={6}>
            <HStack>
              <Icon as={CheckIcon} color="green.500" />
              <Text>Access to make multiple courses</Text>
            </HStack>
            <HStack>
              <Icon as={CheckIcon} color="green.500" />
              <Text>Add customize certificate for enrollers</Text>
            </HStack>
            <HStack>
              <Icon as={CheckIcon} color="green.500" />
              <Text>Provide study materials</Text>
            </HStack>
            <HStack>
              <Icon as={CheckIcon} color="green.500" />
              <Text>Access to student community</Text>
            </HStack>
            <HStack>
              <Icon as={CheckIcon} color="green.500" />
              <Text>Access to creator community</Text>
            </HStack>
          </VStack>
          <Button bg='black' variant="solid" w='100%' color='white' _hover={{bg : 'white', color : 'black'}} onClick={handleClick}>
            VIEW PLAN
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Pricing;
