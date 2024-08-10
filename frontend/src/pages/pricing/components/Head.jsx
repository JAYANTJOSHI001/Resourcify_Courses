import { Flex, Box, HStack, Heading, Text } from "@chakra-ui/react";

export default function Head() {
  return (
    <Box align="center" bg="gray.100">
      <Flex direction={{ base: "column", lg: "row" }} w="90%" borderBottom="1px solid gray">
        <Box p={{ base: "5%", lg: "5%", xl: "5%" }} w={{ base: "100%", lg: "30%" }}>
          <Heading fontWeight="bold" fontSize={{ base: "25px", lg: "30px", xl: "40px" }}>Our Pricing</Heading>
        </Box>
        <Box p={{ base: "3%", lg: "3%", xl: "3%" }} w={{ base: "100%", lg: "70%" }}>
          <Text fontSize={{ base: "12px", lg: "15px", xl: "18px" }}>
            Welcome to Resourcify's Pricing Plan page, where we offer four comprehensive options to cater to your needs: Start, Pro, Business, and Special. We believe in providing flexible and affordable pricing options for our services. Whether you're an individual looking to enhance your skills or a business seeking professional development solutions, we have a plan that suits you. Explore our pricing options below and choose the one that best fits your requirements.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
