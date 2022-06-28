import React from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { FaWindows } from 'react-icons/fa';
import {
  Button,
  Center,
  DarkMode,
  Flex,
  Heading,
  Link,
  List,
  ListIcon,
  Text,
} from '@chakra-ui/react';

export const About: React.FC = () => {
  return (
    <div className='mt-24'>
      <Heading fontSize='3xl'>About</Heading>
      <Text fontSize='xl' mt={5} className='opacity-80'>
        <Link href='https://github.com/octoi/heartbeat' className='font-medium'>
          HeartBeat
        </Link>{' '}
        is a patient management system designed for doctors. In this app doctors
        can add patient data using simple forms, which later they can save as
        PDF or print as document.
      </Text>
      <Heading fontSize='3xl' mt={5} className='opacity-90'>
        Features
      </Heading>
      <List spacing={4}>
        <CustomListItem title='Store patient data securely' />
        <CustomListItem title='Edit / Delete patient data anytime' />
        <CustomListItem title='Search patients' />
        <CustomListItem title='Preview patient data as a document' />
        <CustomListItem title='Save patient data as PDF' />
        <CustomListItem title='Print patient data from app' />
        <CustomListItem title='Dark / Light mode' />
      </List>
      <DarkMode>
        <a
          download
          href='https://github.com/octoi/heartbeat/releases/download/0.1.0/heartbeat_0.1.0_x64_en-US.msi'
        >
          <Button mt={10} size='lg' colorScheme='teal'>
            <FaWindows className='mr-2' />
            Download for windows
          </Button>
        </a>
      </DarkMode>
    </div>
  );
};

const CustomListItem: React.FC<{
  title: string;
}> = ({ title }) => {
  return (
    <Flex
      alignItems='center'
      justifyContent='flex-start'
      className='opacity-80'
      fontSize='xl'
      mt={5}
    >
      <ListIcon as={MdCheckCircle} color='teal.400' className='text-2xl' />
      {title}
    </Flex>
  );
};
