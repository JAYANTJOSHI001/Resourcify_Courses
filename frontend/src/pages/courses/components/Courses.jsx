import { Box, Button, ChakraProvider, SimpleGrid, Text, Img, HStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Courses() {
  return (
    <Box align="center" bg="gray.100">
      <SimpleGrid p="10px" spacing={10} maxWidth="1300px" minChildWidth={{ base: "100%", md: "48%", lg: "100%" }}>
        <CourseCard
          title="Web Design Fundamentals"
          description="Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. Develop the skills to create visually appealing and user-friendly websites."
          courseId="1"
          images={["../../img/Image1.png", "../../img/Image12.png"]}
          curriculum={[
            "Introduction to HTML",
            "Styling with CSS",
            "Introduction to Responsive Design",
            "Design Principles for Web",
            "Building a Basic Website",
          ]}
        />
        <CourseCard
          title="UI/UX Design"
          description="Master the art of creating intuitive user interfaces (UI) and enhancing user experiences (UX). Learn design principles, wireframing, prototyping, and usability testing techniques."
          courseId="3"
          images={["../../img/Image.png", "../../img/Image22.png"]}
          curriculum={[
            "Introduction to UI/UX Design",
            "User Research and Personas",
            "Wireframing and Prototyping",
            "Visual Design and Branding",
            "Usability Testing and Iteration",
          ]}
        />
        <CourseCard
          title="Mobile App Development"
          description="Dive into the world of mobile app development. Learn to build native iOS and Android applications using industry-leading frameworks like Swift and Kotlin."
          courseId="2"
          images={["../../img/Image3.png", "../../img/Image32.png"]}
          curriculum={[
            "Introduction to Mobile App Development",
            "Fundamentals of Swift Programming (iOS)",
            "Fundamentals of Kotlin Programming (Android)",
            "Building User Interfaces",
            "App Deployment and Testing",
          ]}
        />
        <CourseCard
          title="Graphic Design for Beginners"
          description="Discover the fundamentals of graphic design, including typography, color theory, layout design, and image manipulation techniques. Create visually stunning designs for print and digital media."
          courseId="4"
          images={["../../img/Image4.png", "../../img/Image42.png"]}
          curriculum={[
            "Introduction to Graphic Design",
            "Typography and Color Theory",
            "Layout Design and Composition",
            "Image Editing and Manipulation",
            "Designing for Print and Digital Media",
          ]}
        />
        <CourseCard
          title="Front-End Web Development"
          description="Become proficient in front-end web development. Learn HTML, CSS, JavaScript, and popular frameworks like Bootstrap and React. Build interactive and responsive websites."
          courseId="5"
          images={["../../img/Image5.png", "../../img/Image52.png"]}
          curriculum={[
            "HTML Fundamentals",
            "CSS Styling and Layouts",
            "JavaScript Basics",
            "Building Responsive Websites",
            "Introduction to Bootstrap and React",
          ]}
        />
      </SimpleGrid>
    </Box>
  );
}

function CourseCard({ title, description, courseId, images, curriculum }) {
  return (
    <Box bg="white" minW='90%' borderRadius="15px" p="5%" mt="2%" h={{base:"1700px", md : "auto"}}>
      <ChakraProvider>
        <Text fontSize={{ base: "20px", lg: "30px" }} fontWeight="semibold" align="left" pl="2%">
          {title}
        </Text>
        <SimpleGrid p="10px" spacing={10} minChildWidth="100%">
          <Text align="left" pl="2%">
            {description}
          </Text>
        </SimpleGrid>
        <HStack pl="2%" flexWrap='wrap' justifyContent='center'>
          {images.map((src, index) => (
            <Img key={index} src={src} maxWidth={{base:"300px",md : "350px", lg : "400px"}}  aspectRatio={1}/>
          ))}
        </HStack>
        <Box>
          <HStack p="10px" spacing={4}>
            <Box border="1px solid gray.50" h="20px" w="55px" borderRadius="4px"><Text fontSize="12px" ml="4px">4 weeks</Text></Box>
            <Box border="1px solid gray.50" h="20px" w="58px" borderRadius="4px"><Text fontSize="12px" ml="4px">Beginner</Text></Box>
          </HStack>
        </Box>
        <Box pl="2%">
          <Text align="left" fontSize="20px" fontWeight="semibold">Curriculum</Text>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="2%" pl="2%">
          {curriculum.map((item, index) => (
            <Box key={index} p="20px" border="1px solid gray" borderRadius="10px" h="200px" w="100%">
              <Box align="left">
                <Text fontSize="40px" fontWeight="bolder">{`0${index + 1}`}</Text>
                <Text>{item}</Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
        <Button mt={{base : "100px", md : "5%", lg : "3%"}} w='100%'>View Course</Button>
      </ChakraProvider>
    </Box>
  );
}

export const taskLoader = async () => {
  try {
    const res = await fetch('http://localhost:3000/courses');
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
};
