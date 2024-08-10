import { Box, Button, Container, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CourseList() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:3000/courses');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCourses(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchCourses();
    }, []);

    if (error) {
        return <Box>Error: {error}</Box>;
    }

    if (courses.length === 0) {
        return <Box>Loading...</Box>;
    }

    return (
        <Container maxW="100%" bg="gray.100">
            <Container maxW="90%">
                {courses.map((course, courseIndex) => (
                    <Box key={courseIndex} mb={8} bg="white" p={4} borderRadius="md">
                        <Text fontWeight="bold" fontSize="xl">{course.courseTitle}</Text>
                        <Text>{course.courseDescription}</Text>
                        <Link to={`/courses/${course.id}`}>
                            <Button mt={4}>View Course</Button>
                        </Link>
                    </Box>
                ))}
            </Container>
        </Container>
    );
}

export default CourseList;
