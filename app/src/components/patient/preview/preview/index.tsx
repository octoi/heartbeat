import React from 'react';
import { Center } from '@chakra-ui/react';
import { WaterMark } from './WaterMark';
import { BioData } from './BioData';
import { Examination } from './Examination';
import { Advice } from './Advice';
import { Footer } from './Footer';
import { PatientBioData, PatientRecord } from '../../../../utils/types';

interface Props {
  patientCreatedAt: number;
  patientBioData: PatientBioData;
  patientRecord: PatientRecord;
  printContentRef: React.MutableRefObject<any>;
  tableVariant: string;
}

export const Preview: React.FC<Props> = ({
  patientCreatedAt,
  patientBioData,
  patientRecord,
  printContentRef,
  tableVariant,
}) => {
  return (
    <Center>
      <div className='overflow-x-scroll'>
        <div
          className='min-w-[1000px] max-w-[1000px] mt-10 bg-white text-black px-10 py-3'
          ref={printContentRef}
        >
          <WaterMark />
          <div className='w-full bg-black h-0.5 opacity-20 my-5' />

          <BioData
            patientCreatedAt={patientCreatedAt}
            bioData={patientBioData || {}}
            medicalBioData={patientRecord.medicalBioData || {}}
            tableVariant={tableVariant}
            diagnosis={
              patientRecord.examination?.systemicExamination?.diagnosis || []
            }
          />
          <Examination
            examination={patientRecord.examination || {}}
            tableVariant={tableVariant}
          />
          <Advice
            advice={patientRecord.advice || {}}
            tableVariant={tableVariant}
          />

          <div className='w-full bg-black h-0.5 opacity-20 my-5' />
          <Footer />
        </div>
      </div>
    </Center>
  );
};
