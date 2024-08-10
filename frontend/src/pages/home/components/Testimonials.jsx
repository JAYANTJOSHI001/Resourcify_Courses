import { Box, Button, Center, Img, ChakraProvider, Grid, HStack, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function OurTestimonials() {
  return (
    <ChakraProvider>
      <Box ml={{ base: "20px", md: "50px", lg: "100px" }} mb="60px">
        <Text fontSize={{ base: "24px", md: "28px", lg: "30px" }} fontWeight="semibold" textAlign="center" mb="20px">
          Testimonials
        </Text>
        <SimpleGrid p="10px" spacing={10} maxWidth="1300px" columns={{ base: 1, md: 2, xl: 2}}>
            <Box w={{base : '100%', md : '150%', lg : '175%'}}>
                <Text>
                At Resourcify, we pride ourselves on delivering exceptional courses that resonate with our learners. Here are a few testimonials from individuals who have benefited from our free, high-quality educational offerings:
                </Text>
            </Box>
            <Box textAlign={{base : 'left', md : 'right'}}>
                <Button border='1px solid black' _hover={{bg : 'black', color : 'white'}}>
                <NavLink to="/courses">View all</NavLink>
                </Button>
            </Box>
            </SimpleGrid>

        <SimpleGrid p="10px" spacing={10} maxWidth="1300px" columns={{ base: 1, md: 2, xl: 2 }}>
          <Box bg="white" borderRadius="15px" p={4}>
            <Box px="30px" mb={4}>
              <Text mt="10px">
                The web design course provided a solid foundation for me. The instructors were knowledgeable and
                supportive, and the interactive learning environment was engaging. I highly recommend it!
              </Text>
            </Box>
            <Box bg="gray.50" p={4} borderRadius="15px" borderTop="2px solid whitesmoke">
              <HStack spacing={4}>
                <Img src="../../img/CImage1.png" alt="Client1" boxSize="50px" borderRadius="full" />
                <Text>Sarah L</Text>
              </HStack>
            </Box>
          </Box>
          <Box bg="white" borderRadius="15px" p={4}>
            <Box px="30px" mb={4}>
              <Text mt="10px">
                The UI/UX design course exceeded my expectations. The instructor's expertise and practical assignments
                helped me improve my design skills. I feel more confident in my career now. Thank you!
              </Text>
            </Box>
            <Box bg="gray.50" p={4} borderRadius="15px" borderTop="2px solid whitesmoke">
              <HStack spacing={4}>
                <Img src="../../img/CImage2.png" alt="Client1" boxSize="50px" borderRadius="full" />
                <Text>Max S</Text>
              </HStack>
            </Box>
          </Box>
          <Box bg="white" borderRadius="15px" p={4}>
            <Box px="30px" mb={4}>
              <Text mt="10px">
                The mobile app development course was fantastic! The step-by-step tutorials and hands-on projects helped
                me grasp the concepts easily. I'm now building my own app. Great course!
              </Text>
            </Box>
            <Box bg="gray.50" p={4} borderRadius="15px" borderTop="2px solid whitesmoke">
              <HStack spacing={4}>
                <Img src="../../img/CImage3.png" alt="Client1" boxSize="50px" borderRadius="full" />
                <Text>Susan G</Text>
              </HStack>
            </Box>
          </Box>
          <Box bg="white" borderRadius="15px" p={4}>
            <Box px="30px" mb={4}>
              <Text mt="10px">
                I enrolled in the graphic design course as a beginner, and it was the perfect starting point. The
                instructor's guidance and feedback improved my design abilities significantly. I'm grateful for this
                course!
              </Text>
            </Box>
            <Box bg="gray.50" p={4} borderRadius="15px" borderTop="2px solid whitesmoke">
              <HStack spacing={4}>
                <Img src="../../img/CImage4.png" alt="Client1" boxSize="50px" borderRadius="full" />
                <Text>Stefen B</Text>
              </HStack>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
    </ChakraProvider>
  );
}
