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
          <HStack justifyContent="space-between" flexDirection={{ base: "column", md: "row" }}>
            <Text fontSize={{ base: "10px", xl: "20px" }} mt={{ base: "10px", xl: "20px" }}>
              Still have questions? Contact our team via resourcifycourses@gmail.com
            </Text>
          </HStack>
          <Box mt={{ base: "20px", xl: "40px" }}>
            <FAQItem question="How do I start creating on Resourcify?" answer="To start creating on Resourcify, simply sign up for an educator account and complete your profile. Once your account is set up, navigate to the 'Create Course' section where you can add course details, including the title, description, tags, and upload your course materials. Our intuitive course editor makes it easy to structure your content and add chapters, video lectures, and interactive elements. If you need any assistance, our support team is always here to help you get started." />
            <FAQItem question="How do I grow my community?" answer="Growing your community on Resourcify involves a few strategic steps. Start by consistently creating high-quality, engaging content that adds value to your audience. Share your courses on social media platforms and engage with your audience regularly. Utilize Resourcify's built-in community features such as discussion boards and live webinars to interact with your learners. Encourage your students to share their experiences and provide feedback, which can help attract new members through word-of-mouth." />
            <FAQItem question="How do I make edits to my courses?" answer="Editing your courses on Resourcify is straightforward. Go to your dashboard and select the course you want to edit. From there, you can update course details, modify chapters, upload new materials, and make any necessary changes. Once you've made your edits, be sure to save your changes and review your course to ensure everything looks perfect before publishing the updates. If you encounter any issues, our support team is available to assist you." />
            <FAQItem question="How do I promote my courses?" answer="Promoting your courses on Resourcify can be done through several effective methods. Share your course links on social media platforms and within relevant online communities. Take advantage of Resourcify's promotional tools, such as featured course listings and email newsletters. Collaborate with other educators and influencers to reach a broader audience. Additionally, hosting free webinars or offering limited-time discounts can attract new students and boost enrollment." />
            <FAQItem question="How do trending courses happen?" answer="Trending courses on Resourcify are determined by a combination of factors, including enrollment numbers, student engagement, course ratings, and social media shares. Courses that consistently receive high ratings and positive feedback from students are more likely to trend. Additionally, actively promoting your course and engaging with your community can help increase visibility and contribute to your course trending. Keep creating valuable and engaging content to enhance your chances of becoming a trending course." />
          </Box>
        </ChakraProvider>
      </Box>
    </Box>
  );
}

function FAQItem({ question, answer }) {
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
            <Text>{answer}</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
