import React from 'react';
import { VStack, HStack, Text, Button, Box, Icon } from '@chakra-ui/react';
import { FiPlusCircle } from 'react-icons/fi';
import { CgMenuGridO } from 'react-icons/cg';
import { MdOutlineModeEdit, MdDelete } from 'react-icons/md';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ChapterList = ({ chapterList, handleChapterClick, deleteChapterByTitle, onDragEnd }) => {

    return (
        <VStack w="50%" flexDirection='column'>
            <VStack w='100%' bg="gray.100" p="20px" borderRadius='5px'>
                <HStack w='100%' justifyContent='space-between'>
                    <Text fontWeight='semibold'>Add Chapters</Text>
                    <Button leftIcon={<FiPlusCircle />} onClick={handleChapterClick}>New Chapter</Button>
                </HStack>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="chapters">
                        {(provided) => (
                            <VStack
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                w='100%'
                            >
                                {chapterList.map((chapter, index) => (
                                    <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                                        {(provided) => (
                                            <HStack
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                w='100%'
                                                justifyContent='space-between'
                                                bg='white'
                                                p='10px'
                                                borderRadius='5px'
                                                mb='10px'
                                            >
                                                <HStack>
                                                    <Box bg='#F6D6A8' h={12} w={12} borderRadius='50%' p={1} color='#FF9500'>
                                                        <Icon as={CgMenuGridO} h={10} w={10} />
                                                    </Box>
                                                    <Text>{chapter.title}</Text>
                                                </HStack>
                                                <HStack>
                                                    <Button leftIcon={<MdOutlineModeEdit />} variant='link'>Edit</Button>
                                                    <Button leftIcon={<MdDelete />} onClick={() => deleteChapterByTitle(chapter.title)} variant='link'>Delete</Button>
                                                </HStack>
                                            </HStack>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </VStack>
                        )}
                    </Droppable>
                </DragDropContext>
            </VStack>
        </VStack>
    );
};

export default ChapterList;
