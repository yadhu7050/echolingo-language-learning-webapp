import React from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Progress,
  SimpleGrid,
  Card,
  CardBody,
} from '@chakra-ui/react';

const LessonDetail = () => {
  const lessonData = {
    title: "Basic Greetings",
    progress: 75,
    content: [
      {
        english: "Hello",
        hindi: "नमस्ते",
        pronunciation: "namaste"
      },
      // Add more phrases
    ]
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading>{lessonData.title}</Heading>
          <Progress 
            value={lessonData.progress} 
            mt={4} 
            colorScheme="blue"
          />
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {lessonData.content.map((item, index) => (
            <Card key={index}>
              <CardBody>
                <VStack align="start" spacing={2}>
                  <Text fontSize="xl">{item.english}</Text>
                  <Text fontSize="2xl" color="blue.600">
                    {item.hindi}
                  </Text>
                  <Text color="gray.500">
                    Pronunciation: {item.pronunciation}
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        <Button colorScheme="blue" size="lg" alignSelf="center">
          Start Practice
        </Button>
      </VStack>
    </Container>
  );
};

export default LessonDetail;