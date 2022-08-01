import React from 'react';
import { PatientRecord, SetState } from '../../../utils/types';
import { Advice } from './Advice';
import { Examination } from './Examination';
import { MedicalBioData } from './MedicalBioData';
import { NextAppointment } from './NextAppointment';

interface Props {
  patientRecord: PatientRecord;
  setPatientRecord: SetState<PatientRecord>;
  loading: boolean;
}

export const RecordForm: React.FC<Props> = ({
  patientRecord,
  setPatientRecord,
  loading,
}) => {
  return (
    <div>
      <MedicalBioData
        patientRecord={patientRecord}
        setPatientRecord={setPatientRecord}
        loading={loading}
      />
      <Examination
        patientRecord={patientRecord}
        setPatientRecord={setPatientRecord}
        loading={loading}
      />
      <Advice
        patientRecord={patientRecord}
        setPatientRecord={setPatientRecord}
        loading={loading}
      />
      <NextAppointment
        patientRecord={patientRecord}
        setPatientRecord={setPatientRecord}
        loading={loading}
      />
    </div>
  );
};
