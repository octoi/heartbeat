import React, { useState } from 'react';
import { Button, SimpleGrid, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { PatientData } from '../../../utils/types';
import { BioData } from './bioData';
import { ExaminationForm } from './examination';
import { createPatient, updatePatient } from './helper';
import { DeleteButton } from './DeleteButton';
import { Advice } from './advice';

interface Props {
  patientId?: number;
  patientOldData?: PatientData;
}

export const EditForm: React.FC<Props> = ({ patientId, patientOldData }) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [patientData, setPatientData] = useState<PatientData>(
    patientOldData || {}
  );
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const saveToDatabase = () => {
    if (patientData?.bioData?.name?.trim().length === 0) {
      toast({
        title: 'Cant save patient details',
        description: 'The `Name` field is required, you cant leave that empty',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
        status: 'error',
      });
      return;
    }

    setLoading(true);

    if (patientId) {
      updatePatient(patientId, patientData, toast, setLoading);
    } else {
      createPatient(patientData, navigate, toast, setLoading);
    }
  };

  return (
    <div className='mt-5'>
      <BioData
        patientData={patientData}
        setPatientData={setPatientData}
        loading={loading || deleteLoading}
      />
      <div className='my-5' />
      <ExaminationForm
        patientData={patientData}
        setPatientData={setPatientData}
        loading={loading || deleteLoading}
      />
      <div className='my-5' />
      <Advice
        patientData={patientData}
        setPatientData={setPatientData}
        loading={loading || deleteLoading}
      />
      <SimpleGrid
        my={5}
        columns={{ sm: 1, md: 2, lg: patientId ? 3 : 2 }}
        gap={2}
      >
        <Button
          colorScheme='blue'
          size='md'
          isLoading={loading}
          onClick={saveToDatabase}
          disabled={deleteLoading}
        >
          Save To Database
        </Button>
        <Button
          colorScheme='teal'
          size='md'
          disabled={loading || deleteLoading}
        >
          Preview
        </Button>
        {patientId && (
          <DeleteButton
            disabled={loading}
            isLoading={deleteLoading}
            setDeleteLoading={setDeleteLoading}
            patientId={patientId}
            patientName={patientData?.bioData?.name || ''}
          />
        )}
      </SimpleGrid>
    </div>
  );
};
