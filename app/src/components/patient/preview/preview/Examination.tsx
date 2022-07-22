import React from 'react';
import { PatientExamination } from '../../../../utils/types';
import { LightMode, Table, Tbody, Td, Tr } from '@chakra-ui/react';

interface Props {
  examination: PatientExamination;
  tableVariant: string;
}

export const Examination: React.FC<Props> = ({ examination, tableVariant }) => {
  const check =
    examination.generalExamination ||
    (examination.vitals &&
      (examination.vitals.bloodPressure ||
        examination.vitals.oxygenSaturation ||
        examination.vitals.pulseRate ||
        examination.vitals.respiratoryRate)) ||
    (examination.systemicExamination &&
      (examination.systemicExamination.cns ||
        examination.systemicExamination.cvs ||
        examination.systemicExamination.ddsIfAny ||
        examination.systemicExamination.git ||
        examination.systemicExamination.musculoskeletal ||
        examination.systemicExamination.rs));

  if (!check) return null;

  return (
    <div className='mt-5'>
      <h2 className='text-xl font-semibold mb-3'>EXAMINATION</h2>
      <LightMode>
        {(examination.generalExamination ||
          examination.vitals ||
          examination.systemicExamination) && (
          <Table variant={tableVariant}>
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
                      <>Pulse: {examination.vitals.pulseRate} /min, </>
                    )}
                    {examination.vitals.bloodPressure &&
                      examination.vitals.bloodPressure.systolic &&
                      examination.vitals.bloodPressure.diastolic && (
                        <>
                          BP: {examination.vitals.bloodPressure.systolic}/
                          {examination.vitals.bloodPressure.diastolic} mmHg,{' '}
                        </>
                      )}

                    {examination.vitals.bloodPressure &&
                      examination.vitals.bloodPressure.systolic &&
                      !examination.vitals.bloodPressure.diastolic && (
                        <>
                          BP: {examination.vitals.bloodPressure.systolic}{' '}
                          Systolic,{' '}
                        </>
                      )}
                    {examination.vitals.oxygenSaturation && (
                      <>SPO2: {examination.vitals.oxygenSaturation}%, </>
                    )}
                    {examination.vitals.temperature && (
                      <>Temp: {examination.vitals.temperature}°F, </>
                    )}
                    {examination.vitals.respiratoryRate && (
                      <>RR: {examination.vitals.respiratoryRate} /min</>
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
