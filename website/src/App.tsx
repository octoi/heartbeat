import React from 'react';
import { Container } from '@chakra-ui/react';
import { Header } from './components/header';

export const App: React.FC = () => {
  return (
    <Container maxW='container.xl'>
      <Header />
    </Container>
  );
};
