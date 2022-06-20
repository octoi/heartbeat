import React from 'react';
import { PatientData } from '../../../utils/types';
import { Button, Center, LightMode, Text } from '@chakra-ui/react';
import { WaterMark } from './waterMark';
import { BioData } from './bioData';

interface Props {
  patientData: PatientData;
  printContentRef: React.MutableRefObject<any>;
}

export const Preview: React.FC<Props> = ({ patientData, printContentRef }) => {
  return (
    <Center>
      <div className='overflow-x-scroll'>
        <div
          className='min-w-[1000px] max-w-[1000px] mt-10 bg-white text-black px-6 py-10'
          ref={printContentRef}
        >
          <WaterMark />
          <div className='w-full bg-black h-0.5 opacity-20 my-5' />

          <BioData bioData={patientData.bioData || {}} />
        </div>
      </div>
    </Center>
  );
};
