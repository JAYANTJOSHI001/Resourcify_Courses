import {
  Box,
  Heading,
  Text,
  Flex,
  VStack,
  HStack,
  Icon,
  Image,
  Button,
} from "@chakra-ui/react";
import {
  FaRocket,
  FaUsers,
  FaMoneyBill,
  FaChartLine,
  FaBook,
  FaHandsHelping,
  FaBrain,
} from "react-icons/fa";
import { MdOutlineConnectWithoutContact, MdOutlineSupportAgent } from "react-icons/md";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import { useNavigate } from "react-router-dom";

const EducatorPage = () => {

  const navigate=useNavigate();

  const handleClick= ()=> {
    navigate("/signup");
  };

  return (
    <Box p={4} bg='gray.100'>
      <Flex
        direction={{ base: "column", md: "column", lg: "row" }}
        align="center"
        mb={50}
      >
        <VStack align={{ base: "center", lg: "flex-start" }} spacing={4} flex={1}>
          <Heading as="h1" fontSize={{ base: "3xl", md: "4xl", lg: "80px" }} textAlign={{ base: "center", lg: "left" }} mb={4}>
            Everything You Need to Become an Educator on Resourcify
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} textAlign={{ base: "center", lg: "left" }} mb={8}>
            No matter what kind of information, advice, or help you’re looking for, this is the spot.
          </Text>
        </VStack>
        <Box flex={1} display="flex" justifyContent="center" alignItems="center">
          <Image src="../../../public/img/image.png" h={{ base: "200px", md: "400px", lg: "600px" }} objectFit="cover" />
        </Box>
      </Flex>

      <Box bgGradient="linear(to bottom right, #ED8C36, #EDF2F7)" p={6} borderRadius="md" textAlign="center" mb={8} color="whitesmoke">
        <Heading as="h2" size="xl" mb={4}>
          Join as a Beta Educator for Free!
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }}>
          Be part of our beta version and enjoy a free educator account. Share your knowledge without any cost and help us improve the platform.
        </Text>
        <Text fontSize={{ base: "md", md: "lg" }} mt={2}>
          All users who join during the beta period will not be charged any fees and will retain their free status even after the official launch.
        </Text>
        <Button colorScheme="orange" size="lg" mt={4} onClick={handleClick}>
          Join Beta Now
        </Button>
      </Box>

      <Box bg="gray.100" p={6} borderRadius="md" textAlign="center" mb={8}>
        <Heading as="h2" size="xl" mb={4}>
          Pricing After Official Launch
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }}>
          Once the beta period ends, educators can join Resourcify for a nominal fee of $5 per month. This fee provides access to all the tools and resources you need to create, publish, and share your knowledge with the world.
        </Text>
        <Pricing />
      </Box>

      <Heading as="h2" size="xl" mb={6} textAlign="center">
        How It Works
      </Heading>

      <Flex justify="space-around" flexWrap="wrap">
        <VStack spacing={4} p={4} maxW={{ base: "full", md: "sm" }}>
          <Icon as={FaRocket} boxSize={10} color="orange.300" />
          <Text fontSize="lg" fontWeight="bold">Getting Started on Resourcify</Text>
          <Text textAlign="center">Everything you need to create and manage your courses.</Text>
        </VStack>

        <VStack spacing={4} p={4} maxW={{ base: "full", md: "sm" }}>
          <Icon as={FaUsers} boxSize={10} color="orange.300" />
          <Text fontSize="lg" fontWeight="bold">Building Your Community</Text>
          <Text textAlign="center">Tips and tricks to find, nurture, and build an audience.</Text>
        </VStack>

        <VStack spacing={4} p={4} maxW={{ base: "full", md: "sm" }}>
          <Icon as={FaMoneyBill} boxSize={10} color="orange.300" />
          <Text fontSize="lg" fontWeight="bold">How to Earn Money on Resourcify</Text>
          <Text textAlign="center">Explore all the ways you can get paid for your courses.</Text>
        </VStack>

        <VStack spacing={4} p={4} maxW={{ base: "full", md: "sm" }}>
          <Icon as={FaChartLine} boxSize={10} color="orange.300" />
          <Text fontSize="lg" fontWeight="bold">Growing Your Reach</Text>
          <Text textAlign="center">Tools to help you create, connect, and grow.</Text>
        </VStack>

        <VStack spacing={4} p={4} maxW={{ base: "full", md: "sm" }}>
          <Icon as={FaBook} boxSize={10} color="orange.300" />
          <Text fontSize="lg" fontWeight="bold">Policies and Guidelines</Text>
          <Text textAlign="center">Get the explanations behind the rules.</Text>
        </VStack>

        <VStack spacing={4} p={4} maxW={{ base: "full", md: "sm" }}>
          <Icon as={FaHandsHelping} boxSize={10} color="orange.300" />
          <Text fontSize="lg" fontWeight="bold">How to Get Involved</Text>
          <Text textAlign="center">How we support, recognize, and celebrate educators.</Text>
        </VStack>
      </Flex>

      <Heading as="h2" size="xl" mb={6} textAlign="center" mt={10}>
        Top Questions
      </Heading>

      <FAQ />

      <Heading as="h2" size="xl" mb={6} textAlign="center" mt={10}>
        Resources
      </Heading>

      <Flex justify="space-around" flexWrap="wrap">
        <VStack spacing={4} p={4} maxW={{ base: "full", md: "sm" }}>
          <Icon as={FaBrain} boxSize={12} color="orange.300" borderRadius="50%" p={2} bg="white" />
          <Text fontSize="lg" fontWeight="bold">Learn</Text>
          <Text textAlign="center">Updates, news, and education from experts and educators. Weekly updates on new features and ideas for educators. Resourcify Educator Insider.</Text>
        </VStack>

        <VStack spacing={4} p={4} maxW={{ base: "full", md: "sm" }}>
          <Icon as={MdOutlineSupportAgent} boxSize={12} color="orange.300" borderRadius="50%" p={2} bg="white" />
          <Text fontSize="lg" fontWeight="bold">Support</Text>
          <Text textAlign="center">Help when you need it: Fix upload problems, troubleshoot account issues, and more. Get breakdowns on the topics that are most important to educators. Plans to ask questions and provide feedback.</Text>
        </VStack>

        <VStack spacing={4} p={4} maxW={{ base: "full", md: "sm" }}>
          <Icon as={MdOutlineConnectWithoutContact} boxSize={12} color="orange.300" borderRadius="50%" p={2} bg="white"/>
          <Text fontSize="lg" fontWeight="bold">Connect</Text>
          <Text textAlign="center">Ask questions, find answers, and understand more about Resourcify via our social channels and email. Join the community forum. Attend live webinars and training sessions.</Text>
        </VStack>
      </Flex>
    </Box>
  );
};

export default EducatorPage;
