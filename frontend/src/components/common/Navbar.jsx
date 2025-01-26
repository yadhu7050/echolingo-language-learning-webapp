import React from 'react';
import { Box, Flex, Button, Image, Select } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Flex 
      as="nav" 
      align="center" 
      justify="space-between" 
      padding="1rem"
      bg="white"
      boxShadow="sm"
    >
      <Link to="/">
        <Image src="/logo.png" alt="Logo" h="40px" />
      </Link>
      
      <Flex gap={4}>
        <Select placeholder="Select Language" w="150px">
          <option value="hindi">Hindi</option>
          <option value="tamil">Tamil</option>
          <option value="telugu">Telugu</option>
        </Select>
        
        <Link to="/lessons">
          <Button variant="ghost">Lessons</Button>
        </Link>
        
        <Link to="/login">
          <Button colorScheme="blue">Login</Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Navbar;