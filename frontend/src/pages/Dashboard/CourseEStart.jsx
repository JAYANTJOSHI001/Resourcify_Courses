import React, { useState, useEffect } from 'react';
import {
    Button, Img, Input, Text, ChakraProvider, Box, Flex, HStack, VStack, Icon, Tag, TagLabel, TagCloseButton, useToast
} from '@chakra-ui/react';
import Sidebar from './Student-Components/sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function CourseEStart() {

    const [title, setTitle] = useState('');
    const toast = useToast();
    const navigate = useNavigate();
    const {id} = useParams();
    const username=id;
    console.log("this is id: ",id);

    const [userDetails, setUserDetails] = useState(null);

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/auth/users/${username}`);
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
        fetchUserDetails(username);
    }, [username]);

    const user=userDetails?._id;
    console.log("this is user123: ",user);

    const handleSubmit = async () => {
        if (title.trim() === '') {
            toast({
                title: "Error.",
                description: "Course title cannot be empty.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }
    
        try {
            // Add course title to the courses
            await axios.post('http://localhost:3000/courses/course', { title });
    
            // Assuming you have access to the current user's ID
            const userId = user; // Replace with actual user ID logic
            console.log("this is userId123456789: ",user);
            console.log("this is title: ",title);
    
            // Add course title to the user's myCourses
            await axios.post('http://localhost:3000/auth/users/myCourses', { userId, title });
    
            toast({
                title: "Success!",
                description: "Course title added successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
    
            navigate(`${title}`);
    
            setTitle(''); // Clear the input field after submission
        } catch (error) {
            console.error(error);
            toast({
                title: "Error.",
                description: "An error occurred while adding the course title.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };
    
    return (
        <ChakraProvider>
            <HStack h='100vh'>
                <Sidebar/>
                <VStack alignContent='center' justifyContent='center' w='100%'>
                    <VStack bg='gray.100' h={275} w={700} alignContent='center' justifyContent='center'>
                        <VStack spacing={8}>
                            <Text fontSize='40px' fontWeight='semibold' colorScheme='orange'>Enter Course Title</Text>
                            <Input 
                            placeholder='Enter Title for Course'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}/>
                            <Button 
                            color='white' 
                            bg='orange.300' 
                            _hover={{color:"orange.300", bg:"gray.100", border:"1px solid orange"}} 
                            colorScheme='orange'
                            onClick={handleSubmit}>Build a Course</Button>
                        </VStack>
                    </VStack>
                </VStack>
            </HStack>
        </ChakraProvider>
    );
}
