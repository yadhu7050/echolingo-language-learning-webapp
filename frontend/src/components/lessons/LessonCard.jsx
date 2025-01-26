import React from 'react';
import {
  Box,
  Heading,
  Text,
  Progress,
  Badge,
  VStack,
} from '@chakra-ui/react';

const LessonCard = ({ title, description, progress, level }) => {
  return (
    <Box 
      p={5} 
      shadow="md" 
      borderWidth="1px" 
      borderRadius="lg"
      _hover={{ shadow: 'lg' }}
    >
      <VStack align="start" spacing={3}>
        <Badge colorScheme="green">{level}</Badge>
        <Heading size="md">{title}</Heading>
        <Text color="gray.600">{description}</Text>
        <Progress 
          value={progress} 
          width="100%" 
          colorScheme="blue" 
          borderRadius="full"
        />
        <Text fontSize="sm" color="gray.500">
          {progress}% Complete
        </Text>
      </VStack>
    </Box>
  );
};

export default LessonCard;