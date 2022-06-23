import React, { useEffect, useState } from 'react';
import { PatientBioData, PatientData, SetState } from '../../../utils/types';
import {
  Checkbox,
  Flex,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SimpleGrid,
  Textarea,
} from '@chakra-ui/react';

interface Props {
  patientData: PatientData;
  setPatientData: SetState<PatientData>;
  loading?: boolean;
}

enum HeightUnit {
  Metre,
  Centimeter,
  Inch,
}

export const BioData: React.FC<Props> = ({
  patientData,
  setPatientData,
  loading,
}) => {
  let patientBioData = patientData?.bioData;

  const [name, setName] = useState(patientBioData?.name || '');
  const [age, setAge] = useState(patientBioData?.age || '');
  const [sex, setSex] = useState(patientBioData?.sex || 'Male');
  const [address, setAddress] = useState(patientBioData?.address || '');
  const [heightUnit, setHeightUnit] = useState(HeightUnit.Metre);
  const [height, setHeight] = useState(
    patientBioData?.height?.toString() || ''
  );
  const [weight, setWeight] = useState(
    patientBioData?.weight?.toString() || ''
  );
  const [bmi, setBmi] = useState(patientBioData?.bmi || '0');
  const [allergyToMedicines, setAllergyToMedicines] = useState(
    patientBioData?.allergyToMedicine?.status || false
  );
  const [allergyMedicines, setAllergyMedicines] = useState(
    patientBioData?.allergyToMedicine?.medicines || ''
  );
  const [remark, setRemark] = useState(patientBioData?.remark || '');
  const [diagnosis, setDiagnosis] = useState(patientBioData?.diagnosis || '');
  const [chiefComplaint, setChiefComplaint] = useState(
    patientBioData?.chiefComplaint || ''
  );
  const [pastMedicalHistory, setPastMedicalHistory] = useState(
    patientBioData?.pastMedicalHistory || ''
  );
  const [personalHistory, setPersonalHistory] = useState(
    patientBioData?.personalHistory || ''
  );
  const [familyHistory, setFamilyHistory] = useState(
    patientBioData?.familyHistory || ''
  );
  const [treatmentHistory, setTreatmentHistory] = useState(
    patientBioData?.treatmentHistory || ''
  );

  useEffect(() => {
    let heightNumber = Number(height);
    const weightNumber = Number(weight);

    if (heightUnit == HeightUnit.Centimeter) {
      heightNumber = heightNumber * 0.01;
    }

    if (heightUnit == HeightUnit.Inch) {
      heightNumber = heightNumber * 0.0254;
    }

    const bmi = weightNumber / (heightNumber * heightNumber);
    setBmi(bmi.toFixed(2));
  }, [height, weight, heightUnit]);

  useEffect(() => {
    const bioData: PatientBioData = {
      name,
      age,
      sex,
      address,
      heightUnit:
        HeightUnit[heightUnit][0] == 'C' ? 'Cm' : HeightUnit[heightUnit][0],
      height: height,
      weight: weight,
      bmi,
      allergyToMedicine: {
        status: allergyToMedicines,
        medicines: allergyMedicines,
      },
      remark,
      diagnosis,
      chiefComplaint,
      pastMedicalHistory,
      personalHistory,
      familyHistory,
      treatmentHistory,
    };

    let newPatientData: PatientData = {
      ...patientData,
      bioData,
    };

    setPatientData(newPatientData);
  }, [
    name,
    age,
    sex,
    address,
    heightUnit,
    height,
    weight,
    bmi,
    allergyToMedicines,
    allergyMedicines,
    remark,
    diagnosis,
    chiefComplaint,
    pastMedicalHistory,
    personalHistory,
    familyHistory,
    treatmentHistory,
  ]);

  return (
    <div>
      <Heading className='text-2xl' fontWeight='medium'>
        Biodata
      </Heading>
      <SimpleGrid mt={5} columns={{ sm: 1, md: 2, lg: 3 }} gap={2}>
        <div>
          <h2 className='mb-2 text-md'>Name</h2>
          <Input
            placeholder='Name'
            variant='filled'
            size='md'
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <h2 className='mb-2 text-md'>Age</h2>
          <Input
            placeholder='Age'
            variant='filled'
            size='md'
            value={age}
            onChange={(e) => setAge(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <h2 className='mb-2 text-md'>Gender</h2>
          <Select
            variant='filled'
            value={sex}
            defaultValue={sex}
            onChange={(e) => setSex(e.target.value)}
            disabled={loading}
          >
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Other'>Other</option>
          </Select>
        </div>
      </SimpleGrid>
      <SimpleGrid mt={3} columns={{ sm: 1, lg: 2 }} gap={2}>
        <div>
          <h2 className='mb-2 text-md'>Address</h2>
          <Textarea
            variant='filled'
            placeholder='Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={loading}
          />
        </div>
      </SimpleGrid>
      <SimpleGrid mt={3} columns={{ sm: 1, md: 2, lg: 3 }} gap={2}>
        <div>
          <h2 className='mb-2 text-md'>
            Height (
            {HeightUnit[heightUnit][0] == 'C'
              ? 'CM'
              : HeightUnit[heightUnit][0]}
            )
          </h2>
          <Flex alignItems='center' justifyContent='space-between'>
            <NumberInput
              placeholder='Height'
              variant='filled'
              size='md'
              value={height}
              onChange={(value) => setHeight(value)}
              isDisabled={loading}
              width='full'
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Select
              variant='filled'
              width='28%'
              ml={2}
              value={heightUnit}
              onChange={(e) => setHeightUnit(parseInt(e.target.value))}
            >
              <option value={HeightUnit.Metre}>M</option>
              <option value={HeightUnit.Centimeter}>CM</option>
              <option value={HeightUnit.Inch}>I</option>
            </Select>
          </Flex>
        </div>
        <div>
          <h2 className='mb-2 text-md'>Weight (Kg)</h2>
          <NumberInput
            placeholder='Weight'
            variant='filled'
            size='md'
            value={weight}
            onChange={(value) => setWeight(value)}
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
          <h2 className='mb-2 text-md'>BMI</h2>
          <Input placeholder='BMI' disabled value={bmi} variant='filled' />
        </div>
      </SimpleGrid>
      <div className='mt-3'>
        <Checkbox
          isChecked={allergyToMedicines}
          size='lg'
          onChange={(e) => setAllergyToMedicines(e.target.checked)}
          disabled={loading}
        >
          Allergy to medicines
        </Checkbox>
        {allergyToMedicines && (
          <div>
            <h2 className='my-2 text-md'>Allergic medicines</h2>
            <Textarea
              variant='filled'
              placeholder='Allergic medicines'
              value={allergyMedicines}
              onChange={(e) => setAllergyMedicines(e.target.value)}
              disabled={loading}
            />
          </div>
        )}
      </div>
      <div className='mt-3'>
        <h2 className='mb-2 text-md'>Remarks</h2>
        <Textarea
          variant='filled'
          placeholder='Remarks'
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className='mt-3'>
        <h2 className='mb-2 text-md'>Provisional/Find diagnosis</h2>
        <Textarea
          variant='filled'
          placeholder='Provisional/Find diagnosis'
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          disabled={loading}
        />
      </div>
      <SimpleGrid mt={3} columns={{ sm: 1, lg: 2 }} gap={2}>
        <div>
          <h2 className='mb-2 text-md'>Chief complaints</h2>
          <Textarea
            variant='filled'
            placeholder='Chief complaints'
            value={chiefComplaint}
            onChange={(e) => setChiefComplaint(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <h2 className='mb-2 text-md'>Past medical history</h2>
          <Textarea
            variant='filled'
            placeholder='Past medical history'
            value={pastMedicalHistory}
            onChange={(e) => setPastMedicalHistory(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <h2 className='mb-2 text-md'>Personal history</h2>
          <Textarea
            variant='filled'
            placeholder='Personal history'
            value={personalHistory}
            onChange={(e) => setPersonalHistory(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <h2 className='mb-2 text-md'>Family history</h2>
          <Textarea
            variant='filled'
            placeholder='Family history'
            value={familyHistory}
            onChange={(e) => setFamilyHistory(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <h2 className='mb-2 text-md'>Treatment history</h2>
          <Textarea
            variant='filled'
            placeholder='Treatment history'
            value={treatmentHistory}
            onChange={(e) => setTreatmentHistory(e.target.value)}
            disabled={loading}
          />
        </div>
      </SimpleGrid>
    </div>
  );
};
