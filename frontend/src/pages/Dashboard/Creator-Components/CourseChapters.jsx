import React from 'react';
import { Box, Text, HStack, Button, VStack } from '@chakra-ui/react';

export default function CourseChapters() {
  return (
    <Box>
      <Text fontSize="xl" mb="4">Course chapters</Text>
      <VStack align="start">
        <HStack w="full" justifyContent="space-between" mb="2">
          <Text>Introduction</Text>
          <Text>Free</Text>
          <Text>Published</Text>
          <Button size="sm">Edit</Button>
        </HStack>
        <HStack w="full" justifyContent="space-between" mb="2">
          <Text>Exploring the Basics</Text>
          <Text>Published</Text>
          <Button size="sm">Edit</Button>
        </HStack>
        <HStack w="full" justifyContent="space-between" mb="2">
          <Text>Practical Hands-on Activities</Text>
          <Text>Published</Text>
          <Button size="sm">Edit</Button>
        </HStack>
        <HStack w="full" justifyContent="space-between" mb="2">
          <Text>Outro</Text>
          <Text>Published</Text>
          <Button size="sm">Edit</Button>
        </HStack>
        <Button>Add a chapter</Button>
      </VStack>
    </Box>
  );
}
