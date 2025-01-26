import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import LessonCard from '../components/lessons/LessonCard';

const Lessons = () => {
  const lessons = {
    beginner: [
      {
        id: 1,
        title: "Basic Greetings",
        description: "Learn essential greetings and introductions",
        progress: 75,
        level: "Beginner"
      },
      // Add more lessons
    ],
    intermediate: [
      {
        id: 1,
        title: "Daily Conversations",
        description: "Practice everyday conversations",
        progress: 30,
        level: "Intermediate"
      },
      // Add more lessons
    ],
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={8}>Your Lessons</Heading>
      
      <Tabs colorScheme="blue">
        <TabList>
          <Tab>Beginner</Tab>
          <Tab>Intermediate</Tab>
          <Tab>Advanced</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {lessons.beginner.map(lesson => (
                <LessonCard key={lesson.id} {...lesson} />
              ))}
            </SimpleGrid>
          </TabPanel>
          {/* Add other tab panels */}
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Lessons;