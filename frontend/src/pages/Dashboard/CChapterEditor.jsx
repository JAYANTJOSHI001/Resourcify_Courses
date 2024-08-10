import React, { useState } from 'react';
import { 
  Button, 
  Img, 
  Input, 
  Text, 
  ChakraProvider, 
  Box, 
  Flex, 
  HStack, 
  VStack, 
  FormControl, 
  FormLabel, 
  Textarea, 
  useToast, 
  Icon, 
  Tag, 
  TagLabel, 
  TagCloseButton 
} from '@chakra-ui/react';
import Sidebar from './Creator-Components/sidebar';
import { TbLayout2 } from "react-icons/tb";
import { MdOutlineModeEdit, MdOutlineVideoLibrary, MdDelete } from "react-icons/md";
import { FaFileLines } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import PDFViewer from './Creator-Components/PdfViewer';

export default function CChapterEditor() {
    const  {id, title} = useParams();
    const navigate = useNavigate();
    console.log("this is id",id);
    console.log("this is title",title);
    const [file1, setFile1] = useState();
    const [file2, setFile2] = useState();
    const [chapterTitle, setChapterTitle] = useState('');
    const [chapterDescription, setChapterDescription] = useState('');
    const [chapterNotes, setChapterNotes] = useState(null);
    const [videoLectures, setVideoLectures] = useState(null);
    const [input, setInput] = useState('');
    const [tagList, setTagList] = useState([]);
    const toast = useToast();

    function handlePdfChange(e, setFileState) {
        let inputFile = e.target.files[0];
        console.log(inputFile);
        let size = inputFile.size;
        console.log(size);
        let type = inputFile.type;
        console.log(type);
        if(size < 1000000 && (type === 'application/pdf')){
            setFile1(URL.createObjectURL(e.target.files[0]));
            setFileState(inputFile);
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
    function handleVideoChange(e, setFileState) {
        let inputFile = e.target.files[0];
        console.log(inputFile);
        let size = inputFile.size;
        console.log(size);
        let type = inputFile.type;
        console.log(type);
        if(size < 10000000 && (type.startsWith('video/'))){
            setFile2(URL.createObjectURL(e.target.files[0]));
            setFileState(inputFile);
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

    const handleInputChange = (e) => {
        setInput(e.target.value);
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

    const handlePublish = async () => {
        const formData = new FormData();
        formData.append('courseTitle', title);
        formData.append('title', chapterTitle);
        formData.append('description', chapterDescription);
        formData.append('tags', JSON.stringify(tagList)); // Assuming tagList is an array of strings
    
        if (chapterNotes) formData.append('notes', chapterNotes);
        if (videoLectures) formData.append('video', videoLectures);
    
        try {
            const response = await axios.post('http://localhost:3000/chapters', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            console.log(response.data);
            toast({
                title: "Chapter Published",
                description: "Your chapter details have been saved.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            navigate(`/edit-course/${id}/${title}`);
    
            // Reset the form (optional)
            setChapterTitle('');
            setChapterDescription('');
            setChapterNotes(null);
            setVideoLectures(null);
            setTagList([]); // Reset tags list after successful publish
        } catch (error) {
            console.error('Error saving chapter details:', error);  // Log the error
            toast({
                title: "Error",
                description: "There was an error saving your chapter details.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };
    

    return (
        <ChakraProvider>
            <Flex height='100vh'>
                <Sidebar />
                <Box flex="1" p="4">
                    <HStack justifyContent='space-between' w='100%' pb={10}>
                        <VStack>
                            <Text fontSize='30px' fontWeight='bold' >Chapter Setup</Text>
                            <Text fontSize='20px' fontWeight='normal'>Complete all fields</Text>
                        </VStack>
                        <HStack>
                            <Button colorScheme='orange' onClick={handlePublish}>Publish</Button>
                            <Button aspectRatio={1}><Icon as={MdDelete} w={6} h={6} /></Button>
                        </HStack>
                    </HStack>
                    <HStack>
                        <VStack w='55%' align='left'>
                            <VStack spacing={4}>
                                <HStack spacing={2} w='100%'>
                                    <Box align='left' bg='#F6D6A8' h={12} w={12} borderRadius='50%' p={1} color='#FF9500'>
                                        <Icon as={TbLayout2} h={10} w={10} />
                                    </Box>
                                    <Text fontSize='25px' fontWeight='semibold'>Customize your Chapter</Text>
                                </HStack>
                                <VStack w='100%' bg="gray.100" p="20px" borderRadius='5px'  align="left">
                                    <HStack w='100%' justifyContent='space-between'>
                                        <Text fontWeight='semibold'>Course Title</Text>
                                    </HStack>
                                    <Text>{title}</Text>
                                </VStack>
                                <VStack w='100%' bg="gray.100" p="20px" borderRadius='5px'>
                                    <HStack w='100%' justifyContent='space-between'>
                                        <Text fontWeight='semibold'>Chapter Title</Text>
                                        <Button leftIcon={<MdOutlineModeEdit />}>Edit</Button>
                                    </HStack>
                                    <Input placeholder='Write chapter title' value={chapterTitle} onChange={(e) => setChapterTitle(e.target.value)} />
                                </VStack>
                                <VStack w='100%' bg="gray.100" p="20px" borderRadius='5px'>
                                    <HStack w='100%' justifyContent='space-between'>
                                        <Text fontWeight='semibold'>chapter Description</Text>
                                        <Button leftIcon={<MdOutlineModeEdit />}>Edit description</Button>
                                    </HStack>
                                    <Textarea placeholder='Write chapter description' value={chapterDescription} onChange={(e) => setChapterDescription(e.target.value)} />
                                </VStack>
                                <VStack w='100%' bg="gray.100" p="20px" borderRadius='5px'>
                                    <HStack w='100%' justifyContent='space-between'>
                                        <Text fontWeight='semibold'>chapter Tags</Text>
                                        <Button leftIcon={<MdOutlineModeEdit />}>Edit Tags</Button>
                                    </HStack>
                                    <Input
                                        placeholder='Enter tags and press Enter'
                                        value={input}
                                        onChange={handleInputChange}
                                        onKeyPress={handleKeyPress}
                                    />
                                    <HStack spacing={2} wrap='wrap'>
                                        {tagList.map((tag, index) => (
                                            <Tag
                                                key={index}
                                                size='md'
                                                borderRadius='full'
                                                variant='solid'
                                                colorScheme='orange'
                                            >
                                                <TagLabel>{tag}</TagLabel>
                                                <TagCloseButton onClick={() => removeTag(tag)} />
                                            </Tag>
                                        ))}
                                    </HStack>
                                </VStack>
                            </VStack>
                        </VStack>
                        <VStack w='45%' align='left' borderRadius='20px'>
                            <VStack spacing={4}>
                                <HStack spacing={2} w='100%'>
                                    <Box align='left' bg='#F6D6A8' h={12} w={12} borderRadius='50%' p={1} color='#FF9500'>
                                        <Icon as={FaFileLines} h={8} w={8} m={1} />
                                    </Box>
                                    <Text fontSize='25px' fontWeight='semibold'>Resources and Attachments</Text>
                                </HStack>
                                <VStack w='100%' bg="gray.100" p="20px" borderRadius='5px'>
                                    <HStack w='100%' justifyContent='space-between'>
                                        <Text fontWeight='semibold'>Chapter Notes</Text>
                                        <Button leftIcon={<MdOutlineModeEdit />}>Edit Notes</Button>
                                    </HStack>
                                    <Input placeholder='Add Notes' type='file' onChange={(e) => handlePdfChange(e, setChapterNotes)} accept="application/pdf" />
                                    
                                </VStack>
                                <HStack spacing={2} w='100%'>
                                    <Box align='left' bg='#F6D6A8' h={12} w={12} borderRadius='50%' p={1} color='#FF9500'>
                                        <Icon as={MdOutlineVideoLibrary} h={8} w={8} m={1} />
                                    </Box>
                                    <Text fontSize='25px' fontWeight='semibold'>Videos</Text>
                                </HStack>
                                <VStack w='100%' bg="gray.100" p="20px" borderRadius='5px'>
                                    <HStack w='100%' justifyContent='space-between'>
                                        <Text fontWeight='semibold'>Video Lectures</Text>
                                        <Button leftIcon={<MdOutlineModeEdit />}>Edit Videos</Button>
                                    </HStack>
                                    <Input placeholder='Add Videos' type='file' onChange={(e) => handleVideoChange(e, setVideoLectures)} accept="video/*" />
                                    {videoLectures && <video src={URL.createObjectURL(videoLectures)} controls />}
                                </VStack>
                            </VStack>
                        </VStack>
                    </HStack>
                </Box>
            </Flex>
        </ChakraProvider>
    );
}
