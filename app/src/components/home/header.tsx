import React from 'react';
import { Button, Flex, Input } from '@chakra-ui/react';
import { IoMdPersonAdd } from 'react-icons/io';
import { LogoDrawer } from '../logoDrawer';
import { Link } from 'react-router-dom';
import { Patient, SetState } from '../../utils/types';
import { Paths } from '../../utils/paths';
import { Appointments } from './Appointments';

interface Props {
  searchQuery: string;
  setSearchQuery: SetState<string>;
  appointedPatients: Patient[];
}

export const Header: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
  appointedPatients,
}) => {
  return (
    <Flex alignItems='center'>
      <LogoDrawer />
      <Input
        placeholder='Search...'
        type='text'
        variant='filled'
        size='md'
        mx={2}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Appointments appointedPatients={appointedPatients} />
      <Link to={Paths.NewPatient}>
        <Button size='md' colorScheme='teal'>
          <IoMdPersonAdd className='mr-2' />
          New patient
        </Button>
      </Link>
    </Flex>
  );
};
