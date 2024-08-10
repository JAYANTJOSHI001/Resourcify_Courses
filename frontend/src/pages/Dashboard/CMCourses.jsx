import React, { useState, useEffect } from 'react';
import { Button, Img, Progress, Text, useBreakpointValue } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { ChakraProvider, Box, Flex, HStack, VStack, Tag , Avatar} from '@chakra-ui/react';
import Sidebar from './Creator-Components/sidebar';
import { Icon } from '@chakra-ui/react';
import { MdLibraryAdd } from "react-icons/md";
import { PiEyesFill } from "react-icons/pi";
import { IoBookSharp } from 'react-icons/io5';
import { MdLibraryBooks } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';


export default function CMCourses() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const navigate=useNavigate();
    let d= useParams().id;
    const username= d;
    const toast= useToast();


    const handleCourseClick = (title) => {
        navigate(`/see-course/${u}/${title}`);
    };

    const handleAddCourse = () => {
        navigate(`/edit-course/${username}`)
    };

    const handleAvatar = () => {
        navigate(`/profile/${username}`);
    };

    const handleCardClick = () => {
        navigate('/student-courses/completed');
    };

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/auth/users/${username}`);
            if (response.status === 200) {
                const userDetails = response.data;
                // Set the user details in the state
                setUserDetails(userDetails);
            } else {
                console.error('Failed to fetch user details:', response.data.message);
                setError(response.data.message); // Set the error message from the response
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                setError(error.response.data.message);
            }
        }
    };

    useEffect(() => {
        fetchUserDetails(username);
    }, [username]);
    
    const C = userDetails?.myCourses;
    
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3000/auth/courses');
                const allCourses = response.data;

                if (C) {
                    const myCourse = C;
                    const filteredCourses = allCourses.filter(course => myCourse.includes(course.title));
                    setCourses(filteredCourses);
                } else {
                    setCourses(allCourses);
                }
            } catch (error) {
                toast({
                    title: "Error",
                    description: error.response?.data?.message || error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        };

        fetchCourses();
        fetchUserDetails(username);
    }, [username, C]);
    
    let c = courses;
    let u = userDetails?._id;
    console.log("This is u",u);

    const f= courses[0]?.chapters?.length;
    const getTextUntilFirstFullStop = (text) => {
        if (typeof text !== 'string') {
          return ''; // Return an empty string if text is not a string
        }
        const firstFullStopIndex = text.indexOf('.');
        return firstFullStopIndex !== -1 ? text.substring(0, firstFullStopIndex + 1) : text;
      }; 
    const columnWidth = useBreakpointValue({ base: '100%', md: '45%', lg: '30%' });

    

    return (
        <ChakraProvider>
            <Flex h='100vh'>
                <Sidebar />
                <Box flex="1" p="4">
                    <HStack justifyContent='flex-end'>
                        <Avatar name={userDetails?.username} src='https://bit.ly/tioluwani-kolawole' onClick={handleAvatar} />
                    </HStack>
                    <HStack justifyContent='space-between'>
                        <HStack spacing={4} w="50%">
                            <HStack border='3px solid gray' w='50%' borderRadius='10px' p={2}>
                                <Box bg='orange.100' borderRadius='50%' h={10} w={10}>
                                    <Icon as={MdLibraryBooks} w={8} h={8} m={1} color='orange'></Icon>
                                </Box>
                                <Box>
                                    <Text fontSize='20px' fontWeight='semibold'>Your Courses</Text>
                                    <Text>{courses.filter(course => !course.completed).length} Courses</Text>
                                </Box>
                            </HStack>
                            <HStack border='3px solid gray' w='50%' borderRadius='10px' p={2} cursor="pointer" >
                                <Box bg='green.100' borderRadius='50%' h={10} w={10}>
                                    <Icon as={PiEyesFill} w={8} h={8} m={1} color='green'></Icon>
                                </Box>
                                <Box>
                                    <Text fontSize='20px' fontWeight='semibold' >Views</Text>
                                    <Text>{courses.filter(course => course.enrolledBy).length} Views</Text>
                                </Box>
                            </HStack>
                        </HStack>
                        <Button leftIcon={<MdLibraryAdd />} colorScheme='orange' variant='solid' onClick={handleAddCourse}>
                            Add course
                        </Button>
                    </HStack>
                    <Flex wrap='wrap' justifyContent='center' >
                        {courses.map(course => (
                            <VStack
                                key={course._id} // Assuming your course model has _id as the unique identifier
                                border='3px solid gray'
                                w={{ base: '100%', sm: '45%', md: '30%' }}
                                align='left'
                                p='10px'
                                m={3}
                                borderRadius='10'
                                boxShadow='lg'
                            >
                                <Img src={`../../../server/${course?.thumbnail}`} alt={course.title} aspectRatio={3/4} h='150px' />
                                <Text fontWeight='bold' fontSize='20px' align='left' h='50px'>{course.title}</Text>
                                <Text fontWeight='light' align='left'>{getTextUntilFirstFullStop(course?.description)}</Text>
                                <HStack>
                                    <Box bg='orange.100' borderRadius='50%' h={6} w={6}>
                                        <Icon as={IoBookSharp} w={4} h={4} m={1} color='orange' />
                                    </Box>
                                    <Text>{f} Chapters</Text>
                                </HStack>
                                <HStack>
                                    <HStack>
                                        <Icon as={PiEyesFill} w={4} h={4} m={1} color='orange'></Icon>
                                        <Text>Views</Text>
                                    </HStack>
                                    <Text>{course.view}</Text>
                                </HStack>
                                <Button colorScheme='orange' onClick={() => handleCourseClick(course?._id)}>See Course</Button>
                            </VStack>
                        ))}
                    </Flex>
                </Box>
            </Flex>
        </ChakraProvider>
    );
}
