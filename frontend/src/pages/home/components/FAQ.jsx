import { useState } from "react";
import { Box, Button, ChakraProvider, Text, HStack, Icon } from "@chakra-ui/react";
import { CiCirclePlus } from "react-icons/ci";
import { NavLink } from "react-router-dom";

export default function FAQ() {
  return (
    <Box ml={{ base: "5%", xl: "10%" }} mb={{ base: "100px", xl: "150px" }} bg="gray.100">
      <Box bg="white" p={{ base: "4%", xl: "6%" }} borderRadius="10px">
        <ChakraProvider>
          <Text fontSize={{ base: "20px", xl: "40px" }} fontWeight="bold">Frequently Asked Questions</Text>
          <HStack justifyContent='space-between'>
            <Text fontSize={{ base: "10px", xl: "20px" }} mt={{ base: "10px", xl: "20px" }}>
              Still have questions? Contact our team via resourcifycourses@gmail.com
            </Text>
            <Button mt={{ base: "20px", xl: "35px" }} bg="white" border="1px solid gray" w={{ base: "105px", xl: "120px" }} h={{ base: "30px", xl: "45px" }}>
              <NavLink to="/pricing">See all FAQs</NavLink>
            </Button>
          </HStack>
          <Box mt={{ base: "20px", xl: "40px" }}>
            <FAQItem question="Can I enroll in multiple courses at once?" />
            <FAQItem question="What kind of support can I expect from instructors?" />
            <FAQItem question="Are the courses self-paced?" />
            <FAQItem question="Are there any prerequisites for the courses?" />
            <FAQItem question="Can I download the course materials for offline access?" />
          </Box>
        </ChakraProvider>
      </Box>
    </Box>
  );
}

function FAQItem({ question }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box border="1px solid gray" borderRadius="10px" mb={{ base: "20px", xl: "40px" }}>
      <Box px={{ base: "20px", xl: "30px" }} py={{ base: "20px", xl: "30px" }}>
        <HStack justifyContent="space-between">
          <Text fontSize={{ base: "14px", xl: "20px" }} mb={{ base: "10px", xl: "15px" }} w={{ base: "100%", xl: "800px" }}>{question}</Text>
          <Button h={{ base: "40px", xl: "50px" }} w={{ base: "40px", xl: "50px" }} bg="white" _hover={{ bg: "white" }} onClick={toggleOpen}>
            <Icon as={CiCirclePlus} h={{ base: 4, xl: 8 }} w={{ base: 4, xl: 8 }} />
          </Button>
        </HStack>
        {isOpen && (
          <Box mt="10px" fontSize={{ base: "12px", xl: "17px" }}>
            <Text>This is where the answer to the question would go.</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
