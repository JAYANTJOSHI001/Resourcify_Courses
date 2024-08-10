import React, { useState } from 'react';
import Axios from 'axios';
import { Box, Flex, Stack, Input, Button, Text, FormControl, FormLabel, Link, Img, Container } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleNavigate = ()=>{
    navigate('/signup');
  }

  const handleLogin = async () => {
    console.log('Ya i am in ');
    try {
      const response = await Axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      Axios.defaults.withCredentials = true;
      
      if (response.status === 200) { // Adjust status check based on your server response
        navigate('/student-courses/enrolled'); // Navigate to home page upon successful login
      } else {
        setError(response.data.message); // Set the error message from the response
      }
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        setError(error.response.data.message);
      }
    }
  };

  return (
    <Flex minHeight="100vh" align="center" justify="center" bg="gray.100" direction={{ base: "column", md: "row" }} action="/signup" method="post">
      <Box flex="1" bg="white" p={8} rounded="md" shadow="lg" maxW={{ base: "90%", md: "50%" }} mx="auto">
        <Stack spacing={4}>
          <Container alignItems='center' justifyContent='center' w="220px">
            <Img justifySelf='center' w="220px" src='../../img/Resourcify.png'/>  
          </Container>
          <Text fontSize="lg" textAlign="center">Login into your account</Text>
          
          <FormControl id="email">
            <FormLabel>Email:</FormLabel>
            <Input 
              type="text" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
                  
          <FormControl id="password">
            <FormLabel>Password:</FormLabel>
            <Input 
              type='password' 
              placeholder="*******" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          
          <Link href="/forgotpassword" color="blue.500" textAlign="right">Forgot Password?</Link>
          
          <Button colorScheme="orange" size="lg" onClick={handleLogin}>Login Now</Button>
          
          <Text textAlign="center">OR</Text>
          
          <Button variant="outline" colorScheme="orange" size="lg" onClick={handleNavigate}>Signup Now</Button>
          
          {error && <Text color="red.500" textAlign="center">{error}</Text>}
        </Stack>
      </Box>
      <Box flex="1" display={{ base: "none", md: "flex" }} alignItems="center" justifyContent="center" bg="gray.100">
        <Box as="img" src="../../img/login-illustrator.svg" alt="Login Illustration" maxW="100%" />
      </Box>
    </Flex>
  );
};

export default Login;
