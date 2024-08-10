import { Box, Button, Icon, HStack, Text, AspectRatio, Container, Grid } from '@chakra-ui/react';
import { CiAlarmOn } from 'react-icons/ci';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Coursedetails() {
    const { id } = useParams();
    console.log(id);
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                if (!id) {
                    throw new Error('Course ID is not defined');
                }
                const response = await fetch(`https://your-netlify-site.netlify.app/.netlify/functions/json-server/courses/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCourse(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchCourse();
    }, [id]);


    if (error) {
        return <Box>Error: {error}</Box>;
    }

    if (!course) {
        return <Box>Loading...</Box>;
    }

    return (
        <Container maxW="100%" bg="gray.100">
            <Container maxW="90%">
                <Box mb={8}>
                    <Box align="center" bg="gray.100" py={4}>
                        <Text fontWeight="bolder" fontSize={{ base: "20px", lg: "30px", xl: "40px" }}>{course.courseTitle}</Text>
                        <Text fontSize={{ base: "8px", lg: "10px", xl: "15px" }}>{course.courseDescription}</Text>
                    </Box>
                    <Box bg="gray.100">
                        <AspectRatio ratio={16 / 9} m="auto" maxWidth="100%">
                            <iframe src={course.videoSrc} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </AspectRatio>
                    </Box>
                    <Box align="center" bg="gray.100" py={4}>
                        <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)", xl: "repeat(2, 2fr)" }} gap={4} maxWidth="90%" m="auto">
                            {course.modules.map((module, moduleIndex) => (
                                <Box key={moduleIndex} bg="white" borderRadius="15px" p={4}>
                                    <Text fontSize="60px" fontWeight="bolder" align="right">{moduleIndex + 1}</Text>
                                    <Text fontSize="25px" fontWeight="bold" mb={4} align="left">{module.moduleTitle}</Text>
                                    {module.sections.map((section, sectionIndex) => (
                                        <HStack key={sectionIndex} justifyContent="space-between" mb={2}>
                                            <Box>
                                                <Text fontWeight="semibold" fontSize="20px">{section}</Text>
                                                <Text fontWeight="thin" fontSize="15px" align="left">Lesson {sectionIndex + 1}</Text>
                                            </Box>
                                            <Button>
                                                <Icon as={CiAlarmOn} />
                                                <Text>1 Hour</Text>
                                            </Button>
                                        </HStack>
                                    ))}
                                </Box>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Container>
    );
}

export default Coursedetails;
