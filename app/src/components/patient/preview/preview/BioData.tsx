import React from 'react';
import { PatientBioData, PatientMedicalBioData } from '../../../../utils/types';
import { checkString } from '../../../../utils/checkString';
import { getId } from '../../../../utils/getId';
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
  medicalBioData: PatientMedicalBioData;
  diagnosis: string[];
  createdAt: number;
  tableVariant: string;
}

export const BioData: React.FC<Props> = ({
  bioData,
  medicalBioData,
  createdAt,
  tableVariant,
  diagnosis,
}) => {
  return (
    <div>
      <h2 className='text-xl font-semibold mb-3'>BIODATA</h2>
      <LightMode>
        <Table variant={tableVariant} fontSize='lg'>
          <Thead fontSize='lg'>
            <Th>Id</Th>
            {bioData.name && <Th>Name</Th>}
            {bioData.age && <Th>Age</Th>}
            {medicalBioData.height && <Th>Height</Th>}
            {medicalBioData.weight && <Th>Weight</Th>}
            {medicalBioData.height && medicalBioData.weight && <Th>BMI</Th>}
          </Thead>
          <Tbody>
            <Tr>
              <Td>{getId(createdAt)}</Td>
              {bioData.name && <Td>{bioData.name}</Td>}
              {bioData.age && (
                <Td>
                  {bioData.age} {bioData.sex && ' / ' + bioData.sex[0]}
                </Td>
              )}
              {medicalBioData.height && (
                <Td>
                  {medicalBioData.height}
                  {medicalBioData.heightUnit}
                </Td>
              )}
              {medicalBioData.weight && <Td>{medicalBioData.weight}Kg</Td>}
              {medicalBioData.height && medicalBioData.weight && (
                <Td>{medicalBioData.bmi}</Td>
              )}
            </Tr>
          </Tbody>
        </Table>
      </LightMode>
      {bioData.address && (
        <Text mt={3} fontSize='lg'>
          <span className='mr-2'>Address : </span>
          {bioData.address}
        </Text>
      )}
      {medicalBioData.allergyToMedicine?.status && (
        <Text mt={3} color='red' className='text-lg font-medium'>
          Allergic to medicines
        </Text>
      )}
      {medicalBioData.allergyToMedicine?.medicines && (
        <OrderedList mt={2}>
          {medicalBioData.allergyToMedicine?.medicines
            .split('\n')
            .map((medicineName, idx) => (
              <ListItem key={idx} fontSize='lg'>
                {medicineName}
              </ListItem>
            ))}
        </OrderedList>
      )}
      {medicalBioData.remark && (
        <div className='mt-3'>
          <h2 className='text-xl font-medium'>REMARKS</h2>
          <Text mt={2} fontSize='lg' className='font-medium'>
            {medicalBioData.remark.toUpperCase()}
          </Text>
        </div>
      )}
      {diagnosis.length !== 0 && (
        <div className='mt-3'>
          <h2 className='text-xl font-medium'>DIAGNOSIS</h2>
          <OrderedList mt={2}>
            {diagnosis.map((value, idx) => (
              <ListItem key={idx} fontSize='lg'>
                {value}
              </ListItem>
            ))}
          </OrderedList>
        </div>
      )}
      {(checkString(medicalBioData.chiefComplaint) ||
        checkString(medicalBioData.pastMedicalHistory) ||
        checkString(medicalBioData.personalHistory) ||
        checkString(medicalBioData.familyHistory) ||
        checkString(medicalBioData.treatmentHistory)) && (
        <LightMode>
          <Table mt={3} variant={tableVariant}>
            <Tbody>
              {medicalBioData.chiefComplaint && (
                <Tr>
                  <Td fontWeight='medium'>CHIEF COMPLAINT</Td>
                  <Td>{medicalBioData.chiefComplaint}</Td>
                </Tr>
              )}
              {medicalBioData.pastMedicalHistory && (
                <Tr>
                  <Td fontWeight='medium'>PAST MEDICAL HISTORY</Td>
                  <Td>{medicalBioData.pastMedicalHistory}</Td>
                </Tr>
              )}
              {medicalBioData.personalHistory && (
                <Tr>
                  <Td fontWeight='medium'>PERSONAl HISTORY</Td>
                  <Td>{medicalBioData.personalHistory}</Td>
                </Tr>
              )}
              {medicalBioData.familyHistory && (
                <Tr>
                  <Td fontWeight='medium'>FAMILY HISTORY</Td>
                  <Td>{medicalBioData.familyHistory}</Td>
                </Tr>
              )}
              {medicalBioData.treatmentHistory && (
                <Tr>
                  <Td fontWeight='medium'>TREATMENT HISTORY</Td>
                  <Td>{medicalBioData.treatmentHistory}</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </LightMode>
      )}
    </div>
  );
};
