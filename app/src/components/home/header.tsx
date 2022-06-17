import React from 'react';
import { Button, Flex, Input } from '@chakra-ui/react';
import { IoMdPersonAdd } from 'react-icons/io';
import { LogoDrawer } from '../logoDrawer';
import { Link } from 'react-router-dom';
import { SetState } from '../../utils/types';

interface Props {
  searchQuery: string;
  setSearchQuery: SetState<string>;
}

export const Header: React.FC<Props> = ({ searchQuery, setSearchQuery }) => {
  return (
    <Flex alignItems='center'>
      <LogoDrawer />
      <Input
        placeholder='Search...'
        type='text'
        variant='filled'
        size='md'
        mx={3}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Link to='/edit'>
        <Button size='md' colorScheme='teal'>
          <IoMdPersonAdd className='mr-2' />
          New patient
        </Button>
      </Link>
    </Flex>
  );
};
