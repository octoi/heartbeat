import React from 'react';
import { Flex, Heading, IconButton } from '@chakra-ui/react';
import { LogoDrawer } from '../logoDrawer';
import { CgClose } from 'react-icons/cg';
import { AiOutlinePrinter } from 'react-icons/ai';
import { Link } from 'react-router-dom';

interface Props {
  printContent: any;
  printLoading: boolean;
}

export const Header: React.FC<Props> = ({ printContent, printLoading }) => {
  return (
    <Flex alignItems='center' justifyContent='space-between'>
      <Flex alignItems='center'>
        <LogoDrawer />
        <Heading className='text-2xl font-bold' ml={3}>
          Preview
        </Heading>
      </Flex>

      <Flex alignItems='center'>
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
