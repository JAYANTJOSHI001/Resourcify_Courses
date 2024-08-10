import { Box ,  Flex, Heading ,Text} from "@chakra-ui/react"
import Achievements from "./component/Achievements"
export default function About() {
  return (
    <Box>
      <Box align="center" bg="gray.100">
        <Flex direction={{ base: "column", lg: "row" }} w="90%" borderBottom="1px solid gray">
          <Box p={{ base: "5%", lg: "5%", xl: "5%" }} w={{ base: "100%", lg: "30%" }}>
            <Heading fontWeight="bold" fontSize={{ base: "25px", lg: "30px", xl: "40px" }}>About Resourcify</Heading>
          </Box>
          <Box p={{ base: "3%", lg: "3%", xl: "3%" }} w={{ base: "100%", lg: "70%" }}>
            <Text fontSize={{ base: "12px", lg: "15px", xl: "18px" }}>
            Welcome to our platform, where we are passionate about empowering individuals to master the world of design and development. We offer a wide range of online courses designed to equip learners with the skills and knowledge needed to succeed in the ever-evolving digital landscape.
            </Text>
          </Box>
        </Flex>
      </Box>
      <Achievements />
    </Box>
  )
}
