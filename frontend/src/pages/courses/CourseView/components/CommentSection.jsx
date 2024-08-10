// src/CommentSection.js
import React, { useState } from 'react';
import { Box, Button, Textarea, VStack, Heading } from '@chakra-ui/react';
import Comment from './Comment';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        author: 'User', // replace with dynamic user data
        avatar: '', // replace with dynamic user avatar
        content: newComment,
        timestamp: new Date().toLocaleString(),
        replies: [],
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  return (
    <Box maxW={{ base: "95%", md: "80%" }} mx="auto" mt="8" p="4" borderWidth="1px" borderRadius="lg" bg="white" boxShadow="lg">
      <Heading as="h5" size="lg" mb="4" color="gray.700">Comments</Heading>
      <Textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
        size="md"
        mb="2"
        resize="vertical"
      />
      <Button colorScheme="orange" onClick={handleAddComment} isFullWidth>
        Add Comment
      </Button>
      <VStack align="stretch" mt="4" spacing="4">
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </VStack>
    </Box>
  );
};

export default CommentSection;
