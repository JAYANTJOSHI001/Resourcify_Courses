// src/Comment.js
import React from 'react';
import { Avatar, Box, Text, Flex, VStack, Button, Textarea } from '@chakra-ui/react';
import { useState } from 'react';

const Comment = ({ comment }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');

  const handleAddReply = () => {
    if (newReply.trim()) {
      setReplies([...replies, newReply]);
      setNewReply('');
      setShowReplyBox(false);
    }
  };

  return (
    <Box mb="4">
      <Flex align="flex-start">
        <Avatar size="md" name={comment.author} src={comment.avatar} />
        <Box ml="3" flex="1">
          <Text fontWeight="bold">{comment.author}</Text>
          <Text fontSize="md" color="gray.600">{comment.timestamp}</Text>
          <Text mt="2">{comment.content}</Text>
          <Button
            variant="link"
            colorScheme="orange"
            size="md"
            onClick={() => setShowReplyBox(!showReplyBox)}
          >
            Reply
          </Button>
          {showReplyBox && (
            <Box mt="2">
              <Textarea
                size="md"
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Write a reply..."
              />
              <Button
                size="md"
                colorScheme="orange"
                mt="1"
                onClick={handleAddReply}
              >
                Add Reply
              </Button>
            </Box>
          )}
          <VStack align="stretch" mt="3" pl="5">
            {replies.map((reply, index) => (
              <Box key={index} mb="2">
                <Text fontWeight="bold">{comment.author}</Text>
                <Text>{reply}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Comment;
