import React from 'react';
import { useParams } from 'react-router-dom';
import { PatientContent } from '../components/patient';

export const PatientPage: React.FC = () => {
  const params = useParams();
  let id = parseInt(params?.id || '0');

  return <PatientContent patientId={id} />;
};

export default PatientPage;
