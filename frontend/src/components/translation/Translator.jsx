import React, { useState } from 'react';
import {
  Box,
  VStack,
  Textarea,
  Button,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react';

const Translator = () => {
  const [text, setText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('hindi');
  const [translation, setTranslation] = useState('');
  const toast = useToast();

  const handleTranslate = async () => {
    // Add translation logic here
    toast({
      title: 'Translation successful',
      status: 'success',
      duration: 3000,
    });
  };

  return (
    <Box p={6}>
      <VStack spacing={4}>
        <Select 
          value={targetLanguage} 
          onChange={(e) => setTargetLanguage(e.target.value)}
        >
          <option value="hindi">Hindi</option>
          <option value="tamil">Tamil</option>
          <option value="telugu">Telugu</option>
        </Select>
        
        <Textarea
          placeholder="Enter text to translate..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        <Button 
          colorScheme="blue" 
          onClick={handleTranslate}
        >
          Translate
        </Button>
        
        {translation && (
          <Text p={4} borderWidth={1} borderRadius="md">
            {translation}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default Translator;