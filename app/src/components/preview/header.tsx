import React from 'react';
import { Flex, Heading, IconButton, Select } from '@chakra-ui/react';
import { LogoDrawer } from '../logoDrawer';
import { CgClose } from 'react-icons/cg';
import { AiOutlinePrinter } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SetState } from '../../utils/types';

interface Props {
  printContent: any;
  printLoading: boolean;
  tableVariant: string;
  setTableVariant: SetState<string>;
}

export const Header: React.FC<Props> = ({
  printContent,
  printLoading,
  tableVariant,
  setTableVariant,
}) => {
  return (
    <Flex alignItems='center' justifyContent='space-between'>
      <Flex alignItems='center'>
        <LogoDrawer />
        <Heading className='text-2xl font-bold' ml={3}>
          Preview
        </Heading>
      </Flex>

      <Flex alignItems='center'>
        <Select
          value={tableVariant}
          onChange={(e) => setTableVariant(e.target.value)}
          mr={2}
          variant='filled'
        >
          <option value='striped'>Striped</option>
          <option value='simple'>Simple</option>
          <option value='unstyled'>Un-styled</option>
        </Select>
        <IconButton
          aria-label='print'
          icon={<AiOutlinePrinter size={18} />}
          size='md'
          mr={2}
          colorScheme='teal'
          onClick={printContent}
          isLoading={printLoading}
        />
        <Link to='/'>
          <IconButton
            aria-label='close'
            icon={<CgClose />}
            size='md'
            disabled={printLoading}
          />
        </Link>
      </Flex>
    </Flex>
  );
};
