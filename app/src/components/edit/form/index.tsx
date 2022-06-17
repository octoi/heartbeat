import React, { useState } from 'react';
import { Button, SimpleGrid, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { PatientData } from '../../../utils/types';
import { BioData } from './bioData';
import { ExaminationForm } from './examination';
import { createPatient, updatePatient } from './helper';
import { invoke } from '@tauri-apps/api/tauri';

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

  const deletePatient = () => {
    setDeleteLoading(true);

    invoke('delete_patient', {
      id: patientId,
    })
      .then(() => {
        toast({
          title: `Say bye to ${patientData.bioData?.name}`,
          description: 'Deleted patient data successfully',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          status: 'success',
        });
        navigate('/', { replace: false });
      })
      .catch((err) => {
        toast({
          title: err,
          description: 'Please try again or report this as bug',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          status: 'error',
        });
      })
      .finally(() => {
        setDeleteLoading(false);
      });
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
          <Button
            colorScheme='red'
            size='md'
            disabled={loading}
            isLoading={deleteLoading}
            onClick={deletePatient}
          >
            Delete Patient
          </Button>
        )}
      </SimpleGrid>
    </div>
  );
};
