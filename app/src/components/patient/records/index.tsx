import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { PatientData, PatientRecord, SetState } from '../../../utils/types';
import { SearchRecord } from './SearchRecord';
import { NewRecordButton } from './NewRecordButton';

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
      {patientData.records &&
        patientData.records.map((record) => <p>{record.createdAt}</p>)}
    </div>
  );
};
