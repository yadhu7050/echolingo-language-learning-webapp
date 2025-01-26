import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Image,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Container maxW="container.xl" py={20}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <VStack align="start" spacing={6}>
            <Heading size="2xl">
              Learn Languages with AI
            </Heading>
            <Text fontSize="xl" color="gray.600">
              Master multiple Indian languages through interactive lessons
              and AI-powered practice.
            </Text>
            <Button
              as={Link}
              to="/register"
              colorScheme="blue"
              size="lg"
            >
              Get Started
            </Button>
          </VStack>
          <Box>
            <Image src="/hero-image.png" alt="Learning" />
          </Box>
        </SimpleGrid>
      </Container>

      {/* Features Section */}
      <Box bg="gray.50" py={20}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            {/* Add feature cards here */}
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;