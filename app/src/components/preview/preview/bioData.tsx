import React from 'react';
import { PatientBioData } from '../../../utils/types';
import { LightMode, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import moment from 'moment';

interface Props {
  bioData: PatientBioData;
  createdAt: number;
}

export const BioData: React.FC<Props> = ({ bioData, createdAt }) => {
  return (
    <div>
      <h2 className='text-xl font-semibold mb-3'>Biodata</h2>
      <LightMode>
        <Table variant='striped'>
          <Thead>
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
    </div>
  );
};
