import React from 'react';
import Logo from '../../../logo.svg';
import { Avatar, Flex, Heading, Text } from '@chakra-ui/react';
import moment from 'moment';

export const WaterMark: React.FC = () => {
  return (
    <Flex alignItems='center' justifyContent='space-between'>
      <Flex alignItems='center'>
        <Avatar src={Logo} />
        <Flex ml={2} alignItems='center'>
          <Heading className='text-2xl'>Heart</Heading>
          <Heading className='text-2xl' color='teal.400'>
            Beat
          </Heading>
        </Flex>
      </Flex>
      <Text fontSize='lg'>{moment(Date.now()).format('DD/MM/YYYY')}</Text>
    </Flex>
  );
};
