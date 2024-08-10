import React, { useState, useEffect } from 'react';
import { Img, Progress, Text, useBreakpointValue, ChakraProvider, Box, Flex, HStack, VStack, Tag, Avatar } from '@chakra-ui/react';
import Sidebar from './Student-Components/sidebar';
import { Icon } from '@chakra-ui/react';
import { FiClock, FiCheckCircle } from 'react-icons/fi';
import { IoBookSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function SECourses() {
    const [courses, setCourses] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState(null); // Error state to handle errors
    let d = useParams().uid;
    const username = d;

    const fetchUserDetails = async (username) => {
        try {
            const response = await axios.get(`http://localhost:3000/auth/users/${username}`);
            if (response.status === 200) {
                const userDetails = response.data;
                setUserDetails(userDetails);
            } else {
                console.error('Failed to fetch user details:', response.data.message);
                setError(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    };

    useEffect(() => {
        fetchUserDetails(username);
    }, [username]);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3000/auth/courses');
                const allCourses = response.data;

                if (userDetails && userDetails.enrolledCourses) {
                    const enrolledCourses = userDetails.enrolledCourses;
                    const filteredCourses = allCourses.filter(course => enrolledCourses.includes(course.title));
                    setCourses(filteredCourses);
                } else {
                    setCourses(allCourses);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [userDetails]);

    const columnWidth = useBreakpointValue({ base: '100%', md: '45%', lg: '30%' });

    const handleCourseClick = (id) => {
        navigate(`/course/${id}`);
    };

    const handleAvatar = () => {
        navigate(`/profile/${username}`);
    };

    
    const ec = userDetails?.enrolledCourses.length;
    const cc = userDetails?.completedCourses.length;

    const handleCardClick = () => {
        navigate(`/student-courses/${username}/completed`);
    };

    return (
        <ChakraProvider>
            <Flex h="100vh">
                <Sidebar />
                <Box flex="1" p="4">
                    <HStack justifyContent='flex-end'>
                        <Avatar name={userDetails?.username} src='https://bit.ly/tioluwani-kolawole' onClick={handleAvatar} />
                    </HStack>
                    <HStack spacing={4}>
                        <HStack border='3px solid gray' w={columnWidth} borderRadius='10px' p={2} bg="gray.100">
                            <Box bg='orange.100' borderRadius='50%' h={10} w={10}>
                                <Icon as={FiClock} w={8} h={8} m={1} color='orange'></Icon>
                            </Box>
                            <Box>
                                <Text fontSize='20px' fontWeight='semibold'>Enrolled</Text>
                                <Text>{ec} Courses</Text>
                            </Box>
                        </HStack>
                        <HStack border='3px solid gray' w={columnWidth} borderRadius='10px' p={2} onClick={handleCardClick} cursor="pointer">
                            <Box bg='green.100' borderRadius='50%' h={10} w={10}>
                                <Icon as={FiCheckCircle} w={8} h={8} m={1} color='green'></Icon>
                            </Box>
                            <Box>
                                <Text fontSize='20px' fontWeight='semibold'>Completed</Text>
                                <Text>{cc} Courses</Text>
                            </Box>
                        </HStack>
                    </HStack>
                    <Flex wrap='wrap' justifyContent='center' alignContent="center">
                        {courses.length === 0 ? (
                            <VStack spacing={0}>
                                <Img src="../../../public/img/notfound.png" height='400px' mt={8}/>
                                <Text fontSize="2xl" fontWeight="bold" mt={8}>You are not enrolled in any courses.</Text>
                                <Text fontSize="lg" mt={4}>Enroll in a course now to start learning!</Text>
                                <Text fontSize="lg" mt={4}>Tap on Explore Button to get started.</Text>
                            </VStack>
                        ) : (
                            courses.map(course => (
                                <VStack
                                    key={course._id}
                                    border='3px solid gray'
                                    w={{ base: '100%', sm: '45%', md: '30%' }}
                                    align='left'
                                    p='10px'
                                    m={3}
                                    borderRadius='10'
                                    boxShadow='lg'
                                >
                                    <Img src={`../../../server/${course.thumbnail}`} alt={course.title} aspectRatio={3/4} h='150px' />
                                    <Text fontWeight='bold' fontSize='20px' align='left' h='50px'>{course.title}</Text>
                                    <Text fontWeight='light' align='left'>{course.description}</Text>
                                    <HStack>
                                        <Box bg='orange.100' borderRadius='50%' h={6} w={6}>
                                            <Icon as={IoBookSharp} w={4} h={4} m={1} color='orange' />
                                        </Box>
                                        <Text>{course.chapters.length} Chapters</Text>
                                    </HStack>
                                </VStack>
                            ))
                        )}
                    </Flex>
                </Box>
            </Flex>
        </ChakraProvider>
    );
}
