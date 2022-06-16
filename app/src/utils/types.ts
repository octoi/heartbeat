import React from 'react';
import { PropsWithChildren } from 'react';

export type ReactComponent<Props = {}> = React.FC<PropsWithChildren<Props>>;

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

// According to PDF provided by a professional doctor
export interface PatientBioData {
  name?: string;
  age?: string;
  sex?: string;
  address?: string;
  height?: number;
  weight?: number;
  bmi?: number;
  allergyToMedicine?: {
    status?: boolean;
    medicines?: string;
  };
  chiefComplaint?: string;
  pastMedicalHistory?: string;
  personalHistory?: string;
  familyHistory?: string;
  treatmentHistory?: string;
}

export interface PatientVitals {
  pulseRate?: number;
  bloodPressure?: {
    systolic?: number;
    diastolic?: number;
  };
  respiratoryRate?: number;
  oxygenSaturation?: number;
}

export interface PatientSystemicExamination {
  rs?: string;
  cvs?: string;
  git?: string;
  musculoskeletal?: string;
  provisionalOrFindDiagnosis?: string;
  ddsIfAny?: string;
}

export interface PatientExamination {
  generalExamination?: string;
  vitals?: PatientVitals;
  systemicExamination?: PatientSystemicExamination;
}

export interface PatientData {
  bioData?: PatientBioData;
  examination?: PatientExamination;
}

export interface Patient {
  id: number;
  data: PatientData;
}
