import React from 'react';
import { PatientAdvice } from '../../../utils/types';
import {
  LightMode,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

interface Props {
  advice: PatientAdvice;
  tableVariant: string;
}

export const Advice: React.FC<Props> = ({ advice, tableVariant }) => {
  const check =
    advice.advice ||
    (advice.medicines && advice.medicines.length !== 0) ||
    advice.investigationToDo;

  if (!check) return null;

  return (
    <div className='mt-5'>
      <h2 className='text-xl font-semibold mb-3'>ADVICE</h2>
      {advice.advice && (
        <Text mt={1} fontSize='lg'>
          {advice.advice}
        </Text>
      )}
      {advice.medicines && advice.medicines.length !== 0 && (
        <LightMode>
          <Table mt={2} variant={tableVariant}>
            <Thead>
              <Th>Index</Th>
              <Th>Medicine</Th>
              <Th>Frequency</Th>
              <Th>Time</Th>
              <Th>Duration</Th>
            </Thead>
            <Tbody>
              {advice.medicines.map((medicine, idx) => (
                <Tr key={idx}>
                  <Td>{idx + 1}</Td>
                  <Td>{medicine.medicineName}</Td>
                  <Td>{medicine.frequency}</Td>
                  <Td>{medicine.time}</Td>
                  <Td>{medicine.duration}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </LightMode>
      )}
      {advice.investigationToDo && (
        <div className='mt-3'>
          <h2 className='text-xl font-medium'>INVESTIGATION TO DO</h2>
          <Text mt={2} fontSize='lg'>
            {advice.investigationToDo}
          </Text>
        </div>
      )}
    </div>
  );
};
