import React, { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';

const Practice = () => {
  const [answer, setAnswer] = useState('');
  const toast = useToast();

  const checkAnswer = () => {
    // Add answer checking logic
    toast({
      title: 'Correct!',
      status: 'success',
      duration: 2000,
    });
  };

  return (
    <Box p={6}>
      <VStack spacing={6}>
        <Heading size="md">Practice Exercise</Heading>
        
        <Text fontSize="xl">
          Translate: "Hello, how are you?"
        </Text>
        
        <Input
          placeholder="Type your answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        
        <Button 
          colorScheme="blue"
          onClick={checkAnswer}
        >
          Check Answer
        </Button>
      </VStack>
    </Box>
  );
};

export default Practice;