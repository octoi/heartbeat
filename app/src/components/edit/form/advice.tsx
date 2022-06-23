import React, { useEffect, useState } from 'react';
import { Heading, Textarea } from '@chakra-ui/react';
import { AdviceMedicines } from './adviceMedicines';
import {
  PatientAdvice,
  PatientData,
  PatientMedicine,
  SetState,
} from '../../../utils/types';

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
      <div className='mt-3'>
        <h2 className='mb-2 text-md'>Advice</h2>
        <Textarea
          variant='filled'
          placeholder='Advice'
          value={advice}
          onChange={(e) => setAdvice(e.target.value)}
          disabled={loading}
        />
      </div>
    </div>
  );
};
