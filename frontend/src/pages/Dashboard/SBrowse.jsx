import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box, Flex, VStack, HStack, Img, Text, Icon, Tag, Button, Input, useToast, Avatar, InputGroup, InputRightElement } from '@chakra-ui/react';
import Sidebar from './Student-Components/sidebar';
import { IoBookSharp } from "react-icons/io5";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Search2Icon } from '@chakra-ui/icons';

export default function SBrowse() {
    const [courses, setCourses] = useState([]);
    const [input, setInput] = useState("");
    const [chapters, setChapters] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    const { uid: username } = useParams();
    const navigate = useNavigate();
    const toast = useToast();


    const fetchUserDetails = async (username) => {
        console.log(username);
        try {
            const response = await axios.get(`http://localhost:3000/auth/users/${username}`);
            if (response.status === 200) {
                setUserDetails(response.data);
            } else {
                toast({
                    title: "Error",
                    description: response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
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

    useEffect(() => {
        fetchUserDetails(username);
    }, [username]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3000/auth/courses');
                const allCourses = response.data;

                if (userDetails) {
                    const filteredCourses = allCourses.filter(course => !userDetails.enrolledCourses.includes(course.title));
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

        const fetchChapters = async () => {
            try {
                const response = await axios.get('http://localhost:3000/chapters');
                setChapters(response.data);
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

        if (userDetails) {
            fetchCourses();
            fetchChapters();
        }
    }, [userDetails]);

    console.log("this is courses:",courses[0]);


    const handleInputChange = (e) => {
        setInput(e.target.value.toLowerCase());
    };

    const search = async () => {
        try {
            const response = await axios.get('http://localhost:3000/chapters');
            const filteredChapters = response.data.filter(chapter => chapter.tags.map(tag => tag.toLowerCase()).includes(input));

            if (filteredChapters.length === 0) {
                toast({
                    title: "No chapters found",
                    description: "No chapters found with the given tag",
                    status: "info",
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }

            const courseTitle = filteredChapters[0].courseTitle;
            const cresponse = await axios.get('http://localhost:3000/auth/courses');
            const filteredCourses = cresponse.data.filter(course => course.title === courseTitle);

            setCourses(filteredCourses);
            setChapters(filteredChapters);
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

    const handleTagClick = (tag) => {
        setInput(tag.toLowerCase());
        search();
    };

    const renderUniqueTags = () => {
        const allTags = chapters.reduce((accumulator, chapter) => {
            accumulator.push(...chapter.tags);
            return accumulator;
        }, []);
        const tagList = [
            ["nejwndj", "nekdjn", "dkqadj"],
            ["mdld", "mkmd'", "d,md"],
            ["jakskd", "ndjk", "dfk"],
            ["fkf", "rkr", "rrk"],
            ["fmd", "dmkd", "d,kmf"],
            ["mdkmd", "dkmd", "dmkdm"],
            [],
            ["askjnj", "snsk", "ssjsnkld"],
            ["dksdmld", "dskmdl", "dlsmd"],
            ["kd", "kf", "mfm", "md", "m", "d"],
            ["km", "mk", "mkm", "nj"],
            ["mkfmdlkfm;ld,dlf;,dlf,d;lf,d;l,fl", ",ekrme;"],
            ["HTML", "basics"],
            ["CSS", "Styling"],
            ["JavaScript", "Programming"],
            ["hello"],
            ["mbd"]
          ];

        const extractElements = (tagList) => {
            const elements = [];
            tagList.forEach(array => {
              array.forEach(element => {
                elements.push(element);
              });
            });
            return elements;
        };

        const uniqueTags = Array.from(new Set(extractElements(tagList)));

        return uniqueTags.map(tag => <Tag key={tag} onClick={() => handleTagClick(tag)}>{tag}</Tag>);
    };

    const enrollCourse = async (userId, courseId) => {
        console.log("this is userId", userId);
        console.log("this is courseId", courseId);
        
        try {
            const response = await axios.post('http://localhost:3000/auth/enroll', { userId, courseId });
            const res = await axios.post('http://localhost:3000/auth/courses/enroll', { userId, courseId });
            if (response.status === 200 && res.status === 200) {
                toast({
                    title: "Success",
                    description: "Course enrolled successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });

                navigate(`/course/${userId}/${courseId}`);
            } else {
                toast({
                    title: "Error",
                    description: response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
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

    const handleAvatar = () => {
        navigate(`/profile/${username}`);
    };

    

    return (
        <Box h="auto" overflowX="hidden"  maxW={{ base: '400px', md: '1500px' }}>
            <Flex h="100%" direction={{ base: 'column', md: 'row' }}>
                <Sidebar />
                <Box flex="1" p="4">
                    <HStack mb={4} spacing={4} flexWrap="wrap" justifyContent={{ base: 'center', md: 'space-between' }}>
                        <InputGroup maxW={{ base: '100%', md: '90%' }}>
                            <Input placeholder='Enter search text' type='text' onChange={handleInputChange} />
                            <InputRightElement onClick={search} cursor="pointer">
                                <Search2Icon color='green.500' />
                            </InputRightElement>
                        </InputGroup>
                        <Avatar name={userDetails?.username} src='https://bit.ly/tioluwani-kolawole' onClick={handleAvatar} cursor="pointer" />
                    </HStack>
                    <HStack spacing={4} mb={4} flexWrap="wrap" justifyContent={{ base: 'center', md: 'flex-start' }} w="100%">
                        {renderUniqueTags()}
                    </HStack>
                    <Flex wrap='wrap' justifyContent='center' width="90%">
                        {courses.map(course => (
                            <VStack
                                key={course._id}
                                border='3px solid gray'
                                w={{ base: '100%', sm: '45%', md: '30%' }}
                                align='left'
                                p='10px'
                                m={3}
                                borderRadius='10'
                                boxShadow='lg'
                                overflow='hidden'
                                
                            >
                                <Img src={`../../../server/${course.thumbnail}`} alt={course.title} aspectRatio={3 / 4} h='150px' objectFit="cover" />
                                <Text fontWeight='bold' fontSize='20px' noOfLines={2}>{course.title}</Text>
                                <Text fontWeight='light' noOfLines={1} w="40px">{course.description}</Text>
                                <HStack>
                                    <Box bg='orange.100' borderRadius='50%' h={6} w={6}>
                                        <Icon as={IoBookSharp} w={4} h={4} m={1} color='orange' />
                                    </Box>
                                    <Text>{course.chapters.length} Chapters</Text>
                                </HStack>
                               
                                {userDetails && (
                                    <Button
                                        bg='orange.300'
                                        color='white'
                                        size='xs'
                                        _hover={{ color: 'orange.300', bg:"white" , border: '3px solid orange' }}
                                        onClick={() => enrollCourse(userDetails._id, course._id)}
                                    >
                                        Enroll Now
                                    </Button>
                                )}
                            </VStack>
                        ))}
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}
