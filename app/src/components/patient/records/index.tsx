import React, { useState } from 'react';
import moment from 'moment';
import { PatientData, SetState } from '../../../utils/types';
import { SearchRecord } from './SearchRecord';
import { NewRecordButton } from './NewRecordButton';
import { RiEyeLine } from 'react-icons/ri';
import { EditRecord } from './EditRecord';
import {
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { DeleteRecord } from './DeleteRecord';

interface Props {
  patientId: number;
  patientData: PatientData;
  setPatientData: SetState<PatientData>;
}

export const PatientRecords: React.FC<Props> = ({
  patientId,
  patientData,
  setPatientData,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className='w-full ml-2'>
      <Flex>
        <SearchRecord
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <NewRecordButton
          patientId={patientId}
          patientData={patientData}
          setPatientData={setPatientData}
        />
      </Flex>
      <TableContainer mt={5}>
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>Index</Th>
              <Th>Created at</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
              <Th>Preview</Th>
            </Tr>
          </Thead>
          <Tbody>
            {patientData.records &&
              patientData.records
                .filter((record) => {
                  return moment(record.createdAt)
                    .format('LLLL')
                    .trim()
                    .toLowerCase()
                    .includes(searchQuery.trim().toLowerCase());
                })
                .map((record, idx) => (
                  <Tr key={idx}>
                    <Td>{idx + 1}</Td>
                    <Td>{moment(record.createdAt).format('llll')}</Td>
                    <Td>
                      <EditRecord
                        patientId={patientId}
                        patientData={patientData}
                        setPatientData={setPatientData}
                        record={record}
                      />
                    </Td>
                    <Td>
                      <DeleteRecord
                        patientId={patientId}
                        patientData={patientData}
                        setPatientData={setPatientData}
                        currentRecordCreatedAt={record.createdAt || 0}
                      />
                    </Td>
                    <Td>
                      <IconButton
                        aria-label='preview'
                        variant='ghost'
                        colorScheme='teal'
                        icon={<RiEyeLine className='text-xl' />}
                      />
                    </Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};
