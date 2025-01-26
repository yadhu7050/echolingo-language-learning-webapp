import React from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Image,
  Progress,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';

const Profile = () => {
  const userStats = {
    daysStreak: 7,
    totalLessons: 25,
    completedLessons: 15,
    currentLanguage: 'Hindi',
    level: 'Intermediate'
  };

  return (
    <Container maxW="container.xl" py={8}>
      {/* Profile Header */}
      <HStack spacing={8} mb={8}>
        <Image
          borderRadius="full"
          boxSize="150px"
          src="https://via.placeholder.com/150"
          alt="Profile"
        />
        <VStack align="start" spacing={3}>
          <Heading>John Doe</Heading>
          <Text color="gray.600">Learning {userStats.currentLanguage}</Text>
          <Text color="blue.500">Level: {userStats.level}</Text>
        </VStack>
      </HStack>

      {/* Stats Grid */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        <Stat p={4} shadow="md" borderRadius="lg">
          <StatLabel>Days Streak</StatLabel>
          <StatNumber>{userStats.daysStreak}</StatNumber>
          <StatHelpText>Keep it up! 🔥</StatHelpText>
        </Stat>
        <Stat p={4} shadow="md" borderRadius="lg">
          <StatLabel>Lessons Completed</StatLabel>
          <StatNumber>{userStats.completedLessons}</StatNumber>
          <Progress 
            value={(userStats.completedLessons/userStats.totalLessons)*100} 
            colorScheme="blue"
          />
        </Stat>
        <Stat p={4} shadow="md" borderRadius="lg">
          <StatLabel>Total Points</StatLabel>
          <StatNumber>1250</StatNumber>
          <StatHelpText>Top 10% of users</StatHelpText>
        </Stat>
      </SimpleGrid>

      {/* Recent Activity */}
      <Box>
        <Heading size="md" mb={4}>Recent Activity</Heading>
        <VStack spacing={4} align="stretch">
          {/* Add activity items here */}
          <Box p={4} borderWidth={1} borderRadius="lg">
            <Text>Completed Lesson: Basic Greetings</Text>
            <Text fontSize="sm" color="gray.500">2 hours ago</Text>
          </Box>
          <Box p={4} borderWidth={1} borderRadius="lg">
            <Text>Practiced Pronunciation</Text>
            <Text fontSize="sm" color="gray.500">Yesterday</Text>
          </Box>
        </VStack>
      </Box>
    </Container>
  );
};

export default Profile;