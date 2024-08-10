import React, { useState } from 'react';
import { Flex, Stack, Text, Box, Input, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

export default function Forgotpassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleForgotPassword = async () => {
        try {
            const response = await Axios.post('http://localhost:3000/auth/forgotpassword', { email });
            if (response.status === 200) {
                alert("Check your email for reset password link");
                navigate('/login');
            } else {
                setError(response.data.message || "Failed to send email");
            }
        } catch (error) {
            console.error('Error during password reset request:', error);
            setError(error.response?.data?.message || "An unexpected error occurred");
        }
    };

    return (
        <Flex minH="100vh" flexDirection={{ base: 'column', lg: 'row' }} align="center" justify="center" bg="gray.100">
            <Stack spacing={8} mx="auto" py={12} px={6} flex="1">
                <Stack align="center">
                    <Text fontSize="4xl">Forgot Password</Text>
                    <Text fontSize="lg" color="gray.600">
                        For the purpose of Creator regulation, your details are required.
                    </Text>
                </Stack>
                <Box rounded="lg" bg="white" boxShadow="lg" p={8}>
                    <Stack spacing={4}>
                        <Input
                            placeholder="Enter email address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error && <Text color="red.500">{error}</Text>}
                        <Stack spacing={10}>
                            <Button bg="orange.400" color="white" _hover={{ bg: 'orange.500' }} onClick={handleForgotPassword}>
                                Generate New Password
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
