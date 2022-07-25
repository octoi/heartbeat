import React from 'react';
import moment from 'moment';
import { PatientData, SetState } from '../../../utils/types';
import { EditBioData } from './EditBioData';
import { DeletePatient } from './DeletePatient';
import { BsCalendar3 } from 'react-icons/bs';
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

  let nextAppointment =
    patientData.records &&
    patientData.records?.length > 0 &&
    patientData.records[0].nextAppointment
      ? patientData.records[0].nextAppointment
      : null;

  return (
    <Flex
      direction='column'
      px={2}
      w='80'
      bg={colorMode == 'dark' ? 'gray.700' : 'gray.50'}
      height='fit-content'
      className='rounded p-5'
    >
      <Center>
        <Avatar name={bioData?.name} size='xl' />
      </Center>
      <Flex direction='row-reverse'>
        <DeletePatient patientId={patientId} patientName={bioData?.name} />
        <EditBioData
          patientId={patientId}
          patientData={patientData}
          setPatientData={setPatientData}
        />
      </Flex>
      <Text mt={3} fontSize='xl' fontWeight='medium'>
        {bioData?.name}
      </Text>
      {(bioData?.age || bioData?.sex) && (
        <Text mt={2} fontSize='lg'>
          {bioData?.age} {bioData?.sex}
        </Text>
      )}
      {bioData?.address && (
        <Text mt={2} fontSize='lg'>
          {bioData?.address}
        </Text>
      )}
      {nextAppointment &&
        (moment(nextAppointment).isAfter() ||
          moment(nextAppointment).isSame(moment(), 'day')) && (
          <Flex
            mt={3}
            direction='row'
            alignItems='center'
            className='opacity-80'
          >
            <BsCalendar3 />
            <Text ml={2}>
              {moment(nextAppointment).format('dddd, MMM D YYYY')}
            </Text>
          </Flex>
        )}
    </Flex>
  );
};
