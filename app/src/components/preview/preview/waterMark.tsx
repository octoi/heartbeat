import React from 'react';
import Logo from '../../../logo.svg';
import moment from 'moment';
import { Avatar, Flex, Heading, Text } from '@chakra-ui/react';

export const WaterMark: React.FC = () => {
  const doctorDetails = localStorage.getItem('doctorDetails') || '';

  return (
    <Flex alignItems='center' justifyContent='space-between'>
      {doctorDetails.trim().length !== 0 ? (
        <Text fontSize='lg' fontWeight='medium'>
          {doctorDetails.split('\n').map((val, idx) => (
            <p key={idx}>{val}</p>
          ))}
        </Text>
      ) : (
        <Flex alignItems='center'>
          <Avatar src={Logo} />
          <Flex ml={2} alignItems='center'>
            <Heading className='text-2xl'>Heart</Heading>
            <Heading className='text-2xl' color='teal.400'>
              Beat
            </Heading>
          </Flex>
        </Flex>
      )}
      <Text fontSize='lg'>{moment(Date.now()).format('DD/MM/YYYY')}</Text>
    </Flex>
  );
};
