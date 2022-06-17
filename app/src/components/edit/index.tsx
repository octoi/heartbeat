import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { PatientData } from '../../utils/types';
import { useToast } from '@chakra-ui/react';
import { EditForm } from './form';
import { Header } from './header';
import { useNavigate } from 'react-router-dom';

interface Props {
  patientId?: number;
}

export const EditPageContent: React.FC<Props> = ({ patientId }) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [patientData, setPatientData] = useState<PatientData>({});

  useEffect(() => {
    if (!patientId) return;

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
        navigate('/', { replace: false });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section>
      <Header title={patientId ? 'Edit patient' : ''} />
      {loading && <p>Loading ...</p>}
      {!patientId && <EditForm />}
      {patientId && !loading && (
        <EditForm patientId={patientId} patientOldData={patientData} />
      )}
    </section>
  );
};
