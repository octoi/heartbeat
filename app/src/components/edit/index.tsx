import React, { useEffect, useState } from 'react';
import { PatientData } from '../../utils/types';
import { useToast } from '@chakra-ui/react';
import { EditForm } from './form';
import { Header } from './header';
import { useNavigate } from 'react-router-dom';
import { getPatient } from './helper';

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

    getPatient(patientId, toast)
      .then((data: any) => {
        setPatientData(data);
      })
      .catch(() => {
        navigate('/', { replace: true });
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
