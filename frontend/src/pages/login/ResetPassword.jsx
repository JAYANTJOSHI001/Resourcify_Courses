import React, { useState } from 'react';
import { Text, Button } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    console.log('Sending token:', token);
    console.log('Sending password:', password);
    try {
      const response = await Axios.post(`http://localhost:3000/auth/reset-password/${token}`, { password });
      if (response.data.status) {
        console.log('Password changed successfully');
        navigate('/login');
      } else {
        console.log('Failed to change password:', response.data);
      }
    } catch (err) {
      console.error('Error during password reset:', err);
      alert('An error occurred while resetting the password. Please try again.');
    }
  };

  return (
    <form onSubmit={handleForgotPassword} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'gray.100', padding: '2rem' }}>
      <Text fontSize="4xl">Forgot Password</Text>
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        placeholder="*******"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button bg="orange.400" color="white" _hover={{ bg: 'orange.500' }} type="submit">
        Generate New Password
      </Button>
    </form>
  );
}

export default ResetPassword;
