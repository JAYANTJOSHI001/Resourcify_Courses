import React, { useState, useEffect } from 'react';
import {
    Button, Img, Input, Text, ChakraProvider, Box, Flex, HStack, VStack, Icon, Tag, TagLabel, TagCloseButton, useToast
} from '@chakra-ui/react';
import Sidebar from './Creator-Components/sidebar';
import { TbLayout2 } from "react-icons/tb";
import { MdOutlineModeEdit, MdDelete } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { CgMenuGridO } from "react-icons/cg";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function CourseEditor() {
    const {id, title} = useParams();
    const navigate = useNavigate();
    const courseTitle = title;
    const [courseDescription, setCourseDescription] = useState('');
    const [courseThumbnail, setCourseThumbnail] = useState(null);
    const [tagList, setTagList] = useState([]);
    const [chapterList, setChapterList] = useState([]);
    const [introVideo, setIntroVideo] = useState(null);
    const [input, setInput] = useState('');
    const toast = useToast();

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(chapterList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setChapterList(items);
    };

    useEffect(() => {
        async function fetchChapters() {
            try {
                const response = await axios.get('http://localhost:3000/chapters');
                const filteredChapters = response.data.filter(chapter => chapter.courseTitle === courseTitle);
                setChapterList(filteredChapters);
            } catch (error) {
                console.error('Error fetching chapters:', error);
            }
        }
        fetchChapters();
    }, [courseTitle]);

    const handleChapterClick = async () => {
        navigate(`/edit-course/${id}/${title}/chapter`)
    };

    const onInputChange = (e) => {
        setCourseThumbnail(e.target.files[0]);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            const trimmedInput = input.trim();
            if (trimmedInput && !tagList.includes(trimmedInput)) {
                setTagList([...tagList, trimmedInput]);
                setInput('');
            }
        }
    };

    const removeTag = (tag) => {
        setTagList(tagList.filter(item => item !== tag));
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const deleteChapterByTitle = async (title) => {
        try {
            const response = await axios.delete(`http://localhost:3000/chapters/by-title/${title}`);
            console.log('Chapter deleted:', response.data);
        } catch (err) {
            console.error('Error deleting chapter:', err.message);
        }
    };

    const handleDeleteClick = (title) => {
        deleteChapterByTitle(title);
    };

    const handlePublish = async () => {
        const formData = new FormData();
        formData.append('title', courseTitle);
        formData.append('description', courseDescription);
        formData.append('tags', JSON.stringify(tagList));
        formData.append('chapters', JSON.stringify(chapterList));
        if (courseThumbnail) formData.append('thumbnail', courseThumbnail);
        if (introVideo) formData.append('introVideo', introVideo);

        try {
            const response = await axios.put('http://localhost:3000/courses', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
            toast({
                title: "Course Published",
                description: "Your course details have been saved.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            navigate(`/dashboard/${id}`);
            setCourseDescription('');
            setCourseThumbnail(null);
            setChapterList([]);
            setTagList([]);
        } catch (error) {
            console.error('Error saving course details:', error);
            toast({
                title: "Error",
                description: "There was an error saving your course details.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    function handlePdfChange(e, setFileState) {
        let inputFile = e.target.files[0];
        let size = inputFile.size;
        let type = inputFile.type;
        if (size < 10000000 && (type === 'application/pdf' || type.startsWith('video/'))) {
            setIntroVideo(inputFile);
        } else {
            toast({
                title: "File Error",
                description: "File size exceeded or type is undesired.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }

    return (
        <ChakraProvider>
            <Flex h="100vh">
                <Sidebar />
                <Box flex="1" p="4">
                    <HStack justifyContent='space-between' w='100%' pb={10}>
                        <VStack>
                            <Text fontSize='30px' fontWeight='bold'>Course Setup</Text>
                            <Text fontSize='20px' fontWeight='normal'>Complete all fields</Text>
                        </VStack>
                        <HStack>
                            <Button colorScheme='orange' onClick={handlePublish}>Publish</Button>
                            <Button aspectRatio={1}><Icon as={MdDelete} w={6} h={6} /></Button>
                        </HStack>
                    </HStack>
                    <HStack w='100%'>
                        <HStack w='100%'>
                            <VStack w='55%' align='left'>
                                <VStack spacing={4}>
                                    <HStack spacing={2} w='100%'>
                                        <Box align='left' bg='#F6D6A8' h={12} w={12} borderRadius='50%' p={1} color='#FF9500'>
                                            <Icon as={TbLayout2} h={10} w={10} />
                                        </Box>
                                        <Text fontSize='25px' fontWeight='semibold'>Customize your course</Text>
                                    </HStack>
                                    <VStack w='100%' bg="gray.100" p="20px" borderRadius='5px'>
                                        <HStack w='100%' justifyContent='space-between'>
                                            <Text fontWeight='semibold'>Course Title</Text>
                                        </HStack>
                                        <HStack w='100%' justifyContent='space-between'>
                                            <Text >{courseTitle}</Text>
                                        </HStack>
                                    </VStack>
                                    <VStack w='100%' bg="gray.100" p="20px" borderRadius='5px'>
                                        <HStack w='100%' justifyContent='space-between'>
                                            <Text fontWeight='semibold'>Course Description</Text>
                                            <Button leftIcon={<MdOutlineModeEdit />} variant='link'></Button>
                                        </HStack>
                                        <Input value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} placeholder='Add Description' />
                                    </VStack>
                                    <VStack w='100%' bg="gray.100" p="20px" borderRadius='5px'>
                                        <HStack w='100%' justifyContent='space-between'>
                                            <Text fontWeight='semibold'>Add Thumbnail</Text>
                                        </HStack>
                                        <Input placeholder='Add Thumbnail' type='file' onChange={onInputChange} accept="image/png, image/jpeg, image/jpg" />
                                        {courseThumbnail && <Img src={URL.createObjectURL(courseThumbnail)} />}
                                    </VStack>
                                    <VStack w='100%' bg="gray.100" p="20px" borderRadius='5px'>
                                        <HStack w='100%' justifyContent='space-between'>
                                            <Text fontWeight='semibold'>Tags</Text>
                                        </HStack>
                                        <HStack w='100%' flexWrap='wrap'>
                                            {tagList.map((tag, index) => (
                                                <Tag key={index} borderRadius='full' variant='solid' colorScheme='orange'>
                                                    <TagLabel>{tag}</TagLabel>
                                                    <TagCloseButton onClick={() => removeTag(tag)} />
                                                </Tag>
                                            ))}
                                            <Input
                                                variant='unstyled'
                                                placeholder='Enter a tag and press enter'
                                                value={input}
                                                onChange={handleInputChange}
                                                onKeyDown={handleKeyPress}
                                            />
                                        </HStack>
                                    </VStack>
                                </VStack>
                            </VStack>
                            <VStack w="50%" flexDirection='column'>
                                <VStack w='100%' bg="gray.100" p="20px" borderRadius='5px'>
                                    <HStack w='100%' justifyContent='space-between'>
                                        <Text fontWeight='semibold'>Add Chapters</Text>
                                        <Button leftIcon={<FiPlusCircle />} onClick={handleChapterClick}>New Chapter</Button>
                                    </HStack>
                                    {chapterList.map((chapter, index) => (
                                        <HStack key={index} w='100%' justifyContent='space-between'>
                                            <HStack>
                                                <Box bg='#F6D6A8' h={12} w={12} borderRadius='50%' p={1} color='#FF9500'>
                                                    <Icon as={CgMenuGridO} h={10} w={10} />
                                                </Box>
                                                <Text>{chapter.title}</Text>
                                            </HStack>
                                            <HStack>
                                                <Button leftIcon={<MdOutlineModeEdit />} variant='link'>Edit</Button>
                                                <Button leftIcon={<MdDelete />} onClick={() => deleteChapterByTitle('Chapter Title')} variant='link'>Delete</Button>
                                            </HStack>
                                        </HStack>
                                    ))}
                                </VStack>
                                <VStack w='100%' bg="gray.100" p="20px" borderRadius='5px'>
                                    <HStack w='100%' justifyContent='space-between'>
                                        <Text fontWeight='semibold'>Add Intro Video</Text>
                                    </HStack>
                                    <Input placeholder='Add Videos' type='file' onChange={(e) => handlePdfChange(e, setIntroVideo)} accept="video/*" />
                                    {introVideo && <video src={URL.createObjectURL(introVideo)} controls />}
                                </VStack>
                            </VStack>
                        </HStack>
                    </HStack>
                </Box>
            </Flex>
        </ChakraProvider>
    );
}
