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
}

export interface PatientMedicalBioData {
  height?: string;
  heightUnit?: string;
  weight?: string;
  bmi?: string;
  allergyToMedicine?: {
    status?: boolean;
    medicines?: string;
  };
  remark?: string;
  chiefComplaint?: string;
  pastMedicalHistory?: string;
  personalHistory?: string;
  familyHistory?: string;
  treatmentHistory?: string;
}

export interface PatientVitals {
  pulseRate?: string;
  bloodPressure?: {
    systolic?: string;
    diastolic?: string;
  };
  respiratoryRate?: string;
  oxygenSaturation?: string;
  temperature?: string;
}

export interface PatientSystemicExamination {
  rs?: string;
  cvs?: string;
  git?: string;
  cns?: string;
  musculoskeletal?: string;
  ddsIfAny?: string;
  diagnosis?: string[];
}

export interface PatientExamination {
  generalExamination?: string;
  vitals?: PatientVitals;
  systemicExamination?: PatientSystemicExamination;
}

export interface PatientMedicine {
  medicineName: string;
  frequency: string;
  time: string;
  duration: string;
}

export interface PatientAdvice {
  medicines?: PatientMedicine[];
  advice?: string;
  investigationToDo?: string;
}

export interface PatientRecord {
  medicalBioData?: PatientMedicalBioData;
  examination?: PatientExamination;
  advice?: PatientAdvice;
  createdAt?: number;
}

export interface PatientData {
  bioData?: PatientBioData;
  records?: PatientRecord[];
  createdAt?: number;
  updatedAt?: number;
}

export interface Patient {
  id: number;
  data: string;
}
