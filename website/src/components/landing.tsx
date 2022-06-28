import React from 'react';
import LightApp from '../light_app.png';
import DarkApp from '../dark_app.png';
import {
  Center,
  Container,
  Heading,
  Link,
  Text,
  useColorMode,
} from '@chakra-ui/react';

export const Landing: React.FC = () => {
  const { colorMode } = useColorMode();

  return (
    <div className='my-10'>
      <Center>
        <Heading mt={16} size='4xl'>
          Building Productive Doctors
        </Heading>
      </Center>
      <Center>
        <Text fontSize='xl' mt={8} className='opacity-80'>
          <Link
            href='https://github.com/octoi/heartbeat'
            className='font-medium'
          >
            HeartBeat
          </Link>{' '}
          is an open-source desktop application for doctors to manage patient
          data .
        </Text>
      </Center>
      <Center mt={10}>
        <Container maxW='container.lg'>
          <img src={colorMode == 'dark' ? LightApp : DarkApp} alt='' />
        </Container>
      </Center>
    </div>
  );
};
