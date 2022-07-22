import React, { useEffect, useState } from 'react';
import { TextInput } from '../../common/TextInput';
import { NumberInput } from '../../common/NumberInput';
import { Diagnosis } from './Diagnosis';
import { Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import {
  PatientExamination,
  PatientRecord,
  SetState,
} from '../../../utils/types';

interface Props {
  patientRecord: PatientRecord;
  setPatientRecord: SetState<PatientRecord>;
  loading: boolean;
}

export const Examination: React.FC<Props> = ({
  patientRecord,
  setPatientRecord,
  loading,
}) => {
  let patientExamination = patientRecord.examination;

  const [generalExamination, setGeneralExamination] = useState(
    patientExamination?.generalExamination || ''
  );
  const [pulseRate, setPulseRate] = useState(
    patientExamination?.vitals?.pulseRate || ''
  );
  const [systolic, setSystolic] = useState(
    patientExamination?.vitals?.bloodPressure?.systolic || ''
  );
  const [diastolic, setDiastolic] = useState(
    patientExamination?.vitals?.bloodPressure?.diastolic || ''
  );
  const [temperature, setTemperature] = useState(
    patientExamination?.vitals?.temperature || ''
  );
  const [respiratoryRate, setRespiratoryRate] = useState(
    patientExamination?.vitals?.respiratoryRate || ''
  );
  const [oxygenSaturation, setOxygenSaturation] = useState(
    patientExamination?.vitals?.oxygenSaturation || ''
  );
  const [rs, setRs] = useState(
    patientExamination?.systemicExamination?.rs || ''
  );
  const [cvs, setCvs] = useState(
    patientExamination?.systemicExamination?.cvs || ''
  );
  const [git, setGit] = useState(
    patientExamination?.systemicExamination?.git || ''
  );
  const [cns, setCns] = useState(
    patientExamination?.systemicExamination?.cns || ''
  );
  const [musculoskeletal, setMusculoskeletal] = useState(
    patientExamination?.systemicExamination?.musculoskeletal || ''
  );
  const [ddsIfAny, setDdsIfAny] = useState(
    patientExamination?.systemicExamination?.ddsIfAny || ''
  );
  const [diagnosis, setDiagnosis] = useState<string[]>(
    patientExamination?.systemicExamination?.diagnosis || []
  );

  useEffect(() => {
    const examination: PatientExamination = {
      generalExamination,
      vitals: {
        pulseRate,
        bloodPressure: {
          systolic,
          diastolic,
        },
        oxygenSaturation,
        temperature,
        respiratoryRate,
      },
      systemicExamination: {
        rs,
        cvs,
        git,
        cns,
        musculoskeletal,
        ddsIfAny,
        diagnosis,
      },
    };

    let newPatientRecord: PatientRecord = {
      ...patientRecord,
      examination,
    };

    setPatientRecord(newPatientRecord);
  }, [
    generalExamination,
    pulseRate,
    systolic,
    diastolic,
    respiratoryRate,
    oxygenSaturation,
    temperature,
    rs,
    cvs,
    git,
    cns,
    musculoskeletal,
    ddsIfAny,
    diagnosis,
  ]);

  return (
    <div className='mt-5'>
      <Heading className='text-2xl' fontWeight='medium'>
        Examinations
      </Heading>
      <TextInput
        title='General examination'
        value={generalExamination}
        setValue={setGeneralExamination}
        textArea
        disabled={loading}
        className='mt-5'
      />
      <h2 className='mt-3 text-lg font-medium'>Vitals</h2>
      <SimpleGrid mt={2} columns={{ sm: 1, md: 2, lg: 3 }} gap={2}>
        <NumberInput
          title='Pulse rate (/min)'
          value={pulseRate}
          setValue={setPulseRate}
          disabled={loading}
        />
        <div>
          <h2 className='mb-2 text-md'>Blood pressure (mmHg)</h2>
          <Flex alignItems='center'>
            <TextInput
              title='Systolic'
              value={systolic}
              setValue={setSystolic}
              disabled={loading}
              disableTitle
            />
            <p className='mx-2 text-2xl'>/</p>
            <TextInput
              title='Diastolic'
              value={diastolic}
              setValue={setDiastolic}
              disabled={loading}
              disableTitle
            />
          </Flex>
        </div>
        <NumberInput
          title='Respiratory rate (/min)'
          value={respiratoryRate}
          setValue={setRespiratoryRate}
          disabled={loading}
        />
        <NumberInput
          title='Temperature (°F)'
          value={temperature}
          setValue={setTemperature}
          disabled={loading}
        />
        <NumberInput
          title='SpO2 (%)'
          value={oxygenSaturation}
          setValue={setOxygenSaturation}
          disabled={loading}
        />
      </SimpleGrid>
      <h2 className='mt-3 text-lg font-medium'>Systemic examination</h2>
      <SimpleGrid mt={2} columns={{ sm: 1, md: 2, lg: 3 }} gap={2}>
        <TextInput
          title='R.S'
          value={rs}
          setValue={setRs}
          disabled={loading}
          textArea
        />
        <TextInput
          title='C.V.S'
          value={cvs}
          setValue={setCvs}
          disabled={loading}
          textArea
        />
        <TextInput
          title='G.I.T'
          value={git}
          setValue={setGit}
          disabled={loading}
          textArea
        />
        <TextInput
          title='C.N.S'
          value={cns}
          setValue={setCns}
          disabled={loading}
          textArea
        />
        <TextInput
          title='Musculoskeletal'
          value={musculoskeletal}
          setValue={setMusculoskeletal}
          disabled={loading}
          textArea
        />
        <TextInput
          title='DDs if any'
          value={ddsIfAny}
          setValue={setDdsIfAny}
          disabled={loading}
          textArea
        />
      </SimpleGrid>
      <h2 className='mt-3 text-lg font-medium'>Provisional/Find diagnosis</h2>
      <Diagnosis
        diagnosis={diagnosis}
        setDiagnosis={setDiagnosis}
        loading={loading}
      />
    </div>
  );
};
