import { Box ,  Flex,Heading ,Text} from "@chakra-ui/react"
import { useParams } from 'react-router-dom';
import Courses from "./components/Courses";
export default function Course() {
  const {id} = useParams();
  console.log(id);
  return (
    <Box>
      <Box align="center" bg="gray.100">
        <Flex direction={{ base: "column", lg: "row" }} w="90%" borderBottom="1px solid gray">
          <Box p={{ base: "5%", lg: "5%", xl: "5%" }} w={{ base: "100%", lg: "30%" }}>
            <Heading fontWeight="bold" fontSize={{ base: "25px", lg: "30px", xl: "40px" }}>Courses</Heading>
          </Box>
          <Box p={{ base: "3%", lg: "3%", xl: "3%" }} w={{ base: "100%", lg: "70%" }}>
            <Text fontSize={{ base: "12px", lg: "15px", xl: "18px" }}>
            Welcome to our online course page, where you can enhance your skills in design and development. Choose from our carefully curated selection of 10 courses designed to provide you with comprehensive knowledge and practical experience. Explore the courses below and find the perfect fit for your learning journey.
            </Text>
          </Box>
        </Flex>
      </Box>
      <Courses />
    </Box>
  )
}
