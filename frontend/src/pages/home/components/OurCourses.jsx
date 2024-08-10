import { Box, Button, Center, ChakraProvider, Grid, Icon, SimpleGrid, Text, Img, HStack } from "@chakra-ui/react";
import { MdArrowOutward } from "react-icons/md";
import { NavLink , useNavigate} from "react-router-dom";

export default function OurCourses() {
  const navigate=useNavigate();

  const handleClick= ()=> {
    navigate("/signup");
  };

  return (
    <ChakraProvider>
      <Box ml={{ base: "20px", md: "50px", lg: "100px" }} mb="100px" bg="gray.100" p={4}>
        <Text fontSize={{ base: "24px", md: "28px", lg: "30px" }} fontWeight="semibold" textAlign="center" mb={6}>
          Our Courses
        </Text>
        <SimpleGrid p="10px" spacing={10} maxWidth="1300px" columns={{ base: 1, md: 2, xl: 2}}>
          <Box w={{base : '100%', md : '150%', lg : '175%'}}>
            <Text>
            Resourcify offers the best courses at no cost. These courses span a variety of subjects, ensuring comprehensive learning for all. Designed by experts, Resourcify's courses provide valuable insights and practical skills, making high-quality education accessible to everyone. Take advantage of this exceptional opportunity to enhance your knowledge and skills without any financial burden.
            </Text>
          </Box>
          <Box textAlign={{base : 'left', md : 'right'}}>
            <Button border='1px solid black' _hover={{bg : 'black', color : 'white'}}>
              <NavLink to="/courses">View all</NavLink>
            </Button>
          </Box>
        </SimpleGrid>

        <SimpleGrid p="10px" spacing={10} maxWidth="1300px" columns={{ base: 1, md: 2, xl: 3 }}>
          {[
            {
              imageSrc: "../../img/Image1.png",
              duration: "4 weeks",
              level: "Beginner",
              title: "Web Design Fundamentals",
              description:
                "Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. Develop the skills to create visually appealing and user-friendly websites.",
            },
            {
              imageSrc: "../../img/Image.png",
              duration: "6 weeks",
              level: "Intermediate",
              title: "UI/UX Design",
              description:
                "Master the art of creating intuitive user interfaces (UI) and enhancing user experiences (UX). Learn design principles, wireframing, prototyping, and usability testing techniques.",
            },
            {
              imageSrc: "../../img/Image3.png",
              duration: "4 weeks",
              level: "Beginner",
              title: "Mobile App Development",
              description:
                "Dive into the world of mobile app development. Learn to build native iOS and Android applications using industry-leading frameworks like Swift and Kotlin.",
            },
            {
              imageSrc: "../../img/Image4.png",
              duration: "4 weeks",
              level: "Beginner",
              title: "Graphic Design for Beginners",
              description:
                "Discover the fundamentals of graphic design, including typography, color theory, layout design, and image manipulation techniques. Create visually stunning designs for print and digital media.",
            },
            {
              imageSrc: "../../img/Image5.png",
              duration: "10 weeks",
              level: "Intermediate",
              title: "Front-End Web Development",
              description:
                "Become proficient in front-end web development. Learn HTML, CSS, JavaScript, and popular frameworks like Bootstrap and React. Build interactive and responsive websites.",
            },
            {
              imageSrc: "../../img/Image6.png",
              duration: "6 weeks",
              level: "Advance",
              title: "Advanced JavaScript",
              description:
                "Take your JavaScript skills to the next level. Explore advanced concepts like closures, prototypes, asynchronous programming, and ES6 features. Build complex applications with confidence.",
            },
          ].map((course, index) => (
            <Box
              key={index}
              bg="white"
              borderRadius="15px"
              height={{base : 'auto', md : 'auto'}}
              overflow="hidden"
              boxShadow="md"
              transition="all 0.3s"
              _hover={{ transform: "scale(1.05)" }}
            >
              <Box p="10px">
                <Img src={course.imageSrc} objectFit="cover" borderRadius="md" />
              </Box>
              <Box>
                <HStack p="10px" spacing={2}>
                  <Box border="1px solid whitesmoke" h="20px" px="8px" borderRadius="4px">
                    <Text fontSize="12px">{course.duration}</Text>
                  </Box>
                  <Box border="1px solid whitesmoke" h="20px" px="8px" borderRadius="4px">
                    <Text fontSize="12px">{course.level}</Text>
                  </Box>
                </HStack>
              </Box>
              <Box px="12px" pt="10px">
                <Text fontSize="20px" fontWeight="semibold">
                  {course.title}
                </Text>
              </Box>
              <Box px="12px" pt="10px">
                <Text fontSize="15px">{course.description}</Text>
              </Box>
              <Box px="12px" pt="20px" pb="12px">
                <Button  bg='black' variant="solid" w='100%' color='white' onClick={handleClick} _hover={{bg : 'gray.100', color : 'black'}}>
                  Get it now!
                </Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </ChakraProvider>
  );
}
