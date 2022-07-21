import React from 'react';
import { PatientData, SetState } from '../../utils/types';
import { EditBioData } from './EditBioData';
import { Avatar, Center, Flex, Text, useColorMode } from '@chakra-ui/react';

interface Props {
  patientId: number;
  patientData: PatientData;
  setPatientData: SetState<PatientData>;
}

export const BioData: React.FC<Props> = ({
  patientId,
  patientData,
  setPatientData,
}) => {
  const { colorMode } = useColorMode();

  const bioData = patientData.bioData;

  return (
    <Flex
      direction='column'
      px={2}
      w='72'
      bg={colorMode == 'dark' ? 'gray.700' : 'gray.50'}
      height='fit-content'
      className='rounded p-5'
    >
      <Center>
        <Avatar name={bioData?.name} size='xl' />
      </Center>
      <Text mt={5} fontSize='xl' fontWeight='medium'>
        {bioData?.name}
      </Text>
      <Text mt={2} fontSize='lg'>
        {bioData?.age} {bioData?.sex}
      </Text>
      <Text mt={2} fontSize='lg'>
        {bioData?.address}
      </Text>
      <EditBioData
        patientId={patientId}
        patientData={patientData}
        setPatientData={setPatientData}
      />
    </Flex>
  );
};
