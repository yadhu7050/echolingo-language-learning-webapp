import React from 'react';
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Switch,
  Select,
  Button,
  Divider,
} from '@chakra-ui/react';

const Settings = () => {
  return (
    <Box p={6}>
      <VStack spacing={4} align="stretch">
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">
            Daily Reminders
          </FormLabel>
          <Switch colorScheme="blue" />
        </FormControl>

        <Divider />

        <FormControl>
          <FormLabel>Preferred Language</FormLabel>
          <Select defaultValue="hindi">
            <option value="hindi">Hindi</option>
            <option value="tamil">Tamil</option>
            <option value="telugu">Telugu</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Difficulty Level</FormLabel>
          <Select defaultValue="intermediate">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </Select>
        </FormControl>

        <Button colorScheme="blue">
          Save Settings
        </Button>
      </VStack>
    </Box>
  );
};

export default Settings;