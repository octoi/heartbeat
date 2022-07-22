import React from 'react';
import { Input } from '@chakra-ui/react';
import { SetState } from '../../../utils/types';

interface Props {
  searchQuery: string;
  setSearchQuery: SetState<string>;
}

export const SearchRecord: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <Input
      placeholder='Search records...'
      type='text'
      variant='filled'
      size='md'
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};
