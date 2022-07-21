import React from 'react';
import { Header } from './Header';
import { PatientBioDataForm } from './PatientBioData';

export const NewPatientContent: React.FC = () => {
  return (
    <section>
      <Header title='New Patient' />
      <PatientBioDataForm />
    </section>
  );
};
