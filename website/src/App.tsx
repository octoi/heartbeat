import React from 'react';
import { Container } from '@chakra-ui/react';
import { Header } from './components/header';
import { Landing } from './components/landing';
import { About } from './components/about';

export const App: React.FC = () => {
  return (
    <Container maxW='container.xl' mb={10}>
      <Header />
      <Landing />
      <About />
    </Container>
  );
};
