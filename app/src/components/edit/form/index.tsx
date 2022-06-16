import React, { useState } from 'react';
import { PatientData } from '../../../utils/types';
import { BioData } from './bioData';

export const EditForm: React.FC = () => {
  const [patientData, setPatientData] = useState<PatientData>({});

  return (
    <div className='mt-5'>
      <BioData patientData={patientData} setPatientData={setPatientData} />
    </div>
  );
};
