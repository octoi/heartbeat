import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { PatientData } from '../../utils/types';
import { getPatient } from '../edit/helper';
import { Header } from './header';

interface Props {
  patientId: number;
}

export const PreviewPageContent: React.FC<Props> = ({ patientId }) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [patientData, setPatientData] = useState<PatientData>({});

  useEffect(() => {
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
    <div>
      <Header />
      {loading && <p>Loading ...</p>}
    </div>
  );
};
