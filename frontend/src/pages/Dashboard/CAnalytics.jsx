import React from 'react';
import { useState} from 'react';
import { ChakraProvider, Container, Heading , Flex, Text, HStack,VStack, Avatar, Box, Icon, Button} from '@chakra-ui/react';
import { MdLibraryBooks, MdLibraryAdd } from 'react-icons/md';
import { PiEyesFill } from 'react-icons/pi';
import BarChart from './Creator-Components/barchart';
import Sidebar from './Creator-Components/sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';
import axios from 'axios';


const CAnalytics = () => {

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
    let u = userDetails;

    const f= courses[0]?.chapters?.length;
    const getTextUntilFirstFullStop = (text) => {
        if (typeof text !== 'string') {
          return ''; // Return an empty string if text is not a string
        }
        const firstFullStopIndex = text.indexOf('.');
        return firstFullStopIndex !== -1 ? text.substring(0, firstFullStopIndex + 1) : text;
      }; 
    const columnWidth = useBreakpointValue({ base: '100%', md: '45%', lg: '30%' });

    const courseTitles = courses.map(course => course.title);
    const enrolledCounts = courses.map(course => course.enrolledBy.length);
  
  


  const data = {
    labels: courseTitles,
    datasets: [
      {
        label: 'Views',
        data: enrolledCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <ChakraProvider border='5px solid black'>
      <Flex h='100vh'>
        <Sidebar />
        <VStack w='100%' p={5}>
        <HStack justifyContent='space-between' w="100%">
            <HStack spacing={4} w="100%">
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
                <Avatar name={userDetails?.username} src='https://bit.ly/tioluwani-kolawole' onClick={handleAvatar} />
              </HStack>
            </HStack>
          <Container maxW="container.lg" p={4}>
            <BarChart data={data} options={options} />
          </Container>
        </VStack>
      </Flex>
    </ChakraProvider>
  );
};

export default CAnalytics;