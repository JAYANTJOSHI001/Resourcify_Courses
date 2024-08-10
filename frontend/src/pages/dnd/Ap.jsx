import React, { useState } from 'react';
import { ChakraProvider, Box, Tag, TagLabel } from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Function to reorder the tags in the list
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const DragDropTags = () => {
  const [tagList, setTagList] = useState(['Tag1', 'Tag2', 'Tag3', 'Tag4']);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const reorderedTags = reorder(
      tagList,
      result.source.index,
      result.destination.index
    );
    setTagList(reorderedTags);
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided) => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                display="flex"
                flexWrap="wrap"
                bg="gray.50"
                p={4}
                borderRadius="md"
                boxShadow="md"
              >
                {tagList.map((tag, index) => (
                  <Draggable key={tag} draggableId={tag} index={index}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        mr={2}
                        mb={2}
                        bg="white"
                        p={2}
                        borderRadius="md"
                        boxShadow="md"
                      >
                        <Tag>
                          <TagLabel>{tag}</TagLabel>
                        </Tag>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </ChakraProvider>
  );
};

export default DragDropTags;
