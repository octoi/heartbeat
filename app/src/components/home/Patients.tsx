import React from 'react';
import moment from 'moment';
import { Patient, PatientData } from '../../utils/types';
import { TiFolderOpen } from 'react-icons/ti';
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
      {patients.length === 0 && <p>No patients</p>}
      {!loading && patients.length !== 0 && (
        <TableContainer>
          <Table variant='striped'>
            <Thead>
              <Tr>
                <Th>Index</Th>
                <Th>ID</Th>
                <Th>Avatar</Th>
                <Th>Name</Th>
                <Th>Created at</Th>
                <Th>Last updated</Th>
                <Th>View</Th>
              </Tr>
            </Thead>
            <Tbody>
              {patients.map((patient, idx) => {
                const patientData: PatientData = JSON.parse(patient.data);
                return (
                  <Tr key={patient.id}>
                    <Td>{idx + 1}</Td>
                    <Td>{patient.id}</Td>
                    <Td>
                      <Avatar
                        name={patientData?.bioData?.name}
                        getInitials={(name) => name.substring(0, 2)}
                      />
                    </Td>
                    <Td>{patientData?.bioData?.name}</Td>
                    <Td>
                      {moment(patientData?.createdAt).format(
                        'DD/MM/yy hh:mm A'
                      )}
                    </Td>
                    <Td>
                      {moment(
                        patientData.records != undefined
                          ? patientData.records[0].createdAt
                          : patientData.createdAt
                      ).fromNow()}
                    </Td>
                    <Td>
                      <IconButton
                        aria-label='View patient'
                        variant='ghost'
                        colorScheme='teal'
                        icon={<TiFolderOpen className='text-xl' />}
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
