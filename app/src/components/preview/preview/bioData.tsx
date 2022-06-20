import React from 'react';
import { PatientBioData } from '../../../utils/types';
import { Text } from '@chakra-ui/react';

interface Props {
  bioData: PatientBioData;
}

export const BioData: React.FC<Props> = ({ bioData }) => {
  return (
    <div>
      <h2 className='text-2xl font-semibold mb-3'>Biodata</h2>
      {bioData.name && (
        <Text className='font-medium' fontSize='lg'>
          Name : <span className='font-normal'>{bioData.name}</span>
        </Text>
      )}
    </div>
  );
};
