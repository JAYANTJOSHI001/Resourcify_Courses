import {Box, SimpleGrid, Icon, Text, ChakraProvider} from "@chakra-ui/react"
import { FaCrown , FaMedal , FaBook} from "react-icons/fa";
import { RiChatSmile3Line } from "react-icons/ri";
import { GiLightningShield ,GiSchoolBag} from "react-icons/gi";
import { BsFillPuzzleFill } from "react-icons/bs";
import { AiFillAlert } from "react-icons/ai";
export default function Achievements(){
  return (
    <Box align="center" bg="gray.100">
        <Box py="100px">
                <ChakraProvider>
                        <Text fontSize="30px" fontWeight="semibold" align="center" mx="7%">
                            Achievements
                        </Text>
                        <SimpleGrid p="10px" spacing={10} maxWidth="1300px" minChildWidth={{ base: "100px" , lg : "150px" , xl : "550px"}}>
                            <Box 
                            width="98%"
                            fontSize={{base : "13px", lg : "15px", xl : "17px"}}
                            height={{ base: "110px" , lg : "100px" , xl : "100px"}}><Text align="left">Our commitment to excellence has led us to achieve significant milestones along our journey. Here are some of our notable achievements</Text></Box>
                        </SimpleGrid>
                </ChakraProvider>
                <SimpleGrid p="2%" spacing={10} maxWidth="1300px" minChildWidth={{ base: "350px" , lg : "400px" , xl : "450px"}}>
                    <Box 
                    bg="white"
                    borderRadius="15px"
                    height="250px"
                    align="left">
                        <Box p="20px" >
                            <Box bg="gray.50" h="50px" w="50px" borderRadius="5px">
                                <Icon as={FaCrown} color="orange.300" p="10px" h={12} w={12}></Icon>
                            </Box>
                        </Box>
                        <Box px="12px" pt="10px">
                            <Text fontSize={{ base : "15px" , lg : "17px" , xl : "20px"}} fontWeight="semibold">Trusted by Thousands</Text>
                        </Box>
                        <Box  px="12px" pt="10px">
                            <Text fontSize="15px" maxWidth="95%">We have successfully served thousands of students, helping them unlock their potential and achieve their career goals.</Text>
                        </Box>
                    </Box>
                    <Box 
                    bg="white"
                    borderRadius="15px"
                    height="250px"
                    align="left">
                        <Box p="20px" >
                            <Box bg="gray.50" h="50px" w="50px" borderRadius="5px">
                                <Icon as={FaMedal} color="orange.300" p="10px" h={12} w={12}></Icon>
                            </Box>
                        </Box>
                        <Box px="12px" pt="10px">
                            <Text fontSize="20px" fontWeight="semibold">Award-Winning Courses</Text>
                        </Box>
                        <Box  px="12px" pt="10px">
                            <Text fontSize="15px" maxWidth="95%">Our courses have received recognition and accolades in the industry for their quality, depth of content, and effective teaching methodologies.</Text>
                        </Box>
                    </Box>
                    <Box 
                    bg="white"
                    borderRadius="15px"
                    height="250px"
                    align="left">
                        <Box p="20px" >
                            <Box bg="gray.50" h="50px" w="50px" borderRadius="5px">
                                <Icon as={RiChatSmile3Line} color="orange.300" p="10px" h={12} w={12}></Icon>
                            </Box>
                        </Box>
                        <Box px="12px" pt="10px">
                            <Text fontSize="20px" fontWeight="semibold">Positive Student Feedback</Text>
                        </Box>
                        <Box  px="12px" pt="10px">
                            <Text fontSize="15px"maxWidth="95%">We take pride in the positive feedback we receive from our students, who appreciate the practicality and relevance of our course materials.</Text>
                        </Box>
                    </Box>
                    <Box 
                    bg="white"
                    borderRadius="15px"
                    height="250px"
                    align="left">
                        <Box p="20px" >
                            <Box bg="gray.50" h="50px" w="50px" borderRadius="5px">
                                <Icon as={GiLightningShield} color="orange.300" p="10px" h={12} w={12}></Icon>
                            </Box>
                        </Box>
                        <Box px="12px" pt="10px">
                            <Text fontSize="20px" fontWeight="semibold">Industry Partnerships</Text>
                        </Box>
                        <Box  px="12px" pt="10px">
                            <Text fontSize="15px" maxWidth="95%">We have established strong partnerships with industry leaders, enabling us to provide our students with access to the latest tools and technologies.</Text>
                        </Box>
                    </Box>
                </SimpleGrid>
        </Box>
        <Box pb="100px">
            <ChakraProvider py="50px">
                    <Text fontSize="30px" fontWeight="semibold" align="center" mx="7%">
                        Our Goals
                    </Text>
                    <SimpleGrid p="10px" spacing={10} maxWidth="1300px" minChildWidth={{ base: "300px" , lg : "450px" , xl : "550px"}}>
                        <Box 
                        width="98%"
                        fontSize={{base : "13px", lg : "15px", xl : "17px"}}
                        height={{ base: "110px" , lg : "100px" , xl : "100px"}}
                        pl="5%"><Text align="left">At SkillBridge, our goal is to empower individuals from all backgrounds to thrive in the world of design and development. We believe that education should be accessible and transformative, enabling learners to pursue their passions and make a meaningful impact.Through our carefully crafted courses, we aim to</Text></Box>
                    </SimpleGrid>
            </ChakraProvider>
            <SimpleGrid p="2%" spacing={10} maxWidth="1300px" minChildWidth={{ base: "350px" , lg : "400px" , xl : "450px"}}>
                <Box 
                bg="white"
                borderRadius="15px"
                height="280px"
                align="left">
                    <Box p="20px" >
                        <Box bg="gray.50" h="50px" w="50px" borderRadius="5px">
                            <Icon as={GiSchoolBag} color="orange.300" p="10px" h={12} w={12}></Icon>
                        </Box>
                    </Box>
                    <Box px="12px" pt="10px">
                        <Text fontSize="20px" fontWeight="semibold">Provide Practical Skills</Text>
                    </Box>
                    <Box  px="12px" pt="10px">
                        <Text fontSize="15px" maxWidth="95%">We focus on delivering practical skills that are relevant to the current industry demands. Our courses are designed to equip learners with the knowledge and tools needed to excel in their chosen field.</Text>
                    </Box>
                </Box>
                <Box 
                bg="white"
                borderRadius="15px"
                height="280px"
                align="left">
                    <Box p="20px" >
                        <Box bg="gray.50" h="50px" w="50px" borderRadius="5px">
                            <Icon as={FaBook} color="orange.300" p="10px" h={12} w={12}></Icon>
                        </Box>
                    </Box>
                    <Box px="12px" pt="10px">
                        <Text fontSize="20px" fontWeight="semibold">Foster Creative Problem-Solving</Text>
                    </Box>
                    <Box  px="12px" pt="10px">
                        <Text fontSize="15px" maxWidth="95%">We encourage creative thinking and problem-solving abilities, allowing our students to tackle real-world challenges with confidence and innovation.</Text>
                    </Box>
                </Box>
                <Box 
                bg="white"
                borderRadius="15px"
                height="280px"
                align="left">
                    <Box p="20px" >
                        <Box bg="gray.50" h="50px" w="50px" borderRadius="5px">
                            <Icon as={BsFillPuzzleFill} color="orange.300" p="10px" h={12} w={12}></Icon>
                        </Box>
                    </Box>
                    <Box px="12px" pt="10px">
                        <Text fontSize="20px" fontWeight="semibold">Promote Collaboration and Community</Text>
                    </Box>
                    <Box  px="12px" pt="10px">
                        <Text fontSize="15px"maxWidth="95%">We believe in the power of collaboration and peer learning. Our platform fosters a supportive and inclusive community where learners can connect, share insights, and grow together.</Text>
                    </Box>
                </Box>
                <Box 
                bg="white"
                borderRadius="15px"
                height="280px"
                align="left">
                    <Box p="20px" >
                        <Box bg="gray.50" h="50px" w="50px" borderRadius="5px">
                            <Icon as={AiFillAlert} color="orange.300" p="10px" h={12} w={12}></Icon>
                        </Box>
                    </Box>
                    <Box px="12px" pt="10px">
                        <Text fontSize="20px" fontWeight="semibold">Stay Ahead of the Curve</Text>
                    </Box>
                    <Box  px="12px" pt="10px">
                        <Text fontSize="15px" maxWidth="95%">The digital landscape is constantly evolving, and we strive to stay at the forefront of industry trends. We regularly update our course content to ensure our students receive the latest knowledge and skills.</Text>
                    </Box>
                </Box>
            </SimpleGrid>
        </Box>
    </Box>
  )
}