import React from 'react';
import moment from 'moment';
import { Patient, PatientData } from '../../utils/types';
import { FiEdit } from 'react-icons/fi';
import { RiEyeLine } from 'react-icons/ri';
import {
  Avatar,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

interface Props {
  patients: Patient[];
  loading: boolean;
}

export const Patients: React.FC<Props> = ({ patients, loading }) => {
  return (
    <div className='mt-5'>
      {loading && <p>Loading ...</p>}
      {!loading && patients.length !== 0 && (
        <TableContainer>
          <Table variant='striped'>
            <Thead>
              <Tr>
                <Th>Index</Th>
                <Th>Avatar</Th>
                <Th>Name</Th>
                <Th>Last updated</Th>
                <Th>Edit</Th>
                <Th>View</Th>
              </Tr>
            </Thead>
            <Tbody>
              {patients.map((patient, idx) => {
                const patientData: PatientData = JSON.parse(patient.data);
                return (
                  <Tr key={patient.id}>
                    <Td>{idx + 1}</Td>
                    <Td>
                      <Avatar
                        name={patientData?.bioData?.name}
                        getInitials={(name) => name.substring(0, 2)}
                      />
                    </Td>
                    <Td>{patientData?.bioData?.name}</Td>
                    <Td>{moment(patientData?.updatedAt).fromNow()}</Td>
                    <Td>
                      <IconButton
                        aria-label='Edit patient'
                        variant='ghost'
                        colorScheme='blue'
                        icon={<FiEdit />}
                      />
                    </Td>
                    <Td>
                      <IconButton
                        aria-label='View patient'
                        variant='ghost'
                        colorScheme='teal'
                        icon={<RiEyeLine />}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
