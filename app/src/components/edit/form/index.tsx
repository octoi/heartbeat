import { Button, SimpleGrid } from '@chakra-ui/react';
import React, { useState } from 'react';
import { PatientData } from '../../../utils/types';
import { BioData } from './bioData';
import { ExaminationForm } from './examination';

export const EditForm: React.FC = () => {
  const [patientData, setPatientData] = useState<PatientData>({});
  const [loading, setLoading] = useState(false);

  return (
    <div className='mt-5'>
      <BioData
        patientData={patientData}
        setPatientData={setPatientData}
        loading={loading}
      />
      <div className='my-5' />
      <ExaminationForm
        patientData={patientData}
        setPatientData={setPatientData}
        loading={loading}
      />
      <SimpleGrid my={5} columns={{ sm: 1, lg: 2 }} gap={2}>
        <Button colorScheme='blue' size='md' isLoading={loading}>
          Save To Database
        </Button>
        <Button colorScheme='teal' size='md' disabled={loading}>
          Preview
        </Button>
      </SimpleGrid>
    </div>
  );
};
