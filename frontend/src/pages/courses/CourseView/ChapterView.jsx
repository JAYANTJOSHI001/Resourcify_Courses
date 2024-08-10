import React, { useEffect, useState } from 'react';
import Sidebar from './components/sidebar';
import {
    Button, HStack, VStack, Box, AspectRatio, Icon, Text, Flex, ChakraProvider, Progress, Tag, TagLeftIcon, TagLabel, useToast
} from '@chakra-ui/react';
import { FaBackward, FaRegCircleDot } from 'react-icons/fa6';
import { SiTicktick } from "react-icons/si";
import { BsFilePdfFill, BsTextParagraph } from 'react-icons/bs';
import CommentSection from './components/CommentSection';
import { MdOutlinePlayCircle } from "react-icons/md";
import { CiClock1 } from 'react-icons/ci';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ChapterView() {
    const { uid, cid, chid } = useParams(); 
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [chapter, setChapter] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const toast = useToast();
    const chaptertitle = chid;
    
    

        

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/auth//users/id/${uid}`);
            console.log(response);
            if (response.status === 200) {
                const userDetails = response.data;
                console.log('User details fetched successfully:', userDetails);
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
        fetchUserDetails(uid);
    }, [uid]);

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
        async function fetchChapter(courseId) {
            try {
                const response = await axios.get('http://localhost:3000/chapters');
                const filteredChapter = response.data.filter(chapter => chapter._id === chid);
                setChapter(filteredChapter);
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
        fetchChapter(chid);
        fetchCourses(cid);
        fetchChapters();
    }, [cid, courses, toast]);

    // Function to get the index of the current chapter
    const getChapterIndex = (chapterId, chaptersArray) => {
        return chaptersArray.findIndex(chapter => chapter._id === chapterId);
    };

    const navigateToChapterDetails = (chapterTitle) => {
        navigate(`/course/${cid}/${chapterTitle}`);
        window.location.reload();
    };

    

    const useid=userDetails?.username;
    const handleChapterComplete = async () => {
        try {
            console.log('Marking chapter as completed');
            console.log(`Sending request to mark chapter ${chid} as completed for user ${uid}`);
            
            await axios.put(`http://localhost:3000/auth/users/${uid}/completedChapters`, { chid });
            
            const currentIndex = getChapterIndex(chid, chapters);
            const nextChapterId = chapters[currentIndex + 1]?._id || null;

            if (nextChapterId) {
                navigate(`/course/${uid}/${cid}/${nextChapterId}`);
                window.location.reload();
            } else {
                await axios.put(`http://localhost:3000/auth/users/${uid}/completedCourses`, { cid });
                navigate(`/student-courses/${useid}/completed`);
                window.location.reload();
            }
        } catch (error) {
            console.error('Error saving completion status:', error);
        }
    };

    const filteredChap = chapters.filter(chapters => userDetails.completedChapter?.includes(chapters._id));
    const total_no_of_chapters=chapters.length;
    const no_of_completed_chapters=filteredChap.length;
    const percentage_completed=(no_of_completed_chapters/total_no_of_chapters)*100;

    return (
        <ChakraProvider>
            <Flex h="100%" flexDirection={{ base: 'column', lg: 'row' }}>
                <Sidebar/>
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
                        <Box
                            w={{ base: '100%', lg: '98%' }}
                            maxW="1300px"
                            mx="auto"
                            my={{ base: '4', md: '10' }}
                            p={{ base: '2', md: '5' }}
                        >
                            <AspectRatio ratio={16 / 9}>
                                <video
                                    src='../../../../public/img/Eduvid.mp4'
                                    controls
                                    onEnded={handleChapterComplete} 
                                />
                            </AspectRatio>
                        </Box>

                        <Box
                            border="1px solid #e2e8f0"
                            w={{ base: '100%', lg: '98%' }}
                            p={4}
                            mt={{ base: '4', lg: '0' }}
                        >
                            <VStack align='left'>
                                <Text>Course Content</Text>
                                <Progress colorScheme='orange' size='xs' value={percentage_completed} />
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
                                        onClick={() => navigateToChapterDetails(chapter.title)}
                                    >
                                        <HStack>
                                            <Icon as={
                                                chaptertitle === chapter.title
                                                    ? MdOutlinePlayCircle
                                                    : userDetails.completedChapter.includes(chapter._id)
                                                        ? SiTicktick
                                                        : FaRegCircleDot
                                            } h={5} w={5} />
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
                    {chapter.map(chapter => (
                        <VStack key={chapter._id}>
                            <Box w="100%">
                                <HStack spacing="2" mb="4">
                                    <Icon as={BsTextParagraph} />
                                    <Text fontSize="xl" fontWeight="bold">
                                        Chapter Overview
                                    </Text>
                                </HStack>
                                <Text w='1100px'>
                                    {chapter.description}
                                </Text>
                            </Box>
                            <Box w="100%">
                                <HStack spacing="2" mb="4">
                                    <Icon as={BsFilePdfFill} />
                                    <Text fontSize="xl" fontWeight="bold">
                                        Resources & Attachments
                                    </Text>
                                </HStack>
                                <Box border="1px solid #e2e8f0" w="200px" h="150px" borderRadius="10px" bg="gray.100" >
                                    {chapter.notes}
                                </Box>
                            </Box>

                            <Box w="100%" pb={10}>
                                <CommentSection />
                            </Box>
                        </VStack>
                    ))}
                </VStack>
            </Flex>
        </ChakraProvider>
    );
}

export default ChapterView;
