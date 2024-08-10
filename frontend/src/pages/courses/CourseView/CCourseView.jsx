import React, { useEffect, useState } from 'react';
import Sidebar from './components/sidebar';
import {
    Button, HStack, VStack, Box, AspectRatio, Icon, Text, Flex, ChakraProvider, Progress, Tag, TagLeftIcon, TagLabel, useToast
} from '@chakra-ui/react';
import { FaBackward, FaRegCircleDot } from 'react-icons/fa6';
import { BsFilePdfFill, BsTextParagraph } from 'react-icons/bs';
import CommentSection from './components/CommentSection';
import { MdOutlinePlayCircle } from "react-icons/md";
import { CiClock1 } from 'react-icons/ci';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ChapterView() {
    const { uid, cid } = useParams();
    const navigate = useNavigate();
    const [chapters, setChapters] = useState([]);
    const [courses, setCourses] = useState([]);
    const toast = useToast();
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        async function fetchChapters() {
            try {
                const response = await axios.get('http://localhost:3000/chapters');
                const filteredCourses = response.data.filter(chapter => chapter.courseTitle === courses[0]?.title);
                setChapters(filteredCourses);
            } catch (error) {
                console.error('Error fetching chapters:', error);
            }
        }

        async function fetchCourses(courseId) {
            try {
                const response = await axios.get('http://localhost:3000/auth/courses');
                const filteredCourses = response.data.filter(course => course._id === courseId);
                setCourses(filteredCourses);
            } catch (error) {
                toast({
                    title: "Error",
                    description: error.response?.data?.message || error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        }

        fetchCourses(cid);
        fetchChapters();
    }, [cid, courses, toast]);

    console.log("this is courses:", courses[0]?.introVideo );


    const navigateToChapterDetails = (id) => {
        navigate(`/see-course/${uid}/${cid}/${id}`);
    };

    const handleVideoEnd = () => {
        setShowPopup(true);
    };

    console.log("this is my course",courses[0]);

    const handleNextChapter = () => {
        setShowPopup(false);
        navigateToChapterDetails(chapters[0]?._id); // Assuming the next chapter is the second item in the array
    };

    return (
        <ChakraProvider>
            <Flex h="100%" flexDirection={{ base: 'column', lg: 'row' }} overflowX='hidden'>
                <Sidebar />
                <VStack
                    h="100%"
                    w="100%"
                    m={{ base: '4', md: '10' }}
                    p={{ base: '2', md: '5' }}
                    spacing={{ base: '4', md: '8' }}
                    alignItems="flex-start"
                >
                    <Box w="100%" textAlign='right' mr={10}>
                        <Button leftIcon={<FaBackward />} onClick={() => navigate(-1)}>Back</Button>
                    </Box>
                    <Flex
                        w='100%'
                        flexDirection={{ base: 'column', lg: 'column' }}
                        alignItems={{ base: 'center', lg: 'flex-start' }}
                    >
                    {courses.length > 0 ? (
                            courses.map((course, index) => (  
                        <Box
                            w={{ base: '100%', lg: '98%' }}
                            maxW="1300px"
                            mx="auto"
                            my={{ base: '4', md: '10' }}
                            p={{ base: '2', md: '5' }}
                        >
                            <AspectRatio ratio={16 / 9}>
                                <video
                                    src={`../../../../server/${course.introVideo}`}
                                    controls
                                    onEnded={handleVideoEnd}
                                    style={{ width: '100%' }}
                                />
                            </AspectRatio>
                        </Box>
                         ))
                        ) : (
                            <Text>No video available</Text>
                        )}
                        <Box
                            border="1px solid #e2e8f0"
                            w={{ base: '100%', lg: '98%' }}
                            p={4}
                            mt={{ base: '4', lg: '0' }}
                        >
                            <VStack align='left'>
                                <Text>Course Content</Text>
                                <Progress colorScheme='orange' size='xs' value={0} />
                            </VStack>
                            {chapters.length > 0 ? (
                                chapters.map((chapter, index) => (
                                    <HStack
                                        key={chapter._id}
                                        border="1px solid #e2e8f0"
                                        p={2}
                                        my={2}
                                        justifyContent='space-between'
                                        borderRadius={5}
                                        cursor='pointer'
                                        onClick={() => navigateToChapterDetails(chapter._id)}
                                    >
                                        <HStack>
                                            <Icon as={index === 0 ? MdOutlinePlayCircle : FaRegCircleDot} h={5} w={5} />
                                            <Text fontWeight='semibold'>{chapter.title}</Text>
                                        </HStack>
                                        <HStack spacing={4}>
                                            <Tag size='md' variant='subtle' colorScheme='orange'>
                                                <TagLeftIcon boxSize='12px' as={CiClock1} h={5} w={5} />
                                                <TagLabel>{chapter.duration}</TagLabel>
                                            </Tag>
                                        </HStack>
                                    </HStack>
                                ))
                            ) : (
                                <Text>No chapters available</Text>
                            )}
                        </Box>
                    </Flex>
                    {courses.length > 0 ? (
                            courses.map((course, index) => (  
                    <Box w="100%">
                        <HStack spacing="2" mb="4">
                            <Icon as={BsTextParagraph} />
                            <Text fontSize="xl" fontWeight="bold">
                                Course Overview
                            </Text>
                        </HStack>
                        <Text>
                            {course.description}
                        </Text>
                    </Box>
                    ))
                ) : (
                    <Text>No descriptionavailable</Text>
                )}
                    <Box w="100%">
                        <HStack spacing="2" mb="4">
                            <Icon as={BsFilePdfFill} />
                            <Text fontSize="xl" fontWeight="bold">
                                Resources & Attachments
                            </Text>
                        </HStack>
                        <Box border="1px solid #e2e8f0" w="200px" h="150px" borderRadius="10px" bg="gray.100" />
                    </Box>
                    <Box w="100%" pb={10}>
                        <CommentSection />
                    </Box>
                </VStack>
            </Flex>

            {showPopup && (
                <Box
                    position="fixed"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    bg="white"
                    p={8}
                    borderRadius={8}
                    boxShadow="lg"
                    textAlign="center"
                    zIndex={1000}
                >
                    <Text fontSize="2xl" mb={4}>Intro Complete</Text>
                    <Text fontSize="md" mb={6}>You are done with the intro, now let's start!</Text>
                    <Button colorScheme="orange" onClick={handleNextChapter}>Start Next Chapter</Button>
                </Box>
            )}
        </ChakraProvider>
    );
}

export default ChapterView;
