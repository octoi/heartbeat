import React from 'react';
import { Container } from '@chakra-ui/react';
import { Header } from './components/header';
import { Landing } from './components/landing';

export const App: React.FC = () => {
  return (
    <Container maxW='container.xl'>
      <Header />
      <Landing />
    </Container>
  );
};
