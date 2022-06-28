import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { Flex, Link, Text } from '@chakra-ui/react';

export const Footer: React.FC = () => {
  return (
    <Flex mt={16} mb={10} alignItems='center' justifyContent='space-between'>
      <Flex alignItems='center'>
        <Text fontSize='lg' className='opacity-70'>
          Made with
        </Text>
        <Text mx={1} fontSize='lg' color='red.300'>
          <AiFillHeart />
        </Text>
        <Link
          href='https://fadhilsaheer.github.io'
          fontSize='lg'
          className='opacity-70 font-medium'
        >
          Fadhil
        </Link>
      </Flex>
      <Text fontSize='lg' className='opacity-70'>
        © HeartBeat {new Date().getFullYear()}
      </Text>
    </Flex>
  );
};
