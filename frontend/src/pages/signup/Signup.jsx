import {React , useState} from 'react';
import axios from 'axios';
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Stack,
  Checkbox,
  useBreakpointValue,
  useColorModeValue,
  HStack,
  Link,
  RadioGroup,
  Radio
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { SiGoogle } from 'react-icons/si';
import ImageSlider from "./components/ImageSlider";
import { SlideData } from "./components/SlideData";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const formWidth = useBreakpointValue({ base: '100%', md: 'lg' });
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [permission, setPermission] = useState('');
  const [error, setError] = useState('');
  const toast=useToast();


  const navigate =useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent form from submitting

    // Define regex patterns for validation
    const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, one letter, and one number

    // Validate inputs
    if (!usernameRegex.test(username)) {
        setError('Username must be 3-15 characters long and can only contain letters, numbers, and underscores.');
        return;
    }
    if (!emailRegex.test(email)) {
        setError('Invalid email address.');
        return;
    }
    if (!passwordRegex.test(password)) {
        setError('Password must be at least 8 characters long and include at least one letter and one number.');
        return;
    }

    try {
        const response = await axios.post('http://localhost:3000/auth/signup', {
            username,
            email,
            password,
            role,
        });

        toast({
            title: "Signup Successful",
            description: "You have successfully signed up.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });

        if (response.status === 201) {
            console.log('This is role:', role);
            if (role === 'Student') {
                navigate(`/student-courses/${username}/enrolled`);
            } else if (role === 'Teacher') {
                navigate(`/dashboard/${username}`);
            }
        } else {
            setError(response.data.message); // Set the error message from the response
        }
    } catch (error) {
        console.error('Error signing up:', error);
        if (error.response) {
            console.error('Error response data:', error.response.data);
            setError(error.response.data.message);
        }
    }
};


  return (

    <div>
        <Flex minH="100vh" flexDirection={{ base: 'column', lg: 'row' }} align="center" justify="center" bg='gray.100' action="/login" method="post">
                <Box
                  flex="1"
                  display={{ base: 'none', md: 'flex' }}
                  bg='gray.100'
                  color="white"
                  alignItems="center"
                  justifyContent="center"
                  p={8}
                >
                  <Box w="100%" p={4} color="white">
                    <ImageSlider slides={SlideData} />
                  </Box>

                </Box>
                <Stack spacing={8} mx="auto" maxW={formWidth} py={12} px={6} flex="1">
                  <Stack align="center">
                    <Text fontSize="4xl">Register Your Account!</Text>
                    <Text fontSize="lg" color="gray.600">
                    For the purpose of learner and educator verification, your details are required.
                    </Text>
                  </Stack>
                  <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
                    <Stack spacing={4}>
                      <label htmlFor='username'>Username:</label>
                      <Input 
                        type="text" 
                        placeholder="Username" 
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <label htmlFor='email'>Email:</label>
                      <Input 
                        type="text" 
                        placeholder="Email" 
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label htmlFor='password'>Password:</label>
                      <Input 
                        type='password' 
                        placeholder="*******" 
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Text>So, what account you want to make?</Text>
                      <RadioGroup onChange={setRole} value={role}>
                        <HStack>
                          <Radio size='md' colorScheme='orange' value='Teacher'>Educator</Radio>
                          <Radio size='md' colorScheme='orange' value='Student'>Learner</Radio>
                        </HStack>
                      </RadioGroup>
                      <Stack spacing={10}>
                        <Checkbox value='true'>I agree to terms & conditions</Checkbox>
                        <Button bg="orange.400" color="white" _hover={{ bg: 'orange.500' }} onClick={handleSignup}>
                          Register Account
                        </Button>
                        <Button variant="outline" leftIcon={<SiGoogle />}>
                          Register with Google
                        </Button>
                        <Text align="center">Already Registered? <Link href='/login'>Login</Link></Text>
                      </Stack>
                    </Stack>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                  </Box>
                </Stack>
              </Flex>        
    </div>
  );
};

export default Signup;