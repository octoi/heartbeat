import React from 'react';
import { MdOutlineDarkMode } from 'react-icons/md';
import { FiSun } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import {
  Flex,
  Heading,
  IconButton,
  Tag,
  TagLabel,
  useColorMode,
} from '@chakra-ui/react';

export const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex mt={8} alignItems='center' justifyContent='space-between'>
      <Flex alignItems='center'>
        <img
          src='https://raw.githubusercontent.com/octoi/heartbeat/main/website/assets/logo.svg'
          alt='HeartBeat'
          className='w-9'
        />
        <h2 className='text-2xl font-bold ml-2'>
          Heart
          <span className='text-teal-400'>Beat</span>
        </h2>
        <Tag ml={2} borderRadius='full'>
          <TagLabel>0.1.0</TagLabel>
        </Tag>
      </Flex>
      <Flex alignItems='center'>
        <a href='https://github.com/octoi/heartbeat'>
          <IconButton
            aria-label='Github'
            icon={<FaGithub className='text-xl' />}
            variant='ghost'
          />
        </a>
        <IconButton
          aria-label='Toggle theme'
          icon={
            colorMode === 'light' ? (
              <MdOutlineDarkMode className='text-xl' />
            ) : (
              <FiSun className='text-xl' />
            )
          }
          onClick={toggleColorMode}
          variant='ghost'
        />
      </Flex>
    </Flex>
  );
};
