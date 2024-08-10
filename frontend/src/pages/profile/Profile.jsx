import React, { useState, useEffect, useRef } from 'react';
import {
  Avatar,
  Box,
  Flex,
  Icon,
  Button,
  Divider,
  HStack,
  VStack,
  Grid,
  Image,
  Heading,
  Link,
  Text,
  Input
} from '@chakra-ui/react';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const inputFileRef = useRef(null);
  let d = useParams().uid;
  const username = d;

  const fetchUserDetails = async (username) => {
    try {
      const response = await axios.get(`http://localhost:3000/auth/users/${username}`);
      if (response.status === 200) {
        const userDetails = response.data;
        setUserDetails(userDetails);
        setDescription(userDetails.description || '');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while fetching user details.');
      }
    }
  };

  useEffect(() => {
    fetchUserDetails(username);
  }, [username]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
        uploadAvatar(file);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
    }
  };

  const uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('username', username);

    try {
      const response = await axios.post('http://localhost:3000/auth/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data && response.data.avatarUrl) {
        setAvatar(response.data.avatarUrl);
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  const useid=userDetails?._id;
  const na=userDetails?.name;
  const des=userDetails?.description;

  const handleEditClick = () => {
    if (isEditing) {
        // Prepare the data to be sent
        const updateData = {};
        if (avatar) updateData.avatar = avatar;
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        console.log("this is updated data: ",updateData);

        // Ensure at least one field is present
        if (Object.keys(updateData).length > 0) {
            axios.put(`http://localhost:3000/auth/${useid}/update`, updateData)
                .then(response => {
                    // Handle successful update
                    console.log('User updated successfully:', response.data);
                    window.location.reload();
                })
                .catch(error => {
                    // Handle errors
                    console.error('Error updating user:', error);
                });
        } else {
            alert('At least one of avatar, name, or description must be provided');
        }
    }

    setIsEditing(!isEditing);
};

  return (
    <Box bg="gray.100" color="black" minH="100vh" p={8}>
      <Flex direction="column" align="center" maxW="1000px" mx="auto">
        
        {userDetails ? (
          <>
          <Input
          type="file"
          ref={inputFileRef}
          display="none"
          onChange={(e) => setAvatar(e.target.value)}
          />
          <Avatar
            size="2xl"
            src={avatar}
            name={userDetails.username}
            cursor="pointer"
            onClick={() => inputFileRef.current.click()}
          />
            <VStack mt={4}>
              <Heading>
                {isEditing ? (
                  <Input
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    // Add description
                  />
                ) : userDetails.name ? (
                  na
                ) : (
                  description || 'Add you name'
                )}
              </Heading>
              <Text>@{userDetails.username} · he/him</Text>
            </VStack>    
            <Text mt={2} textAlign="center">
              {isEditing ? (
                <Input
                  placeholder="Add description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              ) : userDetails.description ? (
                des
              ) : (
                'No description yet.'
              )}
            </Text>
            <HStack mt={4}>
              <Text>0 follower · 0 following</Text>
            </HStack>
            <Button mt={4} colorScheme="orange" variant="outline" onClick={handleEditClick}>
              {isEditing ? 'Save' : 'Edit'}
            </Button>
            
            <VStack  w="90%" align='left' spacing={5} m={5}>
              <Divider border='1px solid gray'/>
              <Text fontSize='30px' fontWeight='bolder'>Badges</Text>
              <HStack>
              <Image
                objectFit='cover'
                src='../../img/badge.svg'
                alt='Dan Abramov'
              />
              </HStack>
              <Divider border='1px solid gray'/>
            </VStack>
          </>
        ) : (
          <>
            <SkeletonCircle size='100' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </>
        )}
        <Box mt={8} textAlign="center">
        </Box>
      </Flex>
    </Box>
  );
};

export default Profile;
