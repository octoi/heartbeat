import React, { useEffect, useState } from 'react';
import {
  PatientData,
  PatientExamination,
  SetState,
} from '../../../utils/types';
import {
  Flex,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Textarea,
} from '@chakra-ui/react';

interface Props {
  patientData: PatientData;
  setPatientData: SetState<PatientData>;
  loading?: boolean;
}

export const ExaminationForm: React.FC<Props> = ({
  patientData,
  setPatientData,
  loading,
}) => {
  let patientExaminationData = patientData?.examination;
  let patientVitals = patientData?.examination?.vitals;
  let patientBloodPressure = patientVitals?.bloodPressure;
  let patientSystemicExamination = patientExaminationData?.systemicExamination;

  const [generalExamination, setGeneralExamination] = useState(
    patientExaminationData?.generalExamination || ''
  );
  const [pulseRate, setPulseRate] = useState(patientVitals?.pulseRate || '');
  const [systolic, setSystolic] = useState(
    patientBloodPressure?.systolic || ''
  );
  const [diastolic, setDiastolic] = useState(
    patientBloodPressure?.diastolic || ''
  );
  const [temperature, setTemperature] = useState(
    patientVitals?.temperature || ''
  );
  const [respiratoryRate, setRespiratoryRate] = useState(
    patientVitals?.respiratoryRate || ''
  );
  const [oxygenSaturation, setOxygenSaturation] = useState(
    patientVitals?.oxygenSaturation || ''
  );
  const [rs, setRs] = useState(patientSystemicExamination?.rs || '');
  const [cvs, setCvs] = useState(patientSystemicExamination?.cvs || '');
  const [git, setGit] = useState(patientSystemicExamination?.git || '');
  const [cns, setCns] = useState(patientSystemicExamination?.cns || '');
  const [musculoskeletal, setMusculoskeletal] = useState(
    patientSystemicExamination?.musculoskeletal || ''
  );
  const [ddsIfAny, setDdsIfAny] = useState(
    patientSystemicExamination?.ddsIfAny || ''
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
      },
    };

    let newPatientData: PatientData = {
      ...patientData,
      examination,
    };

    setPatientData(newPatientData);
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
  ]);

  return (
    <div>
      <Heading className='text-2xl' fontWeight='medium'>
        Examinations
      </Heading>
      <div className='mt-5'>
        <h2 className='mb-2 text-md'>General examination</h2>
        <Textarea
          variant='filled'
          placeholder='General examination'
          value={generalExamination}
          onChange={(e) => setGeneralExamination(e.target.value)}
          disabled={loading}
        />
      </div>
      <h2 className='mt-3 text-lg font-medium'>Vitals</h2>
      <SimpleGrid mt={2} columns={{ sm: 1, md: 2, lg: 3 }} gap={2}>
        <div>
          <h2 className='mb-2 text-md'>Pulse rate (/min)</h2>
          <NumberInput
            placeholder='Pulse rate'
            variant='filled'
            size='md'
            value={pulseRate}
            onChange={(value) => setPulseRate(value)}
            isDisabled={loading}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>
        <div>
          <h2 className='mb-2 text-md'>Blood pressure (mmHg)</h2>
          <Flex alignItems='center'>
            <Input
              placeholder='Systolic'
              type='number'
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              variant='filled'
              size='md'
              disabled={loading}
            />
            <p className='mx-2 text-2xl'>/</p>
            <Input
              placeholder='Diastolic'
              type='number'
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              variant='filled'
              size='md'
              disabled={loading}
            />
          </Flex>
        </div>
        <div>
          <h2 className='mb-2 text-md'>Respiratory rate (/min)</h2>
          <NumberInput
            placeholder='Respiratory rate'
            variant='filled'
            size='md'
            value={respiratoryRate}
            onChange={(value) => setRespiratoryRate(value)}
            isDisabled={loading}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>
        <div>
          <h2 className='mb-2 text-md'>Temperature (°F)</h2>
          <NumberInput
            placeholder='Temperature'
            variant='filled'
            size='md'
            value={temperature}
            onChange={setTemperature}
            isDisabled={loading}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>
        <div>
          <h2 className='mb-2 text-md'>SpO2 (%)</h2>
          <NumberInput
            placeholder='SpO2'
            variant='filled'
            size='md'
            value={oxygenSaturation}
            onChange={(value) => setOxygenSaturation(value)}
            isDisabled={loading}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>
      </SimpleGrid>
      <h2 className='mt-3 text-lg font-medium'>Systemic examination</h2>
      <SimpleGrid mt={2} columns={{ sm: 1, md: 2, lg: 3 }} gap={2}>
        <div>
          <h2 className='mb-2 text-md'>R.S</h2>
          <Textarea
            variant='filled'
            placeholder='R.S'
            value={rs}
            onChange={(e) => setRs(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <h2 className='mb-2 text-md'>C.V.S</h2>
          <Textarea
            variant='filled'
            placeholder='C.V.S'
            value={cvs}
            onChange={(e) => setCvs(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <h2 className='mb-2 text-md'>G.I.T</h2>
          <Textarea
            variant='filled'
            placeholder='G.I.T'
            value={git}
            onChange={(e) => setGit(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <h2 className='mb-2 text-md'>C.N.S</h2>
          <Textarea
            variant='filled'
            placeholder='C.N.S'
            value={cns}
            onChange={(e) => setCns(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <h2 className='mb-2 text-md'>Musculoskeletal</h2>
          <Textarea
            variant='filled'
            placeholder='Musculoskeletal'
            value={musculoskeletal}
            onChange={(e) => setMusculoskeletal(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <h2 className='mb-2 text-md'>DDs if any</h2>
          <Textarea
            variant='filled'
            placeholder='DDs if any'
            value={ddsIfAny}
            onChange={(e) => setDdsIfAny(e.target.value)}
            disabled={loading}
          />
        </div>
      </SimpleGrid>
    </div>
  );
};
