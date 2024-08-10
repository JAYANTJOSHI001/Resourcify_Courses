import { Box, Button, ChakraProvider, SimpleGrid, Text, Icon } from "@chakra-ui/react";
import { MdArrowOutward } from "react-icons/md";

export default function Benefits() {
  return (
    <Box mx={{ base: "20px", md: "50px", lg: "100px" }} my={{ base: "30px", md: "80px", lg: "130px" }}>
      <ChakraProvider>
        <Text fontSize={{ base: "24px", md: "28px", lg: "30px" }} fontWeight="semibold" textAlign="center" mb="20px">
          Benefits
        </Text>
        <SimpleGrid p="10px" spacing={10} maxWidth="1300px" minChildWidth={{ base: "300px", md: "300px", lg: "300px", xl: "350px" }}>
          {[
            { number: "01", title: "Flexible Learning Schedule", description: "Fit your coursework around your existing commitments and obligations." },
            { number: "02", title: "Expert Instruction", description: "Learn from industry experts who have hands-on experience in design and development." },
            { number: "03", title: "Diverse Course Offerings", description: "Explore a wide range of design and development courses covering various topics." },
            { number: "04", title: "Updated Curriculum", description: "Access courses with up-to-date content reflecting the latest trends and industry practices." },
            { number: "05", title: "Practical Projects and Assignments", description: "Develop a portfolio showcasing your skills and abilities to potential employers." },
            { number: "06", title: "Interactive Learning Environment", description: "Collaborate with fellow learners, exchanging ideas and feedback to enhance your understanding." }
          ].map((benefit, index) => (
            <Box key={index} bg="white" borderRadius="15px" p="20px" height={{ base: "auto", lg: "360px" }}>
              <Text fontSize={{ base: "40px", md: "50px", lg: "60px" }} fontWeight="bolder" textAlign="right">
                {benefit.number}
              </Text>
              <Text fontSize={{ base: "18px", md: "20px", lg: "22px" }} fontWeight="semibold" mt="20px">
                {benefit.title}
              </Text>
              <Text fontSize={{ base: "14px", md: "15px", lg: "16px" }} mt="10px" mb="20px">
                {benefit.description}
              </Text>
              <Button
                display="flex"
                alignSelf="flex-end"
                mt="auto"
                h="65px"
                w="65px"
                borderRadius="10px"
                color="orange.300"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={MdArrowOutward} h={10} w={10} />
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </ChakraProvider>
    </Box>
  );
}
