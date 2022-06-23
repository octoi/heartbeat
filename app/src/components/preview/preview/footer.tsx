import React from 'react';
import Logo from '../../../logo.svg';
import { Flex, Text } from '@chakra-ui/react';

export const Footer: React.FC = () => {
  return (
    <Flex alignItems='center' justifyContent='space-between'>
      <Text>
        Printed using{' '}
        <span className='font-medium'>
          Heart<span className='text-teal-400'>Beat</span>
        </span>
      </Text>
      <img src={Logo} alt='HeartBeat' className='w-6 h-6' />
    </Flex>
  );
};
