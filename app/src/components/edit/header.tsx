import React from 'react';
import { Flex, Heading, IconButton } from '@chakra-ui/react';
import { LogoDrawer } from '../logoDrawer';
import { CgClose } from 'react-icons/cg';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <Flex alignItems='center' justifyContent='space-between'>
      <Flex alignItems='center'>
        <LogoDrawer />
        <Heading className='text-2xl font-bold' ml={3}>
          New patient
        </Heading>
      </Flex>
      <Link to='/'>
        <IconButton
          aria-label='close'
          icon={<CgClose />}
          colorScheme='red'
          size='md'
        />
      </Link>
    </Flex>
  );
};
