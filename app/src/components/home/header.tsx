import React, { useState } from 'react';
import { Button, Flex, Input } from '@chakra-ui/react';
import { IoMdPersonAdd } from 'react-icons/io';
import { LogoDrawer } from '../logoDrawer';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Flex alignItems='center'>
      <LogoDrawer />
      <Input
        placeholder='Search...'
        type='text'
        variant='filled'
        size='lg'
        mx={3}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Link to='/edit'>
        <Button size='lg' colorScheme='teal'>
          <IoMdPersonAdd className='mr-2' />
          New patient
        </Button>
      </Link>
    </Flex>
  );
};
