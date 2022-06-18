import React, { useEffect, useState } from 'react';
import {
  PatientAdvice,
  PatientData,
  PatientMedicine,
  SetState,
} from '../../../utils/types';
import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { AdviceMedicines } from './adviceMedicines';

interface Props {
  patientData: PatientData;
  setPatientData: SetState<PatientData>;
  loading?: boolean;
}

export const Advice: React.FC<Props> = ({
  patientData,
  setPatientData,
  loading,
}) => {
  const [medicines, setMedicines] = useState<PatientMedicine[]>(
    patientData.advice?.medicines || []
  );
  const [advice, setAdvice] = useState(patientData.advice?.advice || '');

  useEffect(() => {
    let patientAdvice: PatientAdvice = {
      medicines,
      advice,
    };

    let newPatientData: PatientData = {
      ...patientData,
      advice: patientAdvice,
    };

    setPatientData(newPatientData);
  }, [advice, medicines]);

  return (
    <div>
      <Heading className='text-2xl' fontWeight='medium'>
        Advice
      </Heading>
      <AdviceMedicines
        medicines={medicines}
        setMedicines={setMedicines}
        loading={loading}
      />
      <Textarea
        mt={3}
        variant='filled'
        placeholder='Advice'
        value={advice}
        onChange={(e) => setAdvice(e.target.value)}
        disabled={loading}
      />
    </div>
  );
};
