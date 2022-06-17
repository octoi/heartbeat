import { Button, SimpleGrid, useToast } from '@chakra-ui/react';
import { invoke } from '@tauri-apps/api/tauri';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PatientData, SetState } from '../../../utils/types';
import { BioData } from './bioData';
import { ExaminationForm } from './examination';

interface Props {
  patientId?: number;
}

export const EditForm: React.FC<Props> = ({ patientId }) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [patientData, setPatientData] = useState<PatientData>({});
  const [loading, setLoading] = useState(false);

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
      return;
    }

    invoke('create_patient', {
      data: JSON.stringify(patientData),
    })
      .then(() => {
        navigate('/', { replace: false });
        toast({
          title: 'Saved patient data successfully',
          description: `${patientData?.bioData?.name} is in your list now :)`,
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          status: 'success',
        });
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
        setLoading(false);
      });
  };

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
        <Button
          colorScheme='blue'
          size='md'
          isLoading={loading}
          onClick={saveToDatabase}
        >
          Save To Database
        </Button>
        <Button colorScheme='teal' size='md' disabled={loading}>
          Preview
        </Button>
      </SimpleGrid>
    </div>
  );
};
