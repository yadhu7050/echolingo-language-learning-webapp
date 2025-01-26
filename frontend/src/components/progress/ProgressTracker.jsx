import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Progress,
  Text,
  SimpleGrid,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';

const ProgressTracker = () => {
  const progressData = {
    overall: 65,
    categories: {
      vocabulary: 80,
      grammar: 60,
      pronunciation: 70,
      reading: 50
    }
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        <Heading size="md">Learning Progress</Heading>

        {/* Overall Progress */}
        <Box>
          <Text mb={2}>Overall Progress</Text>
          <Progress 
            value={progressData.overall} 
            colorScheme="blue" 
            height="24px"
            borderRadius="full"
          />
        </Box>

        {/* Category Progress */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
          {Object.entries(progressData.categories).map(([category, value]) => (
            <VStack key={category}>
              <CircularProgress value={value} color="blue.400" size="100px">
                <CircularProgressLabel>{value}%</CircularProgressLabel>
              </CircularProgress>
              <Text>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
            </VStack>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default ProgressTracker;