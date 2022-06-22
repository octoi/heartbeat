import React from 'react';
import { PatientExamination } from '../../../utils/types';
import { LightMode, Table, Tbody, Td, Tr } from '@chakra-ui/react';

interface Props {
  examination: PatientExamination;
}

export const Examination: React.FC<Props> = ({ examination }) => {
  return (
    <div className='mt-5'>
      <h2 className='text-xl font-semibold mb-3'>EXAMINATION</h2>
      <LightMode>
        {(examination.generalExamination ||
          examination.vitals ||
          examination.systemicExamination) && (
          <Table variant='striped'>
            <Tbody>
              {examination.generalExamination && (
                <Tr>
                  <Td fontWeight='medium'>GENERAL EXAMINATION</Td>
                  <Td>{examination.generalExamination}</Td>
                </Tr>
              )}
              {examination.vitals && (
                <Tr>
                  <Td fontWeight='medium'>VITALS</Td>
                  <Td>
                    {examination.vitals.pulseRate && (
                      <>Pulse: {examination.vitals.pulseRate} /min</>
                    )}
                    {examination.vitals.bloodPressure && (
                      <>
                        , BP: {examination.vitals.bloodPressure.systolic}/
                        {examination.vitals.bloodPressure.diastolic} mmHg
                      </>
                    )}
                    {examination.vitals.oxygenSaturation && (
                      <>, SPO2: {examination.vitals.oxygenSaturation}%</>
                    )}
                    {examination.vitals.respiratoryRate && (
                      <>, RR: {examination.vitals.respiratoryRate} /min</>
                    )}
                  </Td>
                </Tr>
              )}
              {examination.systemicExamination?.cns && (
                <Tr>
                  <Td fontWeight='medium'>CNS</Td>
                  <Td>{examination.systemicExamination.cns}</Td>
                </Tr>
              )}
              {examination.systemicExamination?.rs && (
                <Tr>
                  <Td fontWeight='medium'>RS</Td>
                  <Td>{examination.systemicExamination.rs}</Td>
                </Tr>
              )}
              {examination.systemicExamination?.cvs && (
                <Tr>
                  <Td fontWeight='medium'>CVS</Td>
                  <Td>{examination.systemicExamination.cvs}</Td>
                </Tr>
              )}
              {examination.systemicExamination?.git && (
                <Tr>
                  <Td fontWeight='medium'>GIT</Td>
                  <Td>{examination.systemicExamination.git}</Td>
                </Tr>
              )}
              {examination.systemicExamination?.musculoskeletal && (
                <Tr>
                  <Td fontWeight='medium'>MUSCULOSKELETAL</Td>
                  <Td>{examination.systemicExamination.musculoskeletal}</Td>
                </Tr>
              )}
              {examination.systemicExamination?.ddsIfAny && (
                <Tr>
                  <Td fontWeight='medium'>DDs IF ANY</Td>
                  <Td>{examination.systemicExamination.ddsIfAny}</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        )}
      </LightMode>
    </div>
  );
};
