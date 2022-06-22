import React from 'react';
import moment from 'moment';
import { PatientBioData } from '../../../utils/types';
import { checkString } from '../../../utils/checkString';
import {
  LightMode,
  ListItem,
  OrderedList,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

interface Props {
  bioData: PatientBioData;
  createdAt: number;
}

export const BioData: React.FC<Props> = ({ bioData, createdAt }) => {
  return (
    <div>
      <h2 className='text-xl font-semibold mb-3'>BIODATA</h2>
      <LightMode>
        <Table variant='striped' fontSize='lg'>
          <Thead fontSize='lg'>
            <Th>Id</Th>
            {bioData.name && <Th>Name</Th>}
            {bioData.age && <Th>Age</Th>}
            {bioData.height && <Th>Height</Th>}
            {bioData.weight && <Th>Weight</Th>}
            {bioData.height && bioData.weight && <Th>BMI</Th>}
          </Thead>
          <Tbody>
            <Tr>
              <Td>{moment(createdAt).format('lll')}</Td>
              {bioData.name && <Td>{bioData.name}</Td>}
              {bioData.age && (
                <Td>
                  {bioData.age} {bioData.sex && ' / ' + bioData.sex[0]}
                </Td>
              )}
              {bioData.height && <Td>{bioData.height}</Td>}
              {bioData.weight && <Td>{bioData.weight}</Td>}
              {bioData.height && bioData.weight && <Td>{bioData.bmi}</Td>}
            </Tr>
          </Tbody>
        </Table>
      </LightMode>
      {bioData.address && (
        <Text mt={3} fontSize='lg'>
          <span className='mr-2'>ADDRESS : </span>
          {bioData.address}
        </Text>
      )}
      {bioData.allergyToMedicine?.status && (
        <Text mt={3} color='red' className='text-lg font-medium'>
          Allergic to medicines
        </Text>
      )}
      {bioData.allergyToMedicine?.medicines && (
        <OrderedList mt={2} ml={5}>
          {bioData.allergyToMedicine?.medicines
            .split('\n')
            .map((medicineName, idx) => (
              <ListItem key={idx} fontSize='lg'>
                {medicineName}
              </ListItem>
            ))}
        </OrderedList>
      )}
      {bioData.diagnosis && (
        <div className='mt-3'>
          <h2 className='text-xl font-medium'>DIAGNOSIS</h2>
          <Text mt={2} fontSize='lg'>
            {bioData.diagnosis}
          </Text>
        </div>
      )}
      {(checkString(bioData.chiefComplaint) ||
        checkString(bioData.pastMedicalHistory) ||
        checkString(bioData.personalHistory) ||
        checkString(bioData.familyHistory) ||
        checkString(bioData.treatmentHistory)) && (
        <LightMode>
          <Table mt={3} variant='striped'>
            <Thead>
              <Th>title</Th>
              <Th>content</Th>
            </Thead>
            <Tbody>
              {bioData.chiefComplaint && (
                <Tr>
                  <Td>CHIEF COMPLAINT</Td>
                  <Td>{bioData.chiefComplaint}</Td>
                </Tr>
              )}
              {bioData.pastMedicalHistory && (
                <Tr>
                  <Td>PAST MEDICAL HISTORY</Td>
                  <Td>{bioData.pastMedicalHistory}</Td>
                </Tr>
              )}
              {bioData.personalHistory && (
                <Tr>
                  <Td>PERSONAl HISTORY</Td>
                  <Td>{bioData.personalHistory}</Td>
                </Tr>
              )}
              {bioData.familyHistory && (
                <Tr>
                  <Td>FAMILY HISTORY</Td>
                  <Td>{bioData.familyHistory}</Td>
                </Tr>
              )}
              {bioData.treatmentHistory && (
                <Tr>
                  <Td>TREATMENT HISTORY</Td>
                  <Td>{bioData.treatmentHistory}</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </LightMode>
      )}
    </div>
  );
};
