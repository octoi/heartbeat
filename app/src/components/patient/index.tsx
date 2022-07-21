import React, { useEffect, useState } from 'react';
import { Flex, useToast } from '@chakra-ui/react';
import { invoke } from '@tauri-apps/api/tauri';
import { useNavigate } from 'react-router-dom';
import { PatientData } from '../../utils/types';
import { Header } from '../newPatient/Header';
import { BioData } from './bioData';

interface Props {
  patientId: number;
}

export const PatientContent: React.FC<Props> = ({ patientId }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [patientData, setPatientData] = useState<PatientData>({});

  useEffect(() => {
    setLoading(true);

    invoke('read_patient', {
      id: patientId,
    })
      .then((data: any) => {
        setPatientData(JSON.parse(data[0].data) || {});
      })
      .catch((err) => {
        toast({
          title: err,
          description: 'Failed to find patient',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          status: 'error',
        });

        navigate('/', { replace: true });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [patientId]);

  return (
    <div>
      <Header title={patientData.bioData?.name || ''} />
      <Flex mt={5}>
        {loading && <p>Loading ...</p>}
        {!loading && (
          <BioData
            patientId={patientId}
            patientData={patientData}
            setPatientData={setPatientData}
          />
        )}
        <div className='bg-gray-700 h-screen w-full'></div>
      </Flex>
    </div>
  );
};
